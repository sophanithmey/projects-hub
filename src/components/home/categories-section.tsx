import React from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, ArrowRight } from 'lucide-react';
import type { Project } from '@/types/project';
import { getCategoryCounts } from '@/utils/project-helpers';

interface CategoriesSectionProps {
  projects: Project[];
  categories: string[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  projects,
  categories,
}) => {
  const counts = getCategoryCounts(projects);

  if (categories.length === 0) return null;

  return (
    <section className="py-12 border-t border-border-subtle bg-canvas-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
            <FolderGit2 className="h-4 w-4" />
            <span>Architecture &amp; Taxonomy</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-100 sm:text-3xl">
            Project Categories
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Explore focused domains ranging from Web Audio to data visualization tools.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const count = counts[category] || 0;
            return (
              <Link
                key={category}
                to={`/projects?category=${encodeURIComponent(category)}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-canvas-950 p-5 transition-all hover:border-amber-500/40 hover:bg-neutral-900/80 hover:shadow-surface"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-neutral-500 group-hover:text-amber-400">
                      // 0{categories.indexOf(category) + 1}
                    </span>
                    <span className="rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-0.5 text-xs font-mono text-neutral-400">
                      {count} {count === 1 ? 'app' : 'apps'}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-100 group-hover:text-amber-300">
                    {category}
                  </h3>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs font-medium text-neutral-400 group-hover:text-neutral-200">
                  <span>Browse domain</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-amber-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
