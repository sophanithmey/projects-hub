import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowUpRight } from 'lucide-react';

interface TechStackSectionProps {
  technologies: string[];
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ technologies }) => {
  if (technologies.length === 0) return null;

  return (
    <section className="py-12 border-t border-border-subtle bg-canvas-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
              <Code2 className="h-4 w-4" />
              <span>Ecosystem</span>
            </div>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-100 sm:text-2xl">
              Technologies &amp; Libraries
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-xs font-medium text-neutral-400 hover:text-amber-300"
          >
            Filter by stack &rarr;
          </Link>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {technologies.map((tech) => (
            <Link
              key={tech}
              to={`/projects?tech=${encodeURIComponent(tech)}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/70 px-3.5 py-2 text-xs font-medium text-neutral-300 transition-all hover:border-amber-500/40 hover:bg-neutral-850 hover:text-amber-200 hover:shadow-glow focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <span>{tech}</span>
              <ArrowUpRight className="h-3 w-3 opacity-40" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
