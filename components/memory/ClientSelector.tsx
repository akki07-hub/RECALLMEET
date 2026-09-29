'use client';

import { useState, useEffect } from 'react';
import { Building2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Client {
  id: string;
  name: string;
  slug: string;
}

interface ClientSelectorProps {
  value: string;
  onChange: (clientName: string) => void;
  placeholder?: string;
  className?: string;
}

export function ClientSelector({ value, onChange, placeholder = 'Select a client', className }: ClientSelectorProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/api/clients')
      .then((r) => r.json())
      .then((data) => setClients(data.clients || []))
      .catch(console.error);
  }, []);

  const selected = clients.find((c) => c.name === value);

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:border-gray-600 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-400" />
          <span className={selected ? 'text-white' : 'text-gray-400'}>
            {selected ? selected.name : placeholder}
          </span>
        </div>
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {clients.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No clients yet</p>
          ) : (
            clients.map((client) => (
              <button
                key={client.id}
                type="button"
                onClick={() => { onChange(client.name); setOpen(false); }}
                className={cn(
                  'w-full text-left px-4 py-2.5 text-sm hover:bg-gray-700 transition-colors',
                  value === client.name ? 'text-indigo-300 bg-indigo-950/40' : 'text-gray-200'
                )}
              >
                {client.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
