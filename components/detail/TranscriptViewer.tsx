interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

interface TranscriptViewerProps {
  text: string;
  segments?: TranscriptSegment[];
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function TranscriptViewer({ text, segments }: TranscriptViewerProps) {
  if (segments && segments.length > 0) {
    return (
      <div className="space-y-4">
        {segments.map((seg, i) => (
          <div key={i} className="flex gap-4 group">
            <span className="text-xs text-indigo-400 font-mono mt-0.5 flex-shrink-0 w-12">
              {formatTime(seg.start)}
            </span>
            <p className="text-gray-300 text-sm leading-relaxed">{seg.text}</p>
          </div>
        ))}
      </div>
    );
  }

  const paragraphs = text
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div className="space-y-3">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-gray-300 text-sm leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
}
