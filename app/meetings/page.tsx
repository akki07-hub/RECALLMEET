'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Loader2, Calendar } from 'lucide-react';
import { MeetingCard } from '@/components/meetings/MeetingCard';

interface Meeting {
  id: string;
  title: string;
  client_name: string;
  participants: string;
  date: string;
  status: string;
  memories_stored: number;
  is_demo_mode: number;
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/meetings')
      .then((r) => r.json())
      .then((data) => setMeetings(data.meetings || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (deletedId: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== deletedId));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Meetings</h1>
          <p className="text-gray-400 mt-1">{meetings.length} total meetings</p>
        </div>
        <Link
          href="/meetings/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          New Meeting
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        </div>
      ) : meetings.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No meetings yet</p>
          <Link href="/meetings/new" className="text-indigo-400 hover:text-indigo-300 text-sm">
            Create your first meeting →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {meetings.map((m) => (
            <MeetingCard
              key={m.id}
              id={m.id}
              title={m.title}
              clientName={m.client_name}
              participants={m.participants}
              date={m.date}
              status={m.status}
              memoriesStored={m.memories_stored}
              isDemoMode={m.is_demo_mode === 1}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
