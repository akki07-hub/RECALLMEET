import { retainMemory, recallMemories, reflectOnMemories } from '../lib/hindsight';

async function main() {
  console.log('--- Testing Hindsight Cloud Real End-to-End ---');
  
  console.log('1. Retaining memory...');
  await retainMemory('acme-fitness', '[Acme Fitness Meeting, 2024-10-15] DECISION: Website redesign approved with 1 lakh budget');
  console.log('✓ Retain completed!');

  console.log('2. Recalling memories...');
  const memories = await recallMemories('acme-fitness', 'budget');
  console.log('✓ Recalled Memories:', memories);

  console.log('3. Reflecting on memories...');
  const reflection = await reflectOnMemories('acme-fitness', 'What is the budget and approval status?');
  console.log('✓ Hindsight Reflection Answer:\n', reflection);
}

main().catch(console.error);
