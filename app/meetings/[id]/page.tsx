'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, Calendar, Users, Loader2, Trash2 } from 'lucide-react';
import { TranscriptViewer } from '@/components/detail/TranscriptViewer';
import { SummaryCard } from '@/components/detail/SummaryCard';
import { DecisionCard } from '@/components/detail/DecisionCard';
import { ActionItemCard } from '@/components/detail/ActionItemCard';

interface Meeting {
  id: string;
  title: string;
  client_name: string;
  participants: string;
  date: string;
  status: string;
  memories_stored: number;
  is_demo_mode: number;
  description: string | null;
}

export default function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [data, setData] = useState<{ meeting: Meeting; transcript?: { text: string; segments: unknown[] }; analysis?: Record<string, unknown> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'insights'>('summary');

  useEffect(() => {
    fetch(`/api/meetings/${id}`)
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!data?.meeting) return;
    if (!confirm(`Are you sure you want to delete "${data.meeting.title}"?`)) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/meetings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      router.push('/meetings');
    } catch (err) {
      alert('Failed to delete meeting');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  if (!data?.meeting) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Meeting not found</p>
        <Link href="/meetings" className="text-indigo-400 hover:text-indigo-300 text-sm mt-2 inline-block">
          ← Back to meetings
        </Link>
      </div>
    );
  }

  const { meeting, transcript, analysis } = data;

  return (
    <div>
      <div className="mb-6">
        <Link href="/meetings" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to meetings
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{meeting.title}</h1>
              {meeting.is_demo_mode === 1 && (
                <span className="text-xs bg-purple-900/50 text-purple-400 border border-purple-700/50 px-2 py-0.5 rounded">
                  Demo
                </span>
              )}
            </div>
            <p className="text-indigo-400 font-medium">{meeting.client_name}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {meeting.date}
              </span>
              {meeting.participants && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />{meeting.participants}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {meeting.memories_stored > 0 && (
              <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 px-3 py-2 rounded-xl">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">
                  <strong>{meeting.memories_stored}</strong> memories in Hindsight
                </span>
              </div>
            )}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-red-950/60 border border-gray-800 hover:border-red-800/60 text-gray-400 hover:text-red-400 rounded-xl transition-all text-sm font-medium disabled:opacity-50"
              title="Delete this meeting"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

      {activeTab === 'summary' && analysis && (
        <div className="space-y-6">
          <SummaryCard summary={analysis.summary as string} />
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Key Insights</h3>
            <DecisionCard
              decisions={analysis.decisions as string[]}
              requirements={analysis.requirements as string[]}
              deadlines={analysis.deadlines as string[]}
              commitments={analysis.commitments as string[]}
              unresolvedIssues={analysis.unresolvedIssues as string[]}
              preferences={analysis.preferences as string[]}
            />
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <ActionItemCard items={analysis.actionItems as any[]} />
          </div>
        </div>
      )}

      {activeTab === 'transcript' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4">Meeting Transcript</h3>
          {transcript ? (
            <TranscriptViewer text={transcript.text} segments={transcript.segments as any[]} />
          ) : (
            <p className="text-gray-500 text-sm">Transcript not available.</p>
          )}
        </div>
      )}

      {activeTab === 'insights' && analysis && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Memories Stored in Hindsight</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            {meeting.memories_stored} pieces of information from this meeting were retained in the Hindsight memory bank for <strong className="text-white">{meeting.client_name}</strong>.
          </p>
          <div className="text-xs text-gray-400 bg-gray-800 rounded-lg p-3">
            These memories are now available for future meetings, Ask RecallMeet queries, and Prepare Me briefs.
          </div>
        </div>
      )}

      {meeting.status === 'processing' && (
        <div className="text-center py-10">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-3" />
          <p className="text-gray-400">Processing meeting...</p>
        </div>
      )}
    </div>
  );
}
