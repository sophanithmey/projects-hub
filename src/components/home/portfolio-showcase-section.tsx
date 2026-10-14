import React from 'react';
import { Laptop, ArrowUpRight, Award, Briefcase, Code2, Globe } from 'lucide-react';
import { ExternalLink } from '@/components/common/external-link';
import { PortfolioInteractiveFrame } from '@/components/home/portfolio-interactive-frame';

export const PortfolioShowcaseSection: React.FC = () => {
  const portfolioUrl = 'https://sophanithmey.vercel.app/';
  const fallbackImage = '/images/sophanithmey-portfolio.svg';

  return (
    <section className="relative py-10 lg:py-14 border-t border-border-subtle bg-canvas-900/40">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-3/4 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono text-amber-300">
              <Laptop className="h-3.5 w-3.5" />
              <span>Flagship Creator Showcase &bull; Live Interactive Hub</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
              Sophanith Mey — Personal Portfolio
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              Test drive the live Next.js portfolio directly within this responsive
              browser simulator. Switch between Desktop, Tablet, and Mobile viewports or
              explore the underlying architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ExternalLink
              url={portfolioUrl}
              label="Launch sophanithmey.vercel.app"
              variant="primary"
            />
          </div>
        </div>

        {/* Highlight Metrics Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          <div className="rounded-xl border border-border-subtle bg-canvas-950 p-4">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
              <Briefcase className="h-4 w-4 text-amber-400" />
              <span>Current Role</span>
            </div>
            <p className="mt-1.5 text-base font-bold text-neutral-100">
              Frontend at Wingmall
            </p>
            <p className="text-xs text-neutral-500">Developer experience platform</p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-canvas-950 p-4">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
              <Code2 className="h-4 w-4 text-amber-400" />
              <span>Experience</span>
            </div>
            <p className="mt-1.5 text-base font-bold text-neutral-100">4+ Years Active</p>
            <p className="text-xs text-neutral-500">20+ productions shipped</p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-canvas-950 p-4">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
              <Award className="h-4 w-4 text-emerald-400" />
              <span>Education</span>
            </div>
            <p className="mt-1.5 text-base font-bold text-neutral-100">
              1st Class Honours
            </p>
            <p className="text-xs text-neutral-500">B.S. in Computer Science</p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-canvas-950 p-4">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
              <Globe className="h-4 w-4 text-cyan-400" />
              <span>Tech Core</span>
            </div>
            <p className="mt-1.5 text-base font-bold text-neutral-100">
              Next.js &amp; Tailwind
            </p>
            <p className="text-xs text-neutral-500">TypeScript · Framer Motion</p>
          </div>
        </div>

        {/* Interactive Browser Chrome Preview */}
        <PortfolioInteractiveFrame
          url={portfolioUrl}
          fallbackImage={fallbackImage}
          title="Sophanith Mey — Personal Portfolio Live Preview"
        />

        {/* Sub-footer Note */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500 pt-2">
          <span>
            &bull; Sandboxed interactive preview connected live to Vercel Global Edge
          </span>
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300"
          >
            <span>Visit full website with resume &amp; awards</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
