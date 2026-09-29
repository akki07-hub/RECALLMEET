import { NextResponse } from 'next/server';
import { getAllClients, getOrCreateClient } from '@/lib/db';
import { clientToBank } from '@/lib/hindsight';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const clients = getAllClients();
    return NextResponse.json({ clients });
  } catch (error) {
    console.error('[API /clients] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 });
    }
    const slug = clientToBank(name.trim());
    const client = getOrCreateClient(name.trim(), slug);
    return NextResponse.json({ client });
  } catch (error) {
    console.error('[API /clients POST] Error:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
