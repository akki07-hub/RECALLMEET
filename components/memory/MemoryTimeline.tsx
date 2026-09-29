interface MemoryTimelineProps {
  memories: string[];
}

export function MemoryTimeline({ memories }: MemoryTimelineProps) {
  if (memories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No memories found. Process a meeting to start building memory.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {memories.map((memory, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
            {i < memories.length - 1 && (
              <div className="w-px flex-1 bg-gray-700 mt-1" />
            )}
          </div>
          <div className="pb-4 flex-1">
            <p className="text-sm text-gray-300 leading-relaxed">
              {memory.replace(/^\[.*?\]\s*/, '')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
