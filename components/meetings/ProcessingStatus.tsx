'use client';

import { CheckCircle, Circle, Loader2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProcessStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  detail?: string;
}

interface ProcessingStatusProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessingStatus({ steps, className }: ProcessingStatusProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">
              {step.status === 'completed' && (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
              {step.status === 'active' && (
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
              )}
              {step.status === 'pending' && (
                <Circle className="w-5 h-5 text-gray-600" />
              )}
              {step.status === 'error' && (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'w-px flex-1 mt-1 min-h-4',
                  step.status === 'completed' ? 'bg-green-400/40' : 'bg-gray-700'
                )}
              />
            )}
          </div>
          <div className="pb-4">
            <p
              className={cn(
                'text-sm font-medium',
                step.status === 'completed' && 'text-green-400',
                step.status === 'active' && 'text-white',
                step.status === 'pending' && 'text-gray-500',
                step.status === 'error' && 'text-red-400'
              )}
            >
              {step.label}
            </p>
            {step.detail && step.status !== 'pending' && (
              <p className="text-xs text-gray-500 mt-0.5">{step.detail}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
