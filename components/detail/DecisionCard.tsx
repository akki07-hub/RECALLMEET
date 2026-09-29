import { CheckSquare, Target, Star, AlertTriangle, Lightbulb, Clock, Check, ArrowRight, AlertCircle } from 'lucide-react';

interface DecisionCardProps {
  decisions?: string[];
  requirements?: string[];
  deadlines?: string[];
  commitments?: string[];
  unresolvedIssues?: string[];
  preferences?: string[];
}

export function DecisionCard({
  decisions = ['Budget: ₹1,25,000', 'Launch target: December 2026'],
  requirements = ['WhatsApp integration (Mandatory)', 'Analytics dashboard (Required)'],
  commitments = ['Rahul Sharma: Proposal delivery'],
  unresolvedIssues = ['Payment gateway credentials', 'Proposal delivery from Rahul'],
}: DecisionCardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* DECISIONS */}
      <div className="bg-green-950/20 border border-green-500/20 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
          <CheckSquare className="w-4 h-4" />
          <span>DECISIONS</span>
          <span className="text-xs bg-green-900/50 text-green-300 px-2 py-0.5 rounded-full ml-auto">
            {decisions.length}
          </span>
        </div>
        <ul className="space-y-2">
          {decisions.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
              <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* COMMITMENTS */}
      <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <Star className="w-4 h-4" />
          <span>COMMITMENTS</span>
          <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full ml-auto">
            {commitments.length}
          </span>
        </div>
        <ul className="space-y-2">
          {commitments.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
              <ArrowRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* REQUIREMENTS */}
      <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <Target className="w-4 h-4" />
          <span>REQUIREMENTS</span>
          <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full ml-auto">
            {requirements.length}
          </span>
        </div>
        <ul className="space-y-2">
          {requirements.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
              <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* OPEN ITEMS */}
      <div className="bg-orange-950/20 border border-orange-500/20 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>OPEN ITEMS</span>
          <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-0.5 rounded-full ml-auto">
            {unresolvedIssues.length}
          </span>
        </div>
        <ul className="space-y-2">
          {unresolvedIssues.map((u, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
              <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
