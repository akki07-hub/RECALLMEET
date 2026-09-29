import { NextResponse } from 'next/server';
import { getStats, getAllMeetings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = getStats();
    const meetings = getAllMeetings();

    const totalMemories = meetings.reduce(
      (sum, m) => sum + (m.memories_stored || 0),
      0
    );

    const recentMeetings = meetings.slice(0, 5).map((m) => ({
      id: m.id,
      title: m.title,
      clientName: m.client_name,
      date: m.date,
      status: m.status,
      memoriesStored: m.memories_stored,
    }));

    return NextResponse.json({
      totalMeetings: stats.totalMeetings,
      totalClients: stats.totalClients,
      totalMemories,
      openActionItems: 5,
      recentMeetings,
    });
  } catch (error) {
    console.error('[API /stats] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
