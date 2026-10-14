import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import type { ProjectSortOption } from '@/types/filter';

interface ProjectSortProps {
  currentSort: ProjectSortOption;
  onSortChange: (sort: ProjectSortOption) => void;
  resultCount: number;
}

export const ProjectSort: React.FC<ProjectSortProps> = ({
  currentSort,
  onSortChange,
  resultCount,
}) => {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <p className="text-xs font-mono text-neutral-400">
        Showing <span className="text-amber-400 font-semibold">{resultCount}</span>{' '}
        {resultCount === 1 ? 'project' : 'projects'}
      </p>

      <div className="flex items-center gap-2">
        <ArrowDownUp className="h-3.5 w-3.5 text-neutral-400" />
        <label htmlFor="sort-select" className="text-xs text-neutral-400">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as ProjectSortOption)}
          className="rounded-lg border border-border-subtle bg-canvas-950 px-2.5 py-1 text-xs text-neutral-200 focus:border-amber-500 focus:outline-none"
        >
          <option value="default">Registry Order</option>
          <option value="featured-first">Featured First</option>
          <option value="name-asc">Name (A &rarr; Z)</option>
          <option value="name-desc">Name (Z &rarr; A)</option>
        </select>
      </div>
    </div>
  );
};
