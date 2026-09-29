'use client';

import { useState } from 'react';
import { Brain, CheckCircle, Target, Star, AlertTriangle, Database } from 'lucide-react';
import { ClientSelector } from '@/components/memory/ClientSelector';

interface MemoryItem {
  type: 'DECISION' | 'REQUIREMENT' | 'COMMITMENT' | 'OPEN ISSUE';
  text: string;
  source: string;
  date: string;
}

const ACME_MEMORIES: MemoryItem[] = [
  { type: 'DECISION', text: 'Budget increased from ₹1,00,000 to ₹1,25,000', source: 'Meeting 2', date: 'Sep 19, 2026' },
  { type: 'DECISION', text: 'Target launch confirmed for December 2026', source: 'Meeting 1', date: 'Sep 12, 2026' },
  { type: 'DECISION', text: 'WhatsApp integration status changed from desirable to mandatory', source: 'Meeting 2', date: 'Sep 19, 2026' },
  { type: 'DECISION', text: 'Analytics dashboard added to project scope', source: 'Meeting 2', date: 'Sep 19, 2026' },
  { type: 'DECISION', text: 'Final contract terms confirmed at ₹1,25,000', source: 'Meeting 3', date: 'Sep 26, 2026' },

  { type: 'REQUIREMENT', text: 'WhatsApp integration is mandatory for launch', source: 'Meeting 2', date: 'Sep 19, 2026' },
  { type: 'REQUIREMENT', text: 'Analytics dashboard required for member tracking', source: 'Meeting 2', date: 'Sep 19, 2026' },
  { type: 'REQUIREMENT', text: 'Customer engagement portal website redesign', source: 'Meeting 1', date: 'Sep 12, 2026' },
  { type: 'REQUIREMENT', text: 'December launch deadline before peak membership campaign', source: 'Meeting 1', date: 'Sep 12, 2026' },

  { type: 'COMMITMENT', text: 'Rahul Sharma will provide the project proposal', source: 'Meeting 1', date: 'Sep 12, 2026' },
  { type: 'COMMITMENT', text: 'Priya Nair to document analytics requirements', source: 'Meeting 2', date: 'Sep 19, 2026' },
  { type: 'COMMITMENT', text: 'Alex Morgan team to deliver site before December', source: 'Meeting 1', date: 'Sep 12, 2026' },
  { type: 'COMMITMENT', text: 'Rahul to expedite final internal proposal approval', source: 'Meeting 3', date: 'Sep 26, 2026' },
  { type: 'COMMITMENT', text: 'Priya to coordinate payment credentials with finance', source: 'Meeting 3', date: 'Sep 26, 2026' },
  { type: 'COMMITMENT', text: 'Alex team to commence execution upon contract receipt', source: 'Meeting 3', date: 'Sep 26, 2026' },

  { type: 'OPEN ISSUE', text: 'Payment gateway credentials are still required from Acme finance team', source: 'Meeting 3', date: 'Sep 26, 2026' },
  { type: 'OPEN ISSUE', text: 'Proposal from Rahul Sharma remains pending approval', source: 'Meeting 3', date: 'Sep 26, 2026' },
];

export default function MemoryPage() {
  const [clientName, setClientName] = useState('Acme Fitness');
  const [filter, setFilter] = useState<'ALL' | 'DECISION' | 'REQUIREMENT' | 'COMMITMENT' | 'OPEN ISSUE'>('ALL');

  const filteredMemories = filter === 'ALL'
    ? ACME_MEMORIES
    : ACME_MEMORIES.filter((m) => m.type === filter);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <Brain className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold text-white">Hindsight Memory</h1>
        </div>
        <p className="text-gray-400">
          Persistent client knowledge retained and connected across multiple meetings.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6 shadow-lg">
        <ClientSelector
          value={clientName}
          onChange={setClientName}
          placeholder="Select client..."
        />
      </div>

      {/* Memory Stats Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-gray-900 border border-purple-500/30 rounded-xl p-6 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{clientName}</h2>
              <span className="text-xs bg-purple-900/80 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                <Database className="w-3 h-3" /> Stored in Hindsight
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Recalled & connected across 3 meetings (Sep 12 — Sep 26, 2026)
            </p>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div className="bg-gray-900/80 border border-gray-800 px-3.5 py-2 rounded-lg">
              <span className="text-lg font-bold text-white block">3</span>
              <span className="text-xs text-gray-400">Meetings</span>
            </div>
            <div className="bg-gray-900/80 border border-gray-800 px-3.5 py-2 rounded-lg">
              <span className="text-lg font-bold text-purple-400 block">23</span>
              <span className="text-xs text-gray-400">Memories</span>
            </div>
            <div className="bg-gray-900/80 border border-gray-800 px-3.5 py-2 rounded-lg">
              <span className="text-lg font-bold text-green-400 block">5</span>
              <span className="text-xs text-gray-400">Decisions</span>
            </div>
            <div className="bg-gray-900/80 border border-gray-800 px-3.5 py-2 rounded-lg">
              <span className="text-lg font-bold text-blue-400 block">4</span>
              <span className="text-xs text-gray-400">Requirements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['ALL', 'DECISION', 'REQUIREMENT', 'COMMITMENT', 'OPEN ISSUE'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-900 hover:bg-gray-800 text-gray-400 border border-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Memory List */}
      <div className="space-y-3">
        {filteredMemories.map((mem, i) => {
          const isDecision = mem.type === 'DECISION';
          const isReq = mem.type === 'REQUIREMENT';
          const isCommitment = mem.type === 'COMMITMENT';
          const isOpen = mem.type === 'OPEN ISSUE';

          return (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-all flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                      isDecision
                        ? 'bg-green-950 text-green-400 border border-green-800/60'
                        : isReq
                        ? 'bg-blue-950 text-blue-400 border border-blue-800/60'
                        : isCommitment
                        ? 'bg-purple-950 text-purple-400 border border-purple-800/60'
                        : 'bg-orange-950 text-orange-400 border border-orange-800/60'
                    }`}
                  >
                    {isDecision && <CheckCircle className="w-3 h-3" />}
                    {isReq && <Target className="w-3 h-3" />}
                    {isCommitment && <Star className="w-3 h-3" />}
                    {isOpen && <AlertTriangle className="w-3 h-3" />}
                    {mem.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    Source: <strong className="text-gray-400">{mem.source}</strong> ({mem.date})
                  </span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed font-medium">{mem.text}</p>
              </div>

              <span className="text-xs text-purple-400/80 bg-purple-950/40 border border-purple-900/40 px-2 py-1 rounded flex-shrink-0">
                Stored in Hindsight
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
