interface StatsCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent?: string;
  description?: string;
}

export function StatsCard({ label, value, icon, accent = 'indigo', description }: StatsCardProps) {
  const accents: Record<string, string> = {
    indigo: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
  };
  const iconAccents: Record<string, string> = {
    indigo: 'bg-indigo-500/20 text-indigo-400',
    purple: 'bg-purple-500/20 text-purple-400',
    green: 'bg-green-500/20 text-green-400',
    orange: 'bg-orange-500/20 text-orange-400',
  };

  return (
    <div
      className={`bg-gradient-to-br ${accents[accent] || accents.indigo} border rounded-xl p-6 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            iconAccents[accent] || iconAccents.indigo
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-300">{label}</div>
      {description && <div className="text-xs text-gray-500 mt-1">{description}</div>}
    </div>
  );
}
