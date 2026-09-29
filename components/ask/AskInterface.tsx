'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, Brain, Sparkles, ExternalLink, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
}

// ── Static demo answers ──────────────────────────────────────────────────────
const ANSWERS: Record<string, () => React.ReactNode> = {
  'what changed since our first meeting?': () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-200">Since your first meeting with Acme Fitness on Sep 12, several things changed:</p>
      <div className="space-y-2">
        {[
          { label: 'Budget', from: '₹1,00,000', to: '₹1,25,000', color: 'green' },
          { label: 'WhatsApp', from: 'Desirable', to: 'Mandatory', color: 'indigo' },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2 text-sm bg-gray-800 rounded-lg px-3 py-2">
            <span className="text-gray-400 w-20 flex-shrink-0">{row.label}</span>
            <span className="text-gray-400 line-through text-xs">{row.from}</span>
            <span className="text-gray-500 mx-1">→</span>
            <span className={`font-semibold text-${row.color}-400`}>{row.to}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 text-sm bg-blue-950/40 border border-blue-800/40 rounded-lg px-3 py-2">
          <span className="text-blue-300 text-xs font-semibold">NEW</span>
          <span className="text-gray-200">Analytics dashboard added as a requirement</span>
        </div>
        <div className="flex items-center gap-2 text-sm bg-orange-950/40 border border-orange-800/40 rounded-lg px-3 py-2">
          <span className="text-orange-300 text-xs font-semibold">PENDING</span>
          <span className="text-gray-200">Rahul's proposal still not delivered</span>
        </div>
        <div className="flex items-center gap-2 text-sm bg-gray-800 rounded-lg px-3 py-2">
          <span className="text-green-300 text-xs font-semibold">UNCHANGED</span>
          <span className="text-gray-200">December launch target remains the same</span>
        </div>
      </div>
      <SourceLinks />
    </div>
  ),
  'what did we decide about the budget?': () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-200">The budget evolved across three meetings:</p>
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2 bg-gray-800 rounded-lg p-2.5">
          <span className="text-xs text-indigo-400 font-semibold mt-0.5 w-16 flex-shrink-0">Meeting 1</span>
          <span className="text-gray-200">Initial budget agreed at <strong className="text-white">₹1,00,000</strong>. Described as the maximum ceiling.</span>
        </div>
        <div className="flex items-start gap-2 bg-gray-800 rounded-lg p-2.5">
          <span className="text-xs text-indigo-400 font-semibold mt-0.5 w-16 flex-shrink-0">Meeting 2</span>
          <span className="text-gray-200">Budget <strong className="text-green-400">increased to ₹1,25,000</strong> to cover mandatory WhatsApp and new analytics dashboard.</span>
        </div>
        <div className="flex items-start gap-2 bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-2.5">
          <span className="text-xs text-indigo-400 font-semibold mt-0.5 w-16 flex-shrink-0">Meeting 3</span>
          <span className="text-gray-200">Budget <strong className="text-green-400">confirmed at ₹1,25,000</strong>. This is the final agreed amount.</span>
        </div>
      </div>
      <SourceLinks sources={[
        { id: 'acme-meeting-1', label: 'Meeting 1 — Sep 12' },
        { id: 'acme-meeting-2', label: 'Meeting 2 — Sep 19' },
        { id: 'acme-meeting-3', label: 'Meeting 3 — Sep 26' },
      ]} />
    </div>
  ),
  'who was supposed to send the proposal?': () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-200">
        <strong className="text-white">Rahul Sharma</strong> (Acme Fitness) committed in Meeting 1 (Sep 12) to deliver the formal project proposal.
      </p>
      <div className="bg-orange-950/40 border border-orange-800/40 rounded-xl p-4 text-sm space-y-1">
        <p className="text-orange-300 font-semibold text-xs uppercase tracking-wider">⚠ Still Pending</p>
        <p className="text-gray-200">As of Meeting 3 (Sep 26), the proposal is <strong className="text-orange-300">still awaiting final internal approval</strong> from Rahul's side. This is an active blocker.</p>
      </div>
      <SourceLinks sources={[
        { id: 'acme-meeting-1', label: 'Meeting 1 — Sep 12 (commitment made)' },
        { id: 'acme-meeting-3', label: 'Meeting 3 — Sep 26 (still pending)' },
      ]} />
    </div>
  ),
  'what are we still waiting for?': () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-200">Two unresolved items from Acme Fitness remain open:</p>
      <div className="space-y-2">
        <div className="bg-orange-950/40 border border-orange-800/40 rounded-xl p-3 text-sm">
          <p className="text-orange-300 font-semibold">1. Rahul's Proposal</p>
          <p className="text-gray-400 text-xs mt-0.5">Committed Sep 12. Still pending final approval as of Sep 26.</p>
        </div>
        <div className="bg-orange-950/40 border border-orange-800/40 rounded-xl p-3 text-sm">
          <p className="text-orange-300 font-semibold">2. Payment Gateway Credentials</p>
          <p className="text-gray-400 text-xs mt-0.5">Required for platform integration. Priya is coordinating with finance.</p>
        </div>
      </div>
      <SourceLinks sources={[
        { id: 'acme-meeting-2', label: 'Meeting 2 — Sep 19' },
        { id: 'acme-meeting-3', label: 'Meeting 3 — Sep 26' },
      ]} />
    </div>
  ),
  'prepare me for my next meeting.': () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-200 font-semibold">Next Meeting Brief — Acme Fitness</p>
      <div className="space-y-2 text-sm">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">CURRENT BUDGET</p>
          <p className="text-green-400 font-bold text-base">₹1,25,000</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">KEY REQUIREMENTS</p>
          <p className="text-gray-200">• WhatsApp integration (Mandatory)</p>
          <p className="text-gray-200">• Analytics dashboard (Required)</p>
        </div>
        <div className="bg-orange-950/40 border border-orange-800/40 rounded-lg p-3">
          <p className="text-xs text-orange-400 mb-1">OPEN ITEMS — ASK TODAY</p>
          <p className="text-gray-200">1. When will Rahul deliver the proposal?</p>
          <p className="text-gray-200">2. Can Priya provide payment gateway credentials today?</p>
        </div>
      </div>
      <SourceLinks />
    </div>
  ),
};

function SourceLinks({ sources }: {
  sources?: { id: string; label: string }[]
}) {
  const defaultSources = [
    { id: 'acme-meeting-1', label: 'Meeting 1 — Sep 12' },
    { id: 'acme-meeting-2', label: 'Meeting 2 — Sep 19' },
    { id: 'acme-meeting-3', label: 'Meeting 3 — Sep 26' },
  ];
  const list = sources || defaultSources;
  return (
    <div className="border-t border-indigo-500/20 pt-3 mt-3">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">SOURCES</span>
        <span className="text-xs text-gray-500 bg-indigo-950/50 border border-indigo-800/50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
          <Brain className="w-3 h-3" /> Hindsight Memory
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {list.map((s) => (
          <Link
            key={s.id}
            href={`/meetings/${s.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-indigo-950/60 border border-indigo-500/30 hover:border-indigo-400 rounded-lg text-xs font-medium text-indigo-200 transition-all group"
          >
            {s.label}
            <ExternalLink className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}

const SUGGESTED = [
  'What changed since our first meeting?',
  'What did we decide about the budget?',
  'Who was supposed to send the proposal?',
  'What are we still waiting for?',
  'Prepare me for my next meeting.',
];

export function AskInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (q: string) => {
    const question = q.trim();
    if (!question) return;

    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setInput('');
    setThinking(true);

    await new Promise((r) => setTimeout(r, 500));

    const key = question.toLowerCase().replace(/[^a-z0-9\s?'→]/g, '');
    const matchKey = Object.keys(ANSWERS).find((k) => {
      const kNorm = k.toLowerCase();
      return question.toLowerCase().includes(kNorm.slice(0, 20)) || kNorm.includes(question.toLowerCase().slice(0, 20));
    });

    const answerFn = matchKey ? ANSWERS[matchKey] : undefined;
    const answer: React.ReactNode = answerFn
      ? answerFn()
      : (
        <div className="space-y-3 text-sm">
          <p className="text-gray-200">
            Based on Hindsight memory for Acme Fitness: Budget is ₹1,25,000, WhatsApp integration is mandatory, analytics dashboard is required. Proposal and payment gateway credentials remain open items.
          </p>
          <SourceLinks />
        </div>
      );

    setThinking(false);
    setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Suggested questions */}
      {messages.length === 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ask a question about Acme Fitness</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className={`text-sm px-3.5 py-2 border rounded-lg transition-all flex items-center gap-1.5 text-left ${
                  q === 'What changed since our first meeting?'
                    ? 'bg-indigo-900/60 border-indigo-500/50 text-indigo-100 hover:border-indigo-400 font-semibold shadow-md'
                    : 'bg-gray-900 hover:bg-gray-800 border-gray-800 text-gray-300'
                }`}
              >
                {q === 'What changed since our first meeting?' && <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />}
                {q}
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 leading-relaxed flex items-start gap-2">
            <Brain className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Powered by Hindsight Memory.</strong> RecallMeet doesn't just search notes from one meeting — it synthesizes information across <em>all</em> past meetings for Acme Fitness.
            </span>
          </div>
        </div>
      )}

      {/* Chat thread */}
      {messages.length > 0 && (
        <div className="space-y-4 min-h-40">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-900/80 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain className="w-4 h-4 text-indigo-400" />
                </div>
              )}
              <div
                className={`max-w-2xl rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none text-sm'
                    : 'bg-gray-900 border border-indigo-500/20 rounded-bl-none shadow-lg'
                }`}
              >
                {typeof msg.content === 'string' ? (
                  <p className="text-sm">{msg.content}</p>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          ))}
          {thinking && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-900/80 border border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-indigo-400 animate-pulse" />
              </div>
              <div className="bg-gray-900 border border-indigo-500/20 rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex items-center gap-1.5 text-xs text-indigo-300">
                  <span>Recalling from Hindsight</span>
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 150}ms` }} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input bar */}
      <div className="flex gap-2 sticky bottom-0 bg-gray-950 pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask anything about Acme Fitness meetings..."
          className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={thinking || !input.trim()}
          className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
