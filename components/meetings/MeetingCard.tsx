'use client';

import Link from 'next/link';
import { Calendar, Users, Brain, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface MeetingCardProps {
  id: string;
  title: string;
  clientName: string;
  participants: string;
  date: string;
  status: string;
  memoriesStored: number;
  isDemoMode?: boolean;
  onDelete?: (id: string) => void;
}

const statusConfig = {
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
  processing: { label: 'Processing', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  pending: { label: 'Pending', icon: Clock, color: 'text-gray-400', bg: 'bg-gray-400/10' },
  error: { label: 'Error', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
};

export function MeetingCard({
  id, title, clientName, participants, date, status, memoriesStored, isDemoMode, onDelete
}: MeetingCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const cfg = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const StatusIcon = cfg.icon;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/meetings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      if (onDelete) onDelete(id);
    } catch (err) {
      alert('Failed to delete meeting');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative group/card">
      <Link
        href={`/meetings/${id}`}
        className="block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 hover:bg-gray-800/80 transition-all group"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                {title}
              </h3>
              {isDemoMode && (
                <span className="flex-shrink-0 text-xs bg-purple-900/50 text-purple-400 border border-purple-700/50 px-1.5 py-0.5 rounded">
                  Demo
                </span>
              )}
            </div>
            <p className="text-indigo-400 text-sm font-medium">{clientName}</p>
          </div>
          <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${cfg.color} ${cfg.bg} flex-shrink-0 ml-2`}>
            <StatusIcon className="w-3 h-3" />
            {cfg.label}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </div>
          {participants && (
            <div className="flex items-center gap-1.5 truncate">
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{participants}</span>
            </div>
          )}
        </div>

        {memoriesStored > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-purple-400">
            <Brain className="w-3.5 h-3.5" />
            <span>{memoriesStored} memories stored in Hindsight</span>
          </div>
        )}
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete meeting"
        className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors opacity-0 group-hover/card:opacity-100 disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
