'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles, CheckCircle, Brain, Calendar } from 'lucide-react';
import { AudioUploader } from '@/components/meetings/AudioUploader';
import { MeetingRecorder } from '@/components/meetings/MeetingRecorder';
import { ProcessingStatus, ProcessStep } from '@/components/meetings/ProcessingStatus';

const demoTranscripts = [
  { id: 'acme-meeting-1', title: 'Meeting 1 — Initial Discussion', clientName: 'Acme Fitness', date: 'September 12, 2026' },
  { id: 'acme-meeting-2', title: 'Meeting 2 — Requirements Update', clientName: 'Acme Fitness', date: 'September 19, 2026' },
  { id: 'acme-meeting-3', title: 'Meeting 3 — Latest Discussion', clientName: 'Acme Fitness', date: 'September 26, 2026' },
];

const INITIAL_STEPS: ProcessStep[] = [
  { id: '1', label: 'Transcript captured', status: 'pending' },
  { id: '2', label: 'Decisions identified', status: 'pending' },
  { id: '3', label: 'Commitments identified', status: 'pending' },
  { id: '4', label: 'Requirements identified', status: 'pending' },
  { id: '5', label: 'Previous meeting context connected', status: 'pending' },
];

type InputMode = 'demo' | 'upload' | 'record';

export default function NewMeetingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<InputMode>('demo');
  const [title, setTitle] = useState('Meeting 3 — Latest Discussion');
  const [clientName, setClientName] = useState('Acme Fitness');
  const [participants, setParticipants] = useState('Alex Morgan, Rahul Sharma, Priya Nair');
  const [date, setDate] = useState('September 26, 2026');
  const [description, setDescription] = useState('Status review on proposal and payment credentials.');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [demoId, setDemoId] = useState(demoTranscripts[2].id);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [steps, setSteps] = useState<ProcessStep[]>(INITIAL_STEPS);
  const [error, setError] = useState<string | null>(null);

  const updateStep = (id: string, status: ProcessStep['status'], detail?: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, detail } : s))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientName) {
      setError('Meeting title and client name are required');
      return;
    }

    setProcessing(true);
    setCompleted(false);
    setError(null);
    setSteps(INITIAL_STEPS);

    // Run pipeline sequence
    updateStep('1', 'active', 'Capturing text transcript');
    await new Promise((r) => setTimeout(r, 400));
    updateStep('1', 'completed', 'Transcript captured');

    updateStep('2', 'active', 'Extracting agreed decisions');
    await new Promise((r) => setTimeout(r, 400));
    updateStep('2', 'completed', 'Decisions identified');

    updateStep('3', 'active', 'Tracking commitments & deliverables');
    await new Promise((r) => setTimeout(r, 400));
    updateStep('3', 'completed', 'Commitments identified');

    updateStep('4', 'active', 'Parsing technical & business requirements');
    await new Promise((r) => setTimeout(r, 400));
    updateStep('4', 'completed', 'Requirements identified');

    updateStep('5', 'active', 'Connecting to Hindsight Cloud memory bank');
    await new Promise((r) => setTimeout(r, 500));
    updateStep('5', 'completed', 'Previous meeting context connected');

    setProcessing(false);
    setCompleted(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">New Meeting</h1>
        <p className="text-gray-400 mt-1">Process a meeting to connect it with Hindsight persistent memory.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4 shadow-lg">
              <h2 className="font-semibold text-white">Meeting Details</h2>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Meeting Name *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Meeting 3 — Latest Discussion"
                  className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Client / Company *</label>
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Acme Fitness"
                  className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Date</label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="September 26, 2026"
                    className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Participants</label>
                  <input
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                    placeholder="Alex Morgan, Rahul Sharma, Priya Nair"
                    className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4 shadow-lg">
              <h2 className="font-semibold text-white">Audio Input</h2>

              <div className="grid grid-cols-3 gap-2">
                {(['demo', 'upload', 'record'] as InputMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      mode === m
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {m === 'demo' ? '🎭 Demo Mode' : m === 'upload' ? '📁 Upload' : '🎙 Record'}
                  </button>
                ))}
              </div>

              {mode === 'demo' && (
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-lg text-xs text-indigo-300">
                    Select a demo meeting from the Acme Fitness timeline to process and connect into memory.
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Select Demo Meeting</label>
                    <select
                      value={demoId}
                      onChange={(e) => {
                        const demo = demoTranscripts.find(d => d.id === e.target.value);
                        setDemoId(e.target.value);
                        if (demo) {
                          setTitle(demo.title);
                          setClientName(demo.clientName);
                          setDate(demo.date);
                        }
                      }}
                      className="w-full px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      {demoTranscripts.map((d) => (
                        <option key={d.id} value={d.id}>{d.title} ({d.date})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {mode === 'upload' && (
                <AudioUploader
                  onFileSelect={setAudioFile}
                  onClear={() => setAudioFile(null)}
                  selectedFile={audioFile}
                />
              )}

              {mode === 'record' && (
                <MeetingRecorder
                  onRecordingComplete={setRecordedBlob}
                  onClear={() => setRecordedBlob(null)}
                />
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-950/40 border border-red-800/50 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={processing || completed}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              {processing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing Meeting...</>
              ) : completed ? (
                <><CheckCircle className="w-5 h-5 text-green-400" /> Memory Updated</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Process & Connect Memory</>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Processing & Hindsight Memory Update Screen */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 sticky top-8 shadow-xl space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-1">
                {completed ? 'Meeting Complete' : 'RecallMeet Memory Engine'}
              </h3>
              <p className="text-xs text-gray-400">
                {completed
                  ? 'RecallMeet is updating your meeting memory.'
                  : 'Connecting meeting context to persistent memory.'}
              </p>
            </div>

            <ProcessingStatus steps={steps} />

            {/* Polished Hindsight Memory Updated Box */}
            {completed && (
              <div className="bg-gradient-to-br from-indigo-950/80 via-purple-950/50 to-gray-900 border border-indigo-500/40 rounded-xl p-5 space-y-4 shadow-xl animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h4 className="font-bold text-white text-sm">HINDSIGHT MEMORY UPDATED</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Your meeting context is now stored and available for future conversations, questions, and briefing reports.
                </p>
                <Link
                  href="/meetings"
                  className="block text-center py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition-all shadow-md"
                >
                  View Meeting History
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
