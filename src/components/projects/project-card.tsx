import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/project';
import { StatusBadge, TechBadge } from '@/components/common/badge';
import { ProjectImage } from '@/components/common/project-image';
import { ExternalLink } from '@/components/common/external-link';

interface ProjectCardProps {
  project: Project;
  featuredLayout?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  featuredLayout = false,
}) => {
  const visibleTechs = project.technologies.slice(0, 4);
  const remainingTechCount = project.technologies.length - visibleTechs.length;

  return (
    <article
      data-testid={`project-card-${project.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-canvas-900/90 transition-all duration-300 hover:border-amber-500/40 hover:shadow-surface hover:shadow-amber-500/5 ${
        featuredLayout ? 'lg:grid lg:grid-cols-12 lg:gap-8' : ''
      }`}
    >
      {/* Visual Image Section */}
      <div
        className={`relative overflow-hidden p-3 pb-0 ${
          featuredLayout ? 'lg:col-span-7 lg:p-4' : ''
        }`}
      >
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
            aspectRatio={featuredLayout ? 'wide' : 'video'}
          />
        </Link>
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-1 flex-col justify-between p-5 ${
          featuredLayout ? 'lg:col-span-5 lg:p-6 lg:pl-0' : ''
        }`}
      >
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400/90">
              {project.category}
            </span>
            <StatusBadge status={project.status} size="sm" />
          </div>

          {/* Project Title */}
          <h3 className="mt-2.5 text-lg font-bold tracking-tight text-neutral-100 group-hover:text-amber-200">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 focus:outline-none focus:underline"
            >
              <span>{project.name}</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-neutral-400 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {visibleTechs.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {remainingTechCount > 0 && (
              <span className="rounded-md border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-xs text-neutral-400">
                +{remainingTechCount}
              </span>
            )}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="text-xs font-semibold text-neutral-300 transition-colors hover:text-amber-300 focus:outline-none"
          >
            Learn Details &rarr;
          </Link>
          <ExternalLink
            url={project.url}
            label="Open Vercel App"
            variant="secondary"
            className="!py-1.5 !px-3 !text-xs font-semibold"
          />
        </div>
      </div>
    </article>
  );
};
