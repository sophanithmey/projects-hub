import React from 'react';
import type { Project } from '@/types/project';
import { ProjectCard } from '@/components/projects/project-card';
import { EmptyState } from '@/components/common/empty-state';

interface ProjectGridProps {
  projects: Project[];
  onResetFilters?: () => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onResetFilters }) => {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No matching applications found"
        description="Try clearing your search terms or picking another category."
        actionLabel="Clear all filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
