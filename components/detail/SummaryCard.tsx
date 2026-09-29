interface SummaryCardProps {
  summary: string;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-3">
        Meeting Summary
      </h3>
      <p className="text-gray-200 leading-relaxed">{summary}</p>
    </div>
  );
}
