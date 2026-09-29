import { NextResponse } from 'next/server';
import { recallMemories, clientToBank } from '@/lib/hindsight';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const clientName = url.searchParams.get('client');
    const query = url.searchParams.get('query') || 'important information decisions requirements commitments';

    if (!clientName) {
      return NextResponse.json({ error: 'client parameter is required' }, { status: 400 });
    }

    const bankId = clientToBank(clientName);
    const memories = await recallMemories(bankId, query);

    return NextResponse.json({ memories, bankId, clientName });
  } catch (error) {
    console.error('[API /memories] Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to retrieve memories';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
