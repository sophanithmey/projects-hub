import React from 'react';
import { Search, X, Star, Filter, RotateCcw } from 'lucide-react';
import type { ProjectFilterOptions } from '@/types/filter';

interface ProjectFiltersProps {
  filters: ProjectFilterOptions;
  categories: string[];
  technologies: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onTechnologyChange: (tech: string) => void;
  onFeaturedChange: (featured: boolean) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  categories,
  technologies,
  onSearchChange,
  onCategoryChange,
  onTechnologyChange,
  onFeaturedChange,
  onReset,
  hasActiveFilters,
}) => {
  return (
    <div className="space-y-4 rounded-2xl border border-border-subtle bg-canvas-900/60 p-4 backdrop-blur-sm sm:p-5">
      {/* Search and Quick Filters Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by name, keyword, or technology..."
            className="w-full rounded-xl border border-border-subtle bg-canvas-950/80 py-2.5 pl-10 pr-9 text-sm text-neutral-100 placeholder-neutral-500 transition-colors focus:border-amber-500/60 focus:bg-canvas-950 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Featured Only Toggle Button */}
        <button
          type="button"
          onClick={() => onFeaturedChange(!filters.featuredOnly)}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors ${
            filters.featuredOnly
              ? 'border-amber-500/60 bg-amber-500/10 text-amber-300 shadow-glow'
              : 'border-border-subtle bg-canvas-950/80 text-neutral-300 hover:border-neutral-700 hover:text-white'
          }`}
        >
          <Star
            className={`h-4 w-4 ${
              filters.featuredOnly ? 'fill-amber-400 text-amber-400' : 'text-amber-400'
            }`}
          />
          <span>Featured Only</span>
        </button>

        {/* Reset button if active filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border-subtle bg-neutral-900/60 px-3 py-2.5 text-xs font-medium text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Select Dropdowns Row: Category & Technology */}
      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Filter className="h-3.5 w-3.5" />
          <span>Filters:</span>
        </div>

        {/* Category Selector */}
        <select
          value={filters.selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border border-border-subtle bg-canvas-950 px-3 py-1.5 text-xs text-neutral-200 focus:border-amber-500 focus:outline-none"
          aria-label="Filter by category"
        >
          <option value="all">All Categories ({categories.length})</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Technology Selector */}
        <select
          value={filters.selectedTechnology}
          onChange={(e) => onTechnologyChange(e.target.value)}
          className="rounded-lg border border-border-subtle bg-canvas-950 px-3 py-1.5 text-xs text-neutral-200 focus:border-amber-500 focus:outline-none"
          aria-label="Filter by technology"
        >
          <option value="all">All Technologies ({technologies.length})</option>
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
