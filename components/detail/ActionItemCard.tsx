import { CheckSquare, User, Clock } from 'lucide-react';

interface ActionItem {
  task: string;
  assignee?: string;
  deadline?: string;
  status: string;
}

interface ActionItemCardProps {
  items: ActionItem[];
}

export function ActionItemCard({ items }: ActionItemCardProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
        <CheckSquare className="w-4 h-4 text-indigo-400" />
        Action Items
        <span className="text-xs text-gray-500 bg-gray-800 px-1.5 rounded">{items.length}</span>
      </h4>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <div className="w-5 h-5 rounded border-2 border-gray-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200">{item.task}</p>
              <div className="flex items-center gap-3 mt-1">
                {item.assignee && (
                  <span className="flex items-center gap-1 text-xs text-indigo-400">
                    <User className="w-3 h-3" />{item.assignee}
                  </span>
                )}
                {item.deadline && (
                  <span className="flex items-center gap-1 text-xs text-orange-400">
                    <Clock className="w-3 h-3" />{item.deadline}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
