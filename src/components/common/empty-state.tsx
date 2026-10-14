import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No projects found',
  description = 'Try adjusting your search query, clearing filters, or exploring other categories.',
  actionLabel = 'Reset all filters',
  onAction,
}) => {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-canvas-900/50 p-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-400">
        <SearchX className="h-7 w-7 text-amber-400/80" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-neutral-400">{description}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:border-amber-500/40 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
