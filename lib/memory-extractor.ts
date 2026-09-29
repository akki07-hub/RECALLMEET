// Memory extraction — decides WHAT to store in Hindsight.
// Only high-value, future-relevant information gets retained.

import { MeetingAnalysis, ExtractedMemory, MemoryType } from './types';

interface MeetingContext {
  clientName: string;
  meetingTitle: string;
  date: string;
  participants: string;
}

export function extractMemoriesFromAnalysis(
  analysis: MeetingAnalysis,
  context: MeetingContext
): ExtractedMemory[] {
  const memories: ExtractedMemory[] = [];
  const { clientName, meetingTitle, date } = context;
  const prefix = `[${meetingTitle}, ${date}]`;

  // --- DECISIONS ---
  for (const decision of analysis.decisions) {
    if (decision.trim()) {
      memories.push({
        content: `${prefix} DECISION: ${decision}`,
        type: 'decision',
        importance: 'high',
      });
    }
  }

  // --- COMMITMENTS ---
  for (const commitment of analysis.commitments) {
    if (commitment.trim()) {
      memories.push({
        content: `${prefix} COMMITMENT: ${commitment}`,
        type: 'commitment',
        importance: 'high',
      });
    }
  }

  // --- REQUIREMENTS ---
  for (const requirement of analysis.requirements) {
    if (requirement.trim()) {
      memories.push({
        content: `${prefix} REQUIREMENT for ${clientName}: ${requirement}`,
        type: 'requirement',
        importance: 'high',
      });
    }
  }

  // --- DEADLINES ---
  for (const deadline of analysis.deadlines) {
    if (deadline.trim()) {
      memories.push({
        content: `${prefix} DEADLINE: ${deadline}`,
        type: 'deadline',
        importance: 'high',
      });
    }
  }

  // --- PREFERENCES ---
  for (const preference of analysis.preferences) {
    if (preference.trim()) {
      memories.push({
        content: `${prefix} PREFERENCE of ${clientName}: ${preference}`,
        type: 'preference',
        importance: 'medium',
      });
    }
  }

  // --- UNRESOLVED ISSUES ---
  for (const issue of analysis.unresolvedIssues) {
    if (issue.trim()) {
      memories.push({
        content: `${prefix} UNRESOLVED: ${issue}`,
        type: 'unresolved',
        importance: 'medium',
      });
    }
  }

  // --- RESPONSIBILITIES ---
  for (const responsibility of analysis.responsibilities) {
    if (responsibility.trim()) {
      memories.push({
        content: `${prefix} RESPONSIBILITY: ${responsibility}`,
        type: 'responsibility',
        importance: 'medium',
      });
    }
  }

  // --- ACTION ITEMS ---
  for (const item of analysis.actionItems) {
    if (item.task.trim() && item.assignee) {
      const deadlineStr = item.deadline ? ` by ${item.deadline}` : '';
      memories.push({
        content: `${prefix} ACTION ITEM: ${item.assignee} must ${item.task}${deadlineStr}`,
        type: 'commitment',
        importance: 'medium',
      });
    }
  }

  return memories;
}

export function formatMemoryForDisplay(content: string): string {
  return content.replace(/^\[.*?\]\s*/, '');
}

export function getMemoryTypeLabel(type: MemoryType): string {
  const labels: Record<MemoryType, string> = {
    decision: 'Decision',
    requirement: 'Requirement',
    commitment: 'Commitment',
    deadline: 'Deadline',
    preference: 'Preference',
    unresolved: 'Unresolved',
    responsibility: 'Responsibility',
    budget: 'Budget',
    context: 'Context',
  };
  return labels[type] || type;
}

export function getMemoryTypeColor(type: MemoryType): string {
  const colors: Record<MemoryType, string> = {
    decision: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    requirement: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    commitment: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    deadline: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    preference: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    unresolved: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    responsibility: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    budget: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    context: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  };
  return colors[type] || colors.context;
}
