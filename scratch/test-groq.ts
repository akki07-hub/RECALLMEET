import { analyzeMeeting } from '../lib/analysis';

async function main() {
  console.log('--- Testing Groq API (llama-3.3-70b-versatile) ---');
  const result = await analyzeMeeting(
    'Rahul: We are approving the new website redesign for Acme Fitness. The budget is 1.5 lakhs and deadline is end of November. Priya: I will send the contract by tomorrow.',
    {
      clientName: 'Acme Fitness',
      meetingTitle: 'Test Groq Analysis',
      participants: 'Rahul, Priya',
      date: '2024-10-20',
    }
  );

  console.log('✓ Groq Analysis Success!');
  console.log('Summary:', result.summary);
  console.log('Decisions:', result.decisions);
  console.log('Action Items:', result.actionItems);
}

main().catch(console.error);
