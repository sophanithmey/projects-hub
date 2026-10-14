import React from 'react';
import { Link } from 'react-router-dom';
import { Folder } from 'lucide-react';
import type { Project } from '@/types/project';

interface ProjectRelatedProps {
  currentProject: Project;
  publicProjects: Project[];
}

export const ProjectRelated: React.FC<ProjectRelatedProps> = ({
  currentProject,
  publicProjects,
}) => {
  const related = publicProjects
    .filter((p) => p.category === currentProject.category && p.id !== currentProject.id)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-border-subtle pt-10">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
        <Folder className="h-4 w-4" />
        <span>More in {currentProject.category}</span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {related.map((item) => (
          <Link
            key={item.id}
            to={`/projects/${item.slug}`}
            className="rounded-xl border border-border-subtle bg-canvas-900/40 p-4 transition-colors hover:border-amber-500/40 hover:bg-neutral-900"
          >
            <h4 className="font-bold text-neutral-200">{item.name}</h4>
            <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
