import { NextResponse } from 'next/server';
import {
  getAllMeetings,
  createMeeting,
  getOrCreateClient,
  generateId,
} from '@/lib/db';
import { clientToBank } from '@/lib/hindsight';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const meetings = getAllMeetings();
    return NextResponse.json({ meetings });
  } catch (error) {
    console.error('[API /meetings GET] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, clientName, participants, date, description } = body;

    if (!title || !clientName || !date) {
      return NextResponse.json(
        { error: 'title, clientName, and date are required' },
        { status: 400 }
      );
    }

    const slug = clientToBank(clientName);
    const client = getOrCreateClient(clientName, slug);
    const meetingId = generateId();

    const meeting = createMeeting({
      id: meetingId,
      clientId: client.id,
      clientName,
      title,
      participants: participants || '',
      date,
      description,
    });

    return NextResponse.json({ meeting });
  } catch (error) {
    console.error('[API /meetings POST] Error:', error);
    return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
  }
}
