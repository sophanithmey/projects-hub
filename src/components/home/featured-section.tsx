import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, Layers } from 'lucide-react';
import type { Project } from '@/types/project';
import { FeaturedSpotlight } from '@/components/home/featured-spotlight';
import { FeaturedBentoCard } from '@/components/home/featured-bento-card';
import { EmptyState } from '@/components/common/empty-state';

interface FeaturedSectionProps {
  featuredProjects: Project[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ featuredProjects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSpotlightSlug, setActiveSpotlightSlug] = useState<string>('');

  // Extract unique categories present in featured projects
  const featuredCategories = useMemo(() => {
    const cats = new Set<string>();
    featuredProjects.forEach((p) => cats.add(p.category));
    return Array.from(cats);
  }, [featuredProjects]);

  // Filter projects by active category tab
  const displayedProjects = useMemo(() => {
    if (selectedCategory === 'all') return featuredProjects;
    return featuredProjects.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [featuredProjects, selectedCategory]);

  // Determine active spotlight project
  const spotlightProject = useMemo(() => {
    if (activeSpotlightSlug) {
      const found = displayedProjects.find((p) => p.slug === activeSpotlightSlug);
      if (found) return found;
    }
    return displayedProjects[0] || featuredProjects[0];
  }, [displayedProjects, featuredProjects, activeSpotlightSlug]);

  // The rest of the projects in the bento grid
  const bentoProjects = useMemo(() => {
    if (!spotlightProject) return [];
    return displayedProjects.filter((p) => p.id !== spotlightProject.id);
  }, [displayedProjects, spotlightProject]);

  return (
    <section className="relative pt-2 pb-12 lg:pt-4 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
              <Rocket className="h-4 w-4" />
              <span>Flagship Releases</span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
              Featured Vercel Deployments
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-400">
              Curated productions showcasing responsive full-stack architectures, cultural
              heritage digital tools, and financial utilities on Vercel Edge.
            </p>
          </div>

          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            <span>Explore full directory ({featuredProjects.length}+ apps)</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Quick Category Filter Pills */}
        {featuredCategories.length > 1 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'border border-amber-500/60 bg-amber-500/15 text-amber-300 shadow-glow'
                  : 'border border-border-subtle bg-canvas-900/60 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All Featured ({featuredProjects.length})
            </button>
            {featuredCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'border border-amber-500/60 bg-amber-500/15 text-amber-300 shadow-glow'
                    : 'border border-border-subtle bg-canvas-900/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Empty state check */}
        {displayedProjects.length === 0 ? (
          <EmptyState
            title="No featured projects in this category"
            description="Select another category tab or check back soon."
            actionLabel="View all featured projects"
            onAction={() => setSelectedCategory('all')}
          />
        ) : (
          <div className="space-y-10">
            {/* 1. Large Flagship Spotlight Card */}
            {spotlightProject && <FeaturedSpotlight project={spotlightProject} />}

            {/* 2. Asymmetric Bento Grid for Additional Featured Releases */}
            {bentoProjects.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                    <Layers className="h-4 w-4 text-amber-400" />
                    <span>More In Spotlight</span>
                  </h3>
                  <span className="text-xs text-neutral-500">
                    Click any card to preview in spotlight
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {bentoProjects.map((project) => (
                    <FeaturedBentoCard
                      key={project.id}
                      project={project}
                      isSelected={project.id === spotlightProject?.id}
                      onSelect={() => setActiveSpotlightSlug(project.slug)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
