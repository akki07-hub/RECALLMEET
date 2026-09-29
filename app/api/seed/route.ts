import { NextResponse } from 'next/server';
import { getAllDemoTranscripts } from '@/lib/demo-transcripts';
import { analyzeMeeting } from '@/lib/analysis';
import { extractMemoriesFromAnalysis } from '@/lib/memory-extractor';
import { retainMemory, clientToBank } from '@/lib/hindsight';
import {
  getOrCreateClient,
  createMeeting,
  saveTranscript,
  saveAnalysis,
  updateMeetingStatus,
  getMeetingsByClient,
  generateId,
} from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  const results: Array<{ title: string; memoriesStored: number; error?: string }> = [];

  try {
    const demos = getAllDemoTranscripts();

    for (const demo of demos) {
      try {
        const slug = clientToBank(demo.clientName);
        const client = getOrCreateClient(demo.clientName, slug);

        const existingMeetings = getMeetingsByClient(client.id);
        const alreadyExists = existingMeetings.some(
          (m) => m.title === demo.title && m.is_demo_mode === 1
        );
        if (alreadyExists) {
          results.push({ title: demo.title, memoriesStored: 0, error: 'already seeded' });
          continue;
        }

        const meetingId = generateId();
        createMeeting({
          id: meetingId,
          clientId: client.id,
          clientName: demo.clientName,
          title: demo.title,
          participants: demo.participants,
          date: demo.date,
          description: demo.description,
          isDemoMode: true,
        });
        updateMeetingStatus(meetingId, 'processing');
        saveTranscript(meetingId, demo.text, []);

        const analysis = await analyzeMeeting(demo.text, {
          clientName: demo.clientName,
          meetingTitle: demo.title,
          participants: demo.participants,
          date: demo.date,
        });
        saveAnalysis(meetingId, analysis as unknown as Record<string, unknown>);

        const memories = extractMemoriesFromAnalysis(analysis, {
          clientName: demo.clientName,
          meetingTitle: demo.title,
          date: demo.date,
          participants: demo.participants,
        });

        let memoriesStored = 0;
        for (const memory of memories) {
          try {
            await retainMemory(slug, memory.content);
            memoriesStored++;
          } catch (err) {
            console.error('[Seed] Failed to retain memory:', err);
          }
        }

        updateMeetingStatus(meetingId, 'completed', memoriesStored);
        results.push({ title: demo.title, memoriesStored });
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        results.push({ title: demo.title, memoriesStored: 0, error: msg });
      }
    }

    const totalMemories = results.reduce((sum, r) => sum + r.memoriesStored, 0);
    return NextResponse.json({
      success: true,
      message: `Seeded ${results.length} demo meetings with ${totalMemories} memories into Hindsight Cloud`,
      results,
    });
  } catch (error) {
    console.error('[API /seed] Error:', error);
    const message = error instanceof Error ? error.message : 'Seed failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST to seed demo data' },
    { status: 405 }
  );
}
