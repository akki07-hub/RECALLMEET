import { getMemoryTypeColor, getMemoryTypeLabel, formatMemoryForDisplay } from '@/lib/memory-extractor';
import { MemoryType } from '@/lib/types';

interface MemoryCardProps {
  content: string;
  type?: MemoryType;
  meetingTitle?: string;
  date?: string;
  className?: string;
}

export function MemoryCard({ content, type = 'context', meetingTitle, date, className }: MemoryCardProps) {
  const displayContent = formatMemoryForDisplay(content);
  const colorClass = getMemoryTypeColor(type);
  const typeLabel = getMemoryTypeLabel(type);

  return (
    <div className={`p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-all ${className || ''}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
          {typeLabel}
        </span>
        {(meetingTitle || date) && (
          <span className="text-xs text-gray-600 text-right flex-shrink-0">
            {meetingTitle && <span>{meetingTitle}</span>}
            {date && <span className="block">{date}</span>}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-200 leading-relaxed">{displayContent}</p>
    </div>
  );
}
