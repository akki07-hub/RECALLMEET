'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Mic, MicOff, CheckCircle, Loader2, Brain, ArrowRight, FileText, Database, Zap } from 'lucide-react';

// Sample live transcript lines that appear one-by-one
const TRANSCRIPT_LINES = [
  { speaker: 'Alex Morgan', text: 'Good afternoon everyone. Let\'s do a quick alignment on where we stand today, September 26.' },
  { speaker: 'Priya Nair', text: 'Let\'s review the current parameters. Budget is set at ₹1,25,000. WhatsApp integration is mandatory, and the analytics dashboard is required.' },
  { speaker: 'Alex Morgan', text: 'Correct. What about the blockers?' },
  { speaker: 'Rahul Sharma', text: 'I apologize for the delay on the proposal. It is undergoing final internal approval at our end.' },
  { speaker: 'Priya Nair', text: 'Also, we still need to provide the payment gateway credentials to your technical team.' },
  { speaker: 'Alex Morgan', text: 'Understood. So the two main open items are Rahul\'s proposal and the payment gateway credentials.' },
  { speaker: 'Rahul Sharma', text: 'Agreed. We will resolve these items quickly for the December launch.' },
];

const PARTICIPANTS = [
  { name: 'Alex Morgan', role: 'Account Manager', color: 'bg-indigo-500', initials: 'AM', speaking: true },
  { name: 'Rahul Sharma', role: 'Acme Fitness', color: 'bg-purple-500', initials: 'RS', speaking: false },
  { name: 'Priya Nair', role: 'Acme Fitness', color: 'bg-pink-500', initials: 'PN', speaking: false },
];

const HINDSIGHT_STEPS = [
  { id: 1, label: 'Transcript stored', detail: 'Full meeting text saved to Hindsight' },
  { id: 2, label: 'Decisions remembered', detail: 'Budget ₹1,25,000 · December launch · WhatsApp mandatory' },
  { id: 3, label: 'Commitments remembered', detail: 'Rahul → Proposal · Priya → Payment credentials' },
  { id: 4, label: 'Requirements remembered', detail: 'WhatsApp integration · Analytics dashboard' },
];

type Stage = 'room' | 'saving' | 'done';

export default function MeetingRoomPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('room');
  const [visibleLines, setVisibleLines] = useState(0);
  const [savedSteps, setSavedSteps] = useState<number[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Simulate live transcript appearing
  useEffect(() => {
    if (stage !== 'room') return;
    if (visibleLines >= TRANSCRIPT_LINES.length) return;
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setActiveSpeaker(visibleLines % PARTICIPANTS.length);
    }, 1200);
    return () => clearTimeout(t);
  }, [visibleLines, stage]);

  // Meeting timer
  useEffect(() => {
    if (stage !== 'room') return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [stage]);

  // Hindsight save sequence
  useEffect(() => {
    if (stage !== 'saving') return;
    HINDSIGHT_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setSavedSteps((prev) => [...prev, step.id]);
        if (i === HINDSIGHT_STEPS.length - 1) {
          setTimeout(() => setStage('done'), 600);
        }
      }, 600 + i * 700);
    });
  }, [stage]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {stage === 'room' ? 'Meeting Room' : stage === 'saving' ? 'Saving to Hindsight...' : 'Hindsight Memory Updated'}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {stage === 'room'
              ? `Acme Fitness — Meeting 3 · ${formatTime(elapsed)}`
              : stage === 'saving'
              ? 'RecallMeet is connecting this meeting to your persistent memory bank.'
              : 'This meeting is now part of Acme Fitness\'s memory. Past context + this meeting = full picture.'}
          </p>
        </div>
        {stage === 'room' && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/50 px-3 py-1.5 rounded-full font-semibold animate-pulse">
            <div className="w-2 h-2 bg-red-400 rounded-full" /> LIVE
          </div>
        )}
      </div>

      {/* ── STAGE: ROOM ── */}
      {stage === 'room' && (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: participants + controls */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-indigo-400" />
                <h2 className="font-semibold text-white text-sm">Participants (3)</h2>
              </div>
              <div className="space-y-3">
                {PARTICIPANTS.map((p, i) => (
                  <div
                    key={p.name}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeSpeaker === i ? 'bg-indigo-950/50 border border-indigo-500/40' : 'bg-gray-800/40'}`}
                  >
                    <div className={`w-10 h-10 rounded-full ${p.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative`}>
                      {p.initials}
                      {activeSpeaker === i && visibleLines < TRANSCRIPT_LINES.length && (
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.role}</p>
                    </div>
                    {activeSpeaker === i && visibleLines < TRANSCRIPT_LINES.length && (
                      <span className="ml-auto text-xs text-green-400 font-medium">Speaking</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-lg">
              <button
                onClick={() => setMuted((m) => !m)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${muted ? 'bg-red-950/60 text-red-400 border border-red-800/50' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
              >
                {muted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {muted ? 'Unmute' : 'Mute'}
              </button>
              <button
                onClick={() => setStage('saving')}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg"
              >
                End Meeting
              </button>
            </div>

            {/* Hindsight info card */}
            <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Hindsight Memory</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                When the meeting ends, RecallMeet will automatically extract and store all decisions, commitments, and requirements into the Hindsight memory bank for Acme Fitness.
              </p>
            </div>
          </div>

          {/* Right: live transcript */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <h2 className="font-semibold text-white text-sm">Live Transcript</h2>
                </div>
                <span className="text-xs text-gray-500">Auto-generated</span>
              </div>
              <div className="space-y-4 min-h-64">
                {TRANSCRIPT_LINES.slice(0, visibleLines).map((line, i) => {
                  const p = PARTICIPANTS.find((x) => x.name === line.speaker)!;
                  return (
                    <div key={i} className="flex gap-3 animate-fadeIn">
                      <div className={`w-7 h-7 rounded-full ${p?.color || 'bg-gray-600'} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>
                        {p?.initials || '?'}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-indigo-300 mb-0.5">{line.speaker}</p>
                        <p className="text-sm text-gray-200 leading-relaxed">{line.text}</p>
                      </div>
                    </div>
                  );
                })}
                {visibleLines < TRANSCRIPT_LINES.length && (
                  <div className="flex gap-2 items-center text-xs text-gray-500">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                    Transcribing...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STAGE: SAVING ── */}
      {stage === 'saving' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Visual flow diagram */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center shadow-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 font-medium">
              <FileText className="w-4 h-4 text-indigo-400" /> Meeting Transcript
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-600">
              <div className="w-px h-5 bg-indigo-500/60" />
              <ArrowRight className="w-4 h-4 rotate-90 text-indigo-500" />
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-900/80 to-purple-900/60 border border-indigo-500/50 rounded-xl text-base text-white font-bold shadow-xl shadow-indigo-500/10">
              <Brain className="w-5 h-5 text-indigo-400 animate-pulse" />
              HINDSIGHT
              <Loader2 className="w-4 h-4 text-purple-400 animate-spin ml-1" />
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-600">
              <div className="w-px h-5 bg-purple-500/60" />
              <ArrowRight className="w-4 h-4 rotate-90 text-purple-500" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 font-medium">
              <Database className="w-4 h-4 text-purple-400" /> Persistent Meeting Memory
            </div>
          </div>

          {/* Step-by-step checklist */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl space-y-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">Saving to Hindsight...</p>
            {HINDSIGHT_STEPS.map((step) => {
              const done = savedSteps.includes(step.id);
              return (
                <div key={step.id} className={`flex items-start gap-3 transition-all ${done ? 'opacity-100' : 'opacity-40'}`}>
                  {done
                    ? <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    : <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className={`text-sm font-semibold ${done ? 'text-white' : 'text-gray-500'}`}>{step.label}</p>
                    {done && <p className="text-xs text-gray-400 mt-0.5">{step.detail}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STAGE: DONE ── */}
      {stage === 'done' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success banner */}
          <div className="bg-gradient-to-br from-indigo-950/80 via-purple-950/50 to-gray-900 border border-indigo-500/40 rounded-xl p-8 text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Hindsight Memory Updated</h2>
              <p className="text-gray-400 text-sm">
                Your meeting context is now available for future conversations, questions, and briefings.
              </p>
            </div>

            {/* All steps confirmed */}
            <div className="text-left bg-gray-900/60 border border-gray-800 rounded-xl p-4 space-y-2">
              {HINDSIGHT_STEPS.map((step) => (
                <div key={step.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">{step.label}</span>
                </div>
              ))}
            </div>

            {/* Hindsight connection graphic */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="text-xs text-center text-gray-400">
                <FileText className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                Meeting 3<br/>Sep 26
              </div>
              <div className="flex items-center gap-1 text-indigo-500">
                <div className="w-8 h-px bg-indigo-500/60" />
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className="text-xs text-center">
                <div className="w-10 h-10 rounded-full bg-indigo-900/80 border border-indigo-500/50 flex items-center justify-center mx-auto mb-1">
                  <Brain className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-indigo-300 font-semibold">Hindsight</span>
              </div>
              <div className="flex items-center gap-1 text-purple-500">
                <div className="w-8 h-px bg-purple-500/60" />
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className="text-xs text-center text-gray-400">
                <Zap className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                3 Meetings<br/>Connected
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/meetings"
              className="block text-center py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20"
            >
              View Meeting History
            </Link>
            <Link
              href="/ask"
              className="block text-center py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 font-semibold rounded-xl text-sm transition-all"
            >
              Ask RecallMeet
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
