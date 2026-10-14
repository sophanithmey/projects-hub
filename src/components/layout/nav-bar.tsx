import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Compass, Layers, Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/common/theme-toggle';

export const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Featured', path: '/', icon: Terminal },
    { label: 'Directory', path: '/projects', icon: Layers },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-canvas-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3 text-neutral-100 transition-colors focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-glow transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-neutral-100 group-hover:text-amber-300">
              Sophanith's Projects
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main Navigation">
          {navLinks.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive(path)
                  ? 'border border-amber-500/30 bg-amber-500/10 text-amber-300'
                  : 'text-neutral-300 hover:bg-neutral-900 hover:text-neutral-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          ))}
          <a
            href="https://sophanithmey.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-mono font-medium text-amber-300 transition-colors hover:border-amber-400 hover:text-amber-200"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Portfolio</span>
          </a>
          <ThemeToggle className="ml-2" />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-border-subtle bg-canvas-900 px-4 py-3 sm:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(path)
                    ? 'bg-amber-500/10 text-amber-300'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
            <a
              href="https://sophanithmey.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-amber-300 hover:bg-neutral-800"
            >
              <Globe className="h-4 w-4" />
              <span>Personal Portfolio</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
