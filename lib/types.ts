// Core TypeScript types for RecallMeet

export interface Client {
  id: string;
  name: string;
  slug: string; // Used as Hindsight bank ID
  createdAt: string;
}

export interface Meeting {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  participants: string;
  date: string;
  description?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  audioPath?: string;
  isDemoMode?: boolean;
  memoriesStored?: number;
  createdAt: string;
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface Transcript {
  meetingId: string;
  text: string;
  segments: TranscriptSegment[];
}

export interface ActionItem {
  task: string;
  assignee?: string;
  deadline?: string;
  status: 'open' | 'completed';
}

export interface MeetingAnalysis {
  summary: string;
  decisions: string[];
  requirements: string[];
  actionItems: ActionItem[];
  deadlines: string[];
  commitments: string[];
  unresolvedIssues: string[];
  preferences: string[];
  responsibilities: string[];
}

export interface ExtractedMemory {
  content: string;
  type: MemoryType;
  importance: 'high' | 'medium' | 'low';
}

export type MemoryType =
  | 'decision'
  | 'requirement'
  | 'commitment'
  | 'deadline'
  | 'preference'
  | 'unresolved'
  | 'responsibility'
  | 'budget'
  | 'context';

export interface ProcessingStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  detail?: string;
}

export interface MeetingBrief {
  clientName: string;
  previousDecisions: string[];
  requirements: string[];
  commitments: string[];
  outstandingIssues: string[];
  importantContext: string[];
  suggestedQuestions: string[];
  rawReflection?: string;
}

export interface RecallResult {
  text: string;
  score?: number;
}

export interface ProcessMeetingResult {
  meetingId: string;
  transcript: string;
  analysis: MeetingAnalysis;
  memoriesStored: number;
  memories: ExtractedMemory[];
}

export interface DemoTranscript {
  id: string;
  title: string;
  clientName: string;
  date: string;
  participants: string;
  text: string;
  description: string;
}
