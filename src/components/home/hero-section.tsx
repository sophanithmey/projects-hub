import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, ArrowRight, Layers, Cpu, Globe } from 'lucide-react';
import creatorData from '@/data/social-links.json';

interface HeroSectionProps {
  totalProjects: number;
  totalCategories: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalProjects,
  totalCategories,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-8 lg:pt-14 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:max-w-3xl">
          {/* Status Capsule */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Deployed Live on Vercel &bull; 2026 Collection</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-neutral-100">
              Creative apps, tools, and visual experiments{' '}
              <span className="text-gradient-amber">crafted for the modern web.</span>
            </h1>
            <p className="text-lg leading-relaxed text-neutral-400 sm:text-xl">
              A curated registry of interactive applications, Web Audio synthesizers, and
              design engineering playgrounds built by{' '}
              <span className="text-neutral-200 font-semibold">{creatorData.name}</span>.
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-ink shadow-glow transition-all hover:brightness-110 hover:shadow-glow-lg active:scale-98"
            >
              <span>Explore Projects Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/60 px-5 py-3.5 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-600 hover:text-white"
            >
              <Cpu className="h-4 w-4 text-amber-400" />
              <span>Architecture &amp; Stack</span>
            </a>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-6 border-t border-border-subtle pt-6 text-left w-full max-w-lg">
            <div>
              <p className="text-2xl font-extrabold text-neutral-100 font-mono">
                {totalProjects}
              </p>
              <p className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                <Layers className="h-3 w-3 text-amber-400" />
                <span>Vercel Apps</span>
              </p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-neutral-100 font-mono">
                {totalCategories}
              </p>
              <p className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                <LayoutGrid className="h-3 w-3 text-amber-400" />
                <span>Categories</span>
              </p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono">100%</p>
              <p className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                <Globe className="h-3 w-3 text-emerald-400" />
                <span>Serverless Edge</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
