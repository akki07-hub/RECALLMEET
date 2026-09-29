'use client';

import { useState } from 'react';
import { ClientSelector } from '@/components/memory/ClientSelector';
import { WhatChangedCard } from '@/components/dashboard/WhatChangedCard';

export default function WhatChangedPage() {
  const [clientName, setClientName] = useState('Acme Fitness');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">What Changed?</h1>
        <p className="text-gray-400 mt-1">
          See how the conversation, budget, and requirements evolved over time across meetings.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <ClientSelector
          value={clientName}
          onChange={setClientName}
          placeholder="Select client..."
        />
      </div>

      <WhatChangedCard clientName={clientName} showDetails={true} />
    </div>
  );
}
