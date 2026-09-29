import { CheckSquare, Target, Star, AlertTriangle, Lightbulb, HelpCircle, Brain, Calendar } from 'lucide-react';

interface MeetingBriefProps {
  clientName: string;
  lastMeetingDate?: string;
  currentBudget?: string;
  keyRequirements?: string[];
  openItems?: string[];
  importantHistory?: string[];
  questionsToAsk?: string[];
}

export function MeetingBrief({
  clientName = 'Acme Fitness',
  lastMeetingDate = 'September 26, 2026',
  currentBudget = '₹1,25,000',
  keyRequirements = ['WhatsApp integration (Mandatory)', 'Analytics dashboard (Required)'],
  openItems = ['Rahul\'s proposal (Pending since Sep 12)', 'Payment gateway credentials (Required)'],
  importantHistory = [
    'Budget increased from ₹1,00,000 to ₹1,25,000',
    'WhatsApp integration changed from desirable to mandatory',
    'December launch target remains unchanged'
  ],
  questionsToAsk = [
    'When will the proposal be delivered?',
    'Can we get the payment credentials today?',
    'Is the analytics dashboard scope finalized?'
  ]
}: MeetingBriefProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl space-y-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950/80 to-purple-950/60 border-b border-gray-800 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <Brain className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{clientName}</h2>
                <span className="text-xs bg-indigo-900/80 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full font-medium">
                  NEXT MEETING BRIEF
                </span>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Last Meeting: {lastMeetingDate}
              </p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs text-gray-400 block">CURRENT BUDGET</span>
            <span className="text-lg font-bold text-green-400 bg-green-950/60 border border-green-500/30 px-3 py-0.5 rounded-lg inline-block mt-0.5">
              {currentBudget}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 grid gap-6 md:grid-cols-2">
        {/* Key Requirements */}
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
            <Target className="w-4 h-4" />
            <h3>KEY REQUIREMENTS</h3>
          </div>
          <ul className="space-y-2">
            {keyRequirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-200">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Open Items */}
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <h3>OPEN ITEMS</h3>
          </div>
          <ul className="space-y-2">
            {openItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-200">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important History */}
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <Lightbulb className="w-4 h-4" />
            <h3>IMPORTANT HISTORY</h3>
          </div>
          <ul className="space-y-2">
            {importantHistory.map((hist, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-200">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <span>{hist}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions to Ask */}
        <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <h3>QUESTIONS TO ASK</h3>
          </div>
          <ol className="space-y-2.5">
            {questionsToAsk.map((q, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-200">
                <span className="w-5 h-5 rounded-full bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
