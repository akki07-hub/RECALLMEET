'use client';

import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle, AlertTriangle, Calendar, Brain } from 'lucide-react';

interface WhatChangedCardProps {
  clientName?: string;
  showDetails?: boolean;
}

export function WhatChangedCard({ clientName = 'Acme Fitness', showDetails = true }: WhatChangedCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border-b border-gray-800 p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">What Changed?</h2>
            <span className="text-xs bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 px-2.5 py-0.5 rounded-full font-medium ml-2">
              Hindsight Memory Sync
            </span>
          </div>
          <p className="text-gray-400 text-sm">See how the conversation evolved over time for {clientName}.</p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs text-purple-400 bg-purple-950/50 border border-purple-800/50 px-3 py-1 rounded-lg inline-flex items-center gap-1.5 font-medium">
            <Brain className="w-3.5 h-3.5" /> 3 Meetings Compared
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Timeline Evolution Comparison Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* First Meeting */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700/50">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">FIRST MEETING</span>
                <span className="text-sm font-medium text-white flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" /> September 12, 2026
                </span>
              </div>
              <Link href="/meetings/acme-meeting-1" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                View Meeting 1 &rarr;
              </Link>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Budget</span>
                <span className="font-semibold text-white bg-gray-900 px-2.5 py-0.5 rounded border border-gray-700">
                  ₹1,00,000
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-800">
                <span className="text-gray-400">WhatsApp Integration</span>
                <span className="font-medium text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                  Desirable
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Launch Target</span>
                <span className="font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                  December 2026
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-400">Analytics Dashboard</span>
                <span className="text-xs text-gray-500 italic">Not discussed</span>
              </div>
            </div>
          </div>

          {/* Latest Meeting */}
          <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-5 relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-500/30">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 block">LATEST MEETING</span>
                <span className="text-sm font-medium text-white flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" /> September 26, 2026
                </span>
              </div>
              <Link href="/meetings/acme-meeting-3" className="text-xs text-indigo-300 hover:text-white font-medium">
                View Meeting 3 &rarr;
              </Link>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-indigo-900/40">
                <span className="text-gray-300">Budget</span>
                <span className="font-semibold text-green-400 bg-green-950/60 border border-green-500/30 px-2.5 py-0.5 rounded">
                  ₹1,25,000 <span className="text-xs text-green-300 font-normal">(+₹25k)</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-indigo-900/40">
                <span className="text-gray-300">WhatsApp Integration</span>
                <span className="font-semibold text-indigo-300 bg-indigo-900/60 border border-indigo-500/30 px-2 py-0.5 rounded">
                  Mandatory
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-indigo-900/40">
                <span className="text-gray-300">Launch Target</span>
                <span className="font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                  December 2026 (Unchanged)
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-300">Analytics Dashboard</span>
                <span className="font-semibold text-blue-400 bg-blue-900/60 border border-blue-500/30 px-2 py-0.5 rounded">
                  Required
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Changes Breakdown */}
        {showDetails && (
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Key Changes Summary
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Budget Evolution</p>
                <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <span className="text-gray-400 font-normal">₹1L</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-green-400">₹1.25L</span>
                </div>
              </div>

              <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">WhatsApp Integration</p>
                <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <span className="text-yellow-400 font-normal">Desirable</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-indigo-300">Mandatory</span>
                </div>
              </div>

              <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">New Requirement</p>
                <p className="font-semibold text-sm text-blue-400">
                  Analytics Dashboard
                </p>
              </div>

              <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Still Unresolved</p>
                <p className="font-semibold text-sm text-orange-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Proposal & Credentials
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
