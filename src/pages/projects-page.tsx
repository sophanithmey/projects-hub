import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { useProjectFilters } from '@/hooks/use-project-filters';
import { ProjectFilters } from '@/components/projects/project-filters';
import { ProjectSort } from '@/components/projects/project-sort';
import { ProjectGrid } from '@/components/projects/project-grid';

export const ProjectsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { publicProjects, categories, technologies } = useProjects();

  const {
    filters,
    filteredProjects,
    hasActiveFilters,
    setSearchQuery,
    setSelectedCategory,
    setSelectedTechnology,
    setFeaturedOnly,
    setSortBy,
    resetFilters,
  } = useProjectFilters(publicProjects);

  // Sync category or tech query param from URL on initial navigation
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const techParam = searchParams.get('tech');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (techParam) {
      setSelectedTechnology(techParam);
    }
  }, [searchParams, setSelectedCategory, setSelectedTechnology]);

  useEffect(() => {
    document.title = 'All Projects | Vercel Project Directory';
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
          <Layers className="h-4 w-4" />
          <span>Vercel Directory</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
          Application Directory
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Browse, search, and filter all deployed web applications, interactive audio
          toys, and production systems.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="space-y-6">
        <ProjectFilters
          filters={filters}
          categories={categories}
          technologies={technologies}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onTechnologyChange={setSelectedTechnology}
          onFeaturedChange={setFeaturedOnly}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Sort and Count Bar */}
        <ProjectSort
          currentSort={filters.sortBy}
          onSortChange={setSortBy}
          resultCount={filteredProjects.length}
        />

        {/* Grid or Empty Results */}
        <ProjectGrid projects={filteredProjects} onResetFilters={resetFilters} />
      </div>
    </div>
  );
};
