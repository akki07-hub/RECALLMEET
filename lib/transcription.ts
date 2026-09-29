// Audio transcription service using Groq Whisper.

import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { TranscriptSegment } from './types';

// Load .env.local environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Allow local environment SSL proxy certificates for HTTPS requests
if (typeof process !== 'undefined' && process.env) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

function getGroqClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.GROQ_API_KEY || 'dummy-key-for-build',
    baseURL: 'https://api.groq.com/openai/v1',
  });
}

export interface TranscriptionResult {
  text: string;
  segments: TranscriptSegment[];
}

export async function transcribeAudio(
  filePath: string
): Promise<TranscriptionResult> {
  const groq = getGroqClient();
  const fileStream = fs.createReadStream(filePath);

  const response = await groq.audio.transcriptions.create({
    file: fileStream,
    model: 'whisper-large-v3',
    response_format: 'verbose_json',
  });

  const segments: TranscriptSegment[] = (
    (response as any).segments || []
  ).map((seg: any) => ({
    start: seg.start || 0,
    end: seg.end || 0,
    text: seg.text || '',
  }));

  return {
    text: response.text,
    segments,
  };
}

export function isValidAudioFormat(filename: string): boolean {
  const allowed = ['.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.wav', '.webm', '.ogg'];
  const ext = path.extname(filename).toLowerCase();
  return allowed.includes(ext);
}

export const MAX_AUDIO_SIZE_BYTES = 25 * 1024 * 1024; // 25MB
