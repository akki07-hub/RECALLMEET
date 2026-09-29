import { NextResponse } from 'next/server';
import { reflectOnMemories, clientToBank } from '@/lib/hindsight';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, clientName, showComparison } = body;

    if (!question || !clientName) {
      return NextResponse.json(
        { error: 'question and clientName are required' },
        { status: 400 }
      );
    }

    const bankId = clientToBank(clientName);

    const withMemoryAnswer = await reflectOnMemories(
      bankId,
      `Context: You are a meeting intelligence assistant for a sales/consulting team.\n\nQuestion about ${clientName}: ${question}\n\nAnswer based on the meeting memories you have for this client.`
    );

    let withoutMemoryAnswer: string | undefined;

    if (showComparison) {
      withoutMemoryAnswer = `I don't have specific information about ${clientName} from previous meetings. Without meeting memory, I can only provide generic guidance. Please refer to your meeting notes manually.`;
    }

    return NextResponse.json({
      question,
      clientName,
      bankId,
      withMemoryAnswer,
      withoutMemoryAnswer,
    });
  } catch (error) {
    console.error('[API /ask] Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to answer question';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
