import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/project';
import { StatusBadge, TechBadge } from '@/components/common/badge';
import { ProjectImage } from '@/components/common/project-image';
import { ExternalLink } from '@/components/common/external-link';

interface FeaturedBentoCardProps {
  project: Project;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const FeaturedBentoCard: React.FC<FeaturedBentoCardProps> = ({
  project,
  isSelected = false,
  onSelect,
}) => {
  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 ${
        isSelected
          ? 'border-amber-500 bg-canvas-900/90 shadow-glow'
          : 'border-border-subtle bg-canvas-900/60 hover:border-amber-500/40 hover:bg-canvas-900/90 hover:shadow-surface'
      }`}
    >
      {/* Top Preview Image */}
      <div className="relative overflow-hidden p-3 pb-0">
        <Link
          to={`/projects/${project.slug}`}
          className="block overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          tabIndex={-1}
          aria-hidden="true"
        >
          <ProjectImage
            src={project.image}
            alt={project.name}
            category={project.category}
            aspectRatio="video"
          />
        </Link>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              {project.category}
            </span>
            <StatusBadge status={project.status} size="sm" />
          </div>

          {/* Title */}
          <h4 className="mt-2.5 text-lg font-bold tracking-tight text-neutral-100 group-hover:text-amber-200">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 focus:outline-none"
            >
              <span>{project.name}</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </h4>

          {/* Description */}
          <p className="mt-2 text-xs leading-relaxed text-neutral-400 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {project.technologies.length > 3 && (
              <span className="rounded-md border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-xs text-neutral-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-3">
          {onSelect ? (
            <button
              type="button"
              onClick={onSelect}
              className={`text-xs font-semibold transition-colors ${
                isSelected ? 'text-amber-300' : 'text-neutral-400 hover:text-amber-300'
              }`}
            >
              {isSelected ? '● Spotlight Active' : 'Set as Spotlight'}
            </button>
          ) : (
            <Link
              to={`/projects/${project.slug}`}
              className="text-xs font-semibold text-neutral-400 hover:text-amber-300"
            >
              Details &rarr;
            </Link>
          )}

          <ExternalLink
            url={project.url}
            label="Open App"
            variant="secondary"
            className="!py-1 !px-2.5 !text-xs font-medium"
          />
        </div>
      </div>
    </article>
  );
};
