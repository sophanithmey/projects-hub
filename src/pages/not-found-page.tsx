import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Layers } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = "404 - Route Not Found | Sophanith's Projects";
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
        <Compass className="h-8 w-8 animate-spin-slow" />
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-amber-400">
        404 // Out of Range
      </p>

      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
        Page Not Located
      </h1>

      <p className="mt-3 max-w-md text-sm text-neutral-400">
        The route you navigated to does not exist in Sophanith's Projects directory. You
        can return home or explore the project directory.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:brightness-110"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-600 hover:text-white"
        >
          <Layers className="h-4 w-4" />
          <span>Browse Projects</span>
        </Link>
      </div>
    </div>
  );
};
