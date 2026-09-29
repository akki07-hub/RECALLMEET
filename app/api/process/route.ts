// Core meeting processing pipeline:
// Audio/Demo Transcript -> [Whisper] -> AI Analysis -> Memory Extraction -> Hindsight retain()

import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import {
  getMeetingById,
  updateMeetingStatus,
  saveTranscript,
  saveAnalysis,
  getOrCreateClient,
  generateId,
  createMeeting,
} from '@/lib/db';
import { analyzeMeeting } from '@/lib/analysis';
import { extractMemoriesFromAnalysis } from '@/lib/memory-extractor';
import { retainMemory, clientToBank } from '@/lib/hindsight';
import { transcribeAudio, isValidAudioFormat, MAX_AUDIO_SIZE_BYTES } from '@/lib/transcription';
import { getDemoTranscript } from '@/lib/demo-transcripts';

export const maxDuration = 300; // 5 minutes max duration

export async function POST(req: Request) {
  let audioPath: string | null = null;

  try {
    const contentType = req.headers.get('content-type') || '';
    let transcriptText: string;
    let meetingId: string;
    let clientName: string;
    let title: string;
    let participants: string;
    let date: string;
    let description: string | undefined;
    let isDemoMode = false;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('audio') as File | null;
      const demoId = formData.get('demoTranscriptId') as string | null;

      clientName = (formData.get('clientName') as string) || '';
      title = (formData.get('title') as string) || '';
      participants = (formData.get('participants') as string) || '';
      date = (formData.get('date') as string) || new Date().toISOString().split('T')[0];
      description = (formData.get('description') as string) || undefined;

      if (!clientName || !title) {
        return NextResponse.json(
          { error: 'clientName and title are required' },
          { status: 400 }
        );
      }

      if (demoId) {
        // Demo mode: use pre-defined transcript, skip Whisper
        isDemoMode = true;
        const demo = getDemoTranscript(demoId);
        if (!demo) {
          return NextResponse.json(
            { error: `Demo transcript '${demoId}' not found` },
            { status: 400 }
          );
        }
        transcriptText = demo.text;
      } else if (file) {
        // Real audio: validate and transcribe
        if (!isValidAudioFormat(file.name)) {
          return NextResponse.json(
            { error: 'Unsupported audio format. Use mp3, mp4, m4a, wav, or webm.' },
            { status: 400 }
          );
        }
        if (file.size > MAX_AUDIO_SIZE_BYTES) {
          return NextResponse.json(
            { error: 'Audio file too large. Maximum size is 25MB.' },
            { status: 400 }
          );
        }

        const uploadDir = join(process.cwd(), 'data', 'uploads');
        await mkdir(uploadDir, { recursive: true });
        const tempName = `${generateId()}_${file.name}`;
        audioPath = join(uploadDir, tempName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(audioPath, buffer);

        // Transcribe with Whisper
        const transcription = await transcribeAudio(audioPath);
        transcriptText = transcription.text;
      } else {
        return NextResponse.json(
          { error: 'Provide either an audio file or a demoTranscriptId' },
          { status: 400 }
        );
      }
    } else {
      // JSON body for demo mode
      const body = await req.json();
      meetingId = body.meetingId;
      clientName = body.clientName || '';
      title = body.title || '';
      participants = body.participants || '';
      date = body.date || new Date().toISOString().split('T')[0];
      description = body.description;

      if (body.demoTranscriptId) {
        isDemoMode = true;
        const demo = getDemoTranscript(body.demoTranscriptId);
        if (!demo) {
          return NextResponse.json(
            { error: `Demo transcript '${body.demoTranscriptId}' not found` },
            { status: 400 }
          );
        }
        transcriptText = demo.text;
        if (!clientName) clientName = demo.clientName;
        if (!title) title = demo.title;
        if (!participants) participants = demo.participants;
        if (!date || date === 'undefined') date = demo.date;
      } else {
        return NextResponse.json({ error: 'No transcript source provided' }, { status: 400 });
      }
    }

    const slug = clientToBank(clientName);
    const client = getOrCreateClient(clientName, slug);
    meetingId = meetingId! || generateId();

    const meeting = createMeeting({
      id: meetingId,
      clientId: client.id,
      clientName,
      title,
      participants,
      date,
      description,
      isDemoMode,
    });

    updateMeetingStatus(meetingId, 'processing');

    // Save transcript
    saveTranscript(meetingId, transcriptText, []);

    // AI Analysis
    const analysis = await analyzeMeeting(transcriptText, {
      clientName,
      meetingTitle: title,
      participants,
      date,
    });

    saveAnalysis(meetingId, analysis as unknown as Record<string, unknown>);

    // Extract memories and store in Hindsight
    const memories = extractMemoriesFromAnalysis(analysis, {
      clientName,
      meetingTitle: title,
      date,
      participants,
    });

    let memoriesStored = 0;
    for (const memory of memories) {
      try {
        await retainMemory(slug, memory.content);
        memoriesStored++;
      } catch (err) {
        console.error('[Hindsight] Failed to retain memory:', err);
      }
    }

    updateMeetingStatus(meetingId, 'completed', memoriesStored);

    if (audioPath) {
      try { await unlink(audioPath); } catch {}
    }

    return NextResponse.json({
      success: true,
      meetingId,
      meeting,
      transcriptLength: transcriptText.length,
      analysis,
      memoriesStored,
      memories,
      isDemoMode,
    });
  } catch (error) {
    console.error('[API /process] Error:', error);

    if (audioPath) {
      try { await unlink(audioPath); } catch {}
    }

    const message = error instanceof Error ? error.message : 'Processing failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
