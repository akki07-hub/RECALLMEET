import Link from 'next/link';
import { Calendar, Brain, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  clientName: string;
  date: string;
  status: string;
  memoriesStored: number;
}

interface RecentMeetingsProps {
  meetings: Meeting[];
}

const statusConfig = {
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-green-400' },
  processing: { label: 'Processing', icon: Clock, color: 'text-yellow-400' },
  pending: { label: 'Pending', icon: Clock, color: 'text-gray-400' },
  error: { label: 'Error', icon: AlertCircle, color: 'text-red-400' },
};

export function RecentMeetings({ meetings }: RecentMeetingsProps) {
  if (meetings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
        <p className="text-sm">No meetings yet. Create your first meeting.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {meetings.map((meeting) => {
        const status = statusConfig[meeting.status as keyof typeof statusConfig] || statusConfig.pending;
        const StatusIcon = status.icon;
        return (
          <Link
            key={meeting.id}
            href={`/meetings/${meeting.id}`}
            className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-xl transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="font-medium text-white group-hover:text-indigo-300 transition-colors">
                  {meeting.title}
                </p>
                <p className="text-sm text-gray-400">
                  {meeting.clientName} &middot; {meeting.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {meeting.memoriesStored > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-purple-400">
                  <Brain className="w-3.5 h-3.5" />
                  <span>{meeting.memoriesStored} memories</span>
                </div>
              )}
              <div className={`flex items-center gap-1.5 text-xs ${status.color}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{status.label}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
