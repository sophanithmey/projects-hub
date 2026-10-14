import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock, Globe, Star } from 'lucide-react';
import type { Project } from '@/types/project';
import { StatusBadge, TechBadge } from '@/components/common/badge';
import { ProjectImage } from '@/components/common/project-image';
import { ExternalLink } from '@/components/common/external-link';
import { formatDisplayUrl } from '@/utils/url-validator';

interface FeaturedSpotlightProps {
  project: Project;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({ project }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-canvas-900 via-canvas-900 to-canvas-950 p-1 shadow-2xl shadow-amber-500/5">
      {/* Ambient background glow behind spotlight */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 gap-8 rounded-[22px] bg-canvas-900/80 p-6 backdrop-blur-md lg:grid-cols-12 lg:gap-10 lg:p-8">
        {/* Left Information Column */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div className="space-y-4">
            {/* Top Badge Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider text-amber-300">
                <Star className="h-3.5 w-3.5 fill-amber-400/20" />
                <span>Flagship Spotlight</span>
              </span>
              <StatusBadge status={project.status} size="sm" />
            </div>

            {/* Category */}
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              // {project.category}
            </p>

            {/* Title */}
            <h3 className="text-2xl font-extrabold tracking-tight text-neutral-100 sm:text-3xl">
              <Link
                to={`/projects/${project.slug}`}
                className="transition-colors hover:text-amber-200"
              >
                {project.name}
              </Link>
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
              {project.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-6">
            <ExternalLink
              url={project.url}
              label="Launch App"
              variant="primary"
              className="flex-1 sm:flex-none"
            />
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition-colors hover:border-amber-500/40 hover:text-amber-300"
            >
              <span>Explore Details</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right Browser Mockup Column */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-neutral-700/60 bg-canvas-950 shadow-2xl transition-all duration-300 hover:border-amber-500/40">
            {/* Browser Window Chrome Topbar */}
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>

              {/* Mock Address Bar */}
              <div className="flex max-w-[280px] sm:max-w-xs items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950/80 px-3 py-1 text-[11px] font-mono text-neutral-400 truncate">
                <Lock className="h-3 w-3 shrink-0 text-emerald-400" />
                <span className="text-emerald-400/90 font-semibold">https://</span>
                <span className="truncate text-neutral-200">
                  {formatDisplayUrl(project.url).replace(/^https?:\/\//, '')}
                </span>
              </div>

              <div className="flex items-center gap-1 text-neutral-400">
                <Globe className="h-3.5 w-3.5 text-neutral-400" />
              </div>
            </div>

            {/* Large Screenshot Preview */}
            <Link
              to={`/projects/${project.slug}`}
              className="block overflow-hidden focus:outline-none"
              tabIndex={-1}
            >
              <ProjectImage
                src={project.image}
                alt={project.name}
                category={project.category}
                aspectRatio="wide"
                className="transition-transform duration-700 hover:scale-[1.03]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
