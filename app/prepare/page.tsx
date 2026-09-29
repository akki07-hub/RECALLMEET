'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Brain } from 'lucide-react';
import { ClientSelector } from '@/components/memory/ClientSelector';
import { MeetingBrief } from '@/components/ask/MeetingBrief';

export default function PreparePage() {
  const [clientName, setClientName] = useState('Acme Fitness');
  const [brief, setBrief] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const handlePrepare = async () => {
    if (!clientName) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setBrief(true);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Prepare Me</h1>
        <p className="text-gray-400 mt-1">
          Generate an AI meeting preparation brief based on accumulated Hindsight memories.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6 shadow-lg">
        <div className="flex items-center gap-3">
          <ClientSelector
            value={clientName}
            onChange={(name) => { setClientName(name); setBrief(true); }}
            placeholder="Select a client..."
            className="flex-1"
          />
          <button
            onClick={handlePrepare}
            disabled={!clientName || loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-indigo-500/20"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Preparing...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Prepare Me</>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-xl">
          <Brain className="w-10 h-10 text-indigo-400 animate-pulse mx-auto mb-3" />
          <p className="text-gray-300 font-medium">Connecting Hindsight memories across past meetings...</p>
          <p className="text-xs text-gray-500 mt-1">Synthesizing decisions, requirements, open items, and history for {clientName}</p>
        </div>
      )}

      {brief && !loading && (
        <MeetingBrief clientName={clientName} />
      )}
    </div>
  );
}
