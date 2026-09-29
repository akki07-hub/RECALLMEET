// Meeting analysis service using Groq API (OpenAI-compatible).
// Sends transcript to Groq and returns structured MeetingAnalysis.

import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { MeetingAnalysis, ActionItem } from './types';

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

const ANALYSIS_SYSTEM_PROMPT = `You are an expert meeting analyst for a professional sales/consulting environment.
Analyze the provided meeting transcript and extract structured information.

Return ONLY valid JSON matching this exact structure:
{
  "summary": "A 2-3 sentence summary of the meeting",
  "decisions": ["Decision 1", "Decision 2"],
  "requirements": ["Requirement 1", "Requirement 2"],
  "actionItems": [
    {"task": "Task description", "assignee": "Person name", "deadline": "Date or timeframe", "status": "open"}
  ],
  "deadlines": ["Deadline 1", "Deadline 2"],
  "commitments": ["Person committed to do X", "Person promised Y"],
  "unresolvedIssues": ["Issue 1", "Issue 2"],
  "preferences": ["Client prefers X", "Client wants Y"],
  "responsibilities": ["Person X is responsible for Y"]
}

Guidelines:
- Focus on information that has FUTURE VALUE for the sales/account team
- Decisions: What was officially agreed or approved
- Requirements: What the client/team needs built or delivered
- Action Items: Concrete next steps with owner and timeline
- Deadlines: Hard dates or timeframes mentioned
- Commitments: Promises made by anyone in the meeting
- Unresolved Issues: Blockers, pending items, open questions
- Preferences: Client preferences that should be remembered (payment type, communication style, etc.)
- Responsibilities: Who owns what going forward
- Be specific and use actual names, numbers, and details from the transcript
- Do not include small talk or irrelevant conversation`;

export async function analyzeMeeting(
  transcript: string,
  context: {
    clientName: string;
    meetingTitle: string;
    participants: string;
    date: string;
  }
): Promise<MeetingAnalysis> {
  const groq = getGroqClient();
  const prompt = `Meeting Context:
- Client/Company: ${context.clientName}
- Meeting Title: ${context.meetingTitle}
- Date: ${context.date}
- Participants: ${context.participants}

Meeting Transcript:
${transcript}

Analyze this meeting transcript and return the structured JSON.`;

  const response = await groq.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    messages: [
      { role: 'system', content: ANALYSIS_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: 0.2,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('Groq returned empty response for meeting analysis');
  }

  // Extract JSON from response (handling potential markdown code fences)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from Groq analysis response');
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    summary: parsed.summary || '',
    decisions: Array.isArray(parsed.decisions) ? parsed.decisions : [],
    requirements: Array.isArray(parsed.requirements) ? parsed.requirements : [],
    actionItems: Array.isArray(parsed.actionItems)
      ? parsed.actionItems.map((item: Partial<ActionItem>) => ({
          task: item.task || '',
          assignee: item.assignee,
          deadline: item.deadline,
          status: 'open' as const,
        }))
      : [],
    deadlines: Array.isArray(parsed.deadlines) ? parsed.deadlines : [],
    commitments: Array.isArray(parsed.commitments) ? parsed.commitments : [],
    unresolvedIssues: Array.isArray(parsed.unresolvedIssues)
      ? parsed.unresolvedIssues
      : [],
    preferences: Array.isArray(parsed.preferences) ? parsed.preferences : [],
    responsibilities: Array.isArray(parsed.responsibilities)
      ? parsed.responsibilities
      : [],
  };
}
