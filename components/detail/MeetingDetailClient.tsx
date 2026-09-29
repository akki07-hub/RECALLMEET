'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, Calendar, Users, Trash2 } from 'lucide-react';
import { TranscriptViewer } from '@/components/detail/TranscriptViewer';
import { SummaryCard } from '@/components/detail/SummaryCard';
import { DecisionCard } from '@/components/detail/DecisionCard';
import { ActionItemCard } from '@/components/detail/ActionItemCard';
import { DemoTranscript } from '@/lib/demo-transcripts';

export function MeetingDetailClient({ demo }: { demo: DemoTranscript }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'insights'>('summary');

  const analysis = {
    summary: demo.summary,
    decisions: demo.decisions,
    requirements: demo.requirements,
    commitments: demo.commitments,
    unresolvedIssues: demo.openItems,
    deadlines: ['December 2026'],
    actionItems: demo.commitments.map((c) => ({
      task: c,
      assignee: c.split('→')[0]?.trim() || 'Team',
      deadline: 'December 2026',
      status: 'open',
    })),
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${demo.title}"?`)) {
      router.push('/meetings');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/meetings" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to meetings
        </Link>

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{demo.title}</h1>
              <span className="text-xs bg-purple-900/50 text-purple-400 border border-purple-700/50 px-2 py-0.5 rounded font-medium">
                Demo Meeting
              </span>
            </div>
            <p className="text-indigo-400 font-semibold">{demo.clientName}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                {demo.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                {demo.participants}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 px-3 py-2 rounded-xl">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">
                <strong>7</strong> memories in Hindsight
              </span>
            </div>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-red-950/60 border border-gray-800 hover:border-red-800/60 text-gray-400 hover:text-red-400 rounded-xl transition-all text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-gray-900 border border-gray-800 rounded-xl mb-6 w-fit">
        {(['summary', 'transcript', 'insights'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'summary' && (
        <div className="space-y-6">
          <SummaryCard summary={analysis.summary} />
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Key Insights</h3>
            <DecisionCard
              decisions={analysis.decisions}
              requirements={analysis.requirements}
              deadlines={analysis.deadlines}
              commitments={analysis.commitments}
              unresolvedIssues={analysis.unresolvedIssues}
            />
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <ActionItemCard items={analysis.actionItems} />
          </div>
        </div>
      )}

      {activeTab === 'transcript' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4">Meeting Transcript</h3>
          <TranscriptViewer text={demo.text} segments={[]} />
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Memories Stored in Hindsight</h3>
          </div>
          <p className="text-sm text-gray-300">
            7 key information points from this meeting were extracted and connected into the Hindsight memory bank for <strong className="text-white">{demo.clientName}</strong>.
          </p>
          <div className="text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 leading-relaxed">
            These memories enable Ask RecallMeet questions (&quot;What changed since our first meeting?&quot;) and Prepare Me briefs across all past meetings.
          </div>
        </div>
      )}
    </div>
  );
}
