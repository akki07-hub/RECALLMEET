import { NextResponse } from 'next/server';
import { reflectOnMemories, recallMemories, clientToBank } from '@/lib/hindsight';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName } = body;

    if (!clientName) {
      return NextResponse.json(
        { error: 'clientName is required' },
        { status: 400 }
      );
    }

    const bankId = clientToBank(clientName);

    const rawMemories = await recallMemories(
      bankId,
      'decisions requirements commitments deadlines preferences unresolved issues budget'
    );

    const reflectPrompt = `You are preparing a sales professional for their next meeting with ${clientName}.

Based on all previous meetings with ${clientName}, generate a structured meeting preparation brief in JSON format:

{
  "previousDecisions": ["decision 1", "decision 2"],
  "requirements": ["requirement 1", "requirement 2"],
  "commitments": ["commitment 1", "commitment 2"],
  "outstandingIssues": ["issue 1", "issue 2"],
  "importantContext": ["context 1", "context 2"],
  "suggestedQuestions": ["question 1", "question 2", "question 3"]
}

Be specific, use names and numbers from the actual meetings. Focus on actionable information the sales rep needs before walking into the next meeting.`;

    const rawReflection = await reflectOnMemories(bankId, reflectPrompt);

    let brief = null;
    try {
      const jsonMatch = rawReflection.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        brief = JSON.parse(jsonMatch[0]);
      }
    } catch {
      // If parsing fails, return empty brief
    }

    return NextResponse.json({
      clientName,
      bankId,
      rawMemories,
      rawReflection,
      brief: brief || {
        previousDecisions: [],
        requirements: [],
        commitments: [],
        outstandingIssues: [],
        importantContext: [],
        suggestedQuestions: [],
      },
    });
  } catch (error) {
    console.error('[API /prepare] Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to prepare brief';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
