'use client';

import Link from 'next/link';
import {
  Calendar,
  Brain,
  Sparkles,
  Zap,
  TrendingUp,
  MessageSquare,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { WhatChangedCard } from '@/components/dashboard/WhatChangedCard';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">RecallMeet</h1>
            <p className="text-indigo-400 text-sm font-medium">Meetings that remember.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/ask"
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
          >
            <MessageSquare className="w-4 h-4" /> Ask RecallMeet
          </Link>
          <Link
            href="/prepare"
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
          >
            <Sparkles className="w-4 h-4" /> Prepare Me
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Client Meetings"
          value={3}
          icon={<Calendar className="w-5 h-5" />}
          accent="indigo"
          description="Acme Fitness Timeline"
        />
        <StatsCard
          label="Hindsight Memories"
          value={23}
          icon={<Brain className="w-5 h-5" />}
          accent="purple"
          description="Retained & Connected"
        />
        <StatsCard
          label="Key Decisions"
          value={5}
          icon={<Sparkles className="w-5 h-5" />}
          accent="green"
          description="Confirmed across meetings"
        />
        <StatsCard
          label="Open Issues"
          value={2}
          icon={<TrendingUp className="w-5 h-5" />}
          accent="orange"
          description="Proposal & Credentials"
        />
      </div>

      {/* Active Client Spotlight Banner */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Acme Fitness</h2>
              <p className="text-xs text-gray-400">Customer Engagement Platform Project</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/what-changed"
              className="text-xs px-3 py-2 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 font-semibold rounded-lg transition-all flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" /> What Changed?
            </Link>
            <Link
              href="/memory"
              className="text-xs px-3 py-2 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 font-semibold rounded-lg transition-all flex items-center gap-1.5"
            >
              <Brain className="w-3.5 h-3.5" /> View Memory (23)
            </Link>
          </div>
        </div>

        {/* Meeting Timeline Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Meeting 1 */}
          <Link
            href="/meetings/acme-meeting-1"
            className="p-4 bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 rounded-xl transition-all group block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400">September 12, 2026</span>
              <span className="text-xs text-gray-500 group-hover:text-white transition-colors flex items-center gap-1">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <p className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              Meeting 1 — Initial Discussion
            </p>
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
              Initial budget ₹1,00,000, December launch target, WhatsApp integration desirable.
            </p>
          </Link>

          {/* Meeting 2 */}
          <Link
            href="/meetings/acme-meeting-2"
            className="p-4 bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 rounded-xl transition-all group block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400">September 19, 2026</span>
              <span className="text-xs text-gray-500 group-hover:text-white transition-colors flex items-center gap-1">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <p className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              Meeting 2 — Requirements Update
            </p>
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
              Budget increased to ₹1,25,000, WhatsApp becomes mandatory, Analytics added.
            </p>
          </Link>

          {/* Meeting 3 */}
          <Link
            href="/meetings/acme-meeting-3"
            className="p-4 bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 rounded-xl transition-all group block border-indigo-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400">September 26, 2026</span>
              <span className="text-xs text-indigo-300 bg-indigo-900/60 px-2 py-0.5 rounded font-medium">
                Latest
              </span>
            </div>
            <p className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              Meeting 3 — Latest Discussion
            </p>
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
              Confirmed ₹1.25L budget. Proposal and payment credentials remain unresolved.
            </p>
          </Link>
        </div>
      </div>

      {/* What Changed Highlight Card */}
      <WhatChangedCard clientName="Acme Fitness" showDetails={true} />
    </div>
  );
}
