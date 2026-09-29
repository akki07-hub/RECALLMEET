import { AskInterface } from '@/components/ask/AskInterface';
import { Brain, MessageSquare } from 'lucide-react';

export default function AskPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <MessageSquare className="w-6 h-6 text-indigo-400" />
          <h1 className="text-2xl font-bold text-white">Ask RecallMeet</h1>
        </div>
        <p className="text-gray-400 mt-1">
          Ask anything about your past meetings. Powered by{' '}
          <span className="text-indigo-300 font-medium inline-flex items-center gap-1">
            <Brain className="w-3.5 h-3.5" /> Hindsight
          </span>{' '}
          cross-meeting memory.
        </p>
      </div>
      <AskInterface />
    </div>
  );
}
