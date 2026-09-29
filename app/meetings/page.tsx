'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Calendar } from 'lucide-react';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { DEMO_TRANSCRIPTS } from '@/lib/demo-transcripts';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState(
    DEMO_TRANSCRIPTS.map((d) => ({
      id: d.id,
      title: d.title,
      client_name: d.clientName,
      participants: d.participants,
      date: d.date,
      status: 'completed',
      memories_stored: 7,
      is_demo_mode: 1,
    }))
  );

  const handleDelete = (deletedId: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== deletedId));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Meeting History</h1>
          <p className="text-gray-400 mt-1">
            Acme Fitness Timeline · {meetings.length} meetings connected in Hindsight
          </p>
        </div>
        <Link
          href="/meetings/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          New Meeting
        </Link>
      </div>

      {meetings.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No meetings found</p>
          <Link href="/meetings/new" className="text-indigo-400 hover:text-indigo-300 text-sm">
            Process a meeting →
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
