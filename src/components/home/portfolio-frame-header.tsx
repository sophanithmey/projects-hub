import React from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Lock,
  ExternalLink as ExternalIcon,
  Play,
  Eye,
} from 'lucide-react';
import type { SafeLinkAttributes } from '@/utils/url-validator';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface PortfolioFrameHeaderProps {
  viewMode: 'live' | 'artwork';
  setViewMode: (mode: 'live' | 'artwork') => void;
  viewport: ViewportMode;
  setViewport: (v: ViewportMode) => void;
  onReload: () => void;
  safeLink: SafeLinkAttributes;
}

export const PortfolioFrameHeader: React.FC<PortfolioFrameHeaderProps> = ({
  viewMode,
  setViewMode,
  viewport,
  setViewport,
  onReload,
  safeLink,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-900/90 px-4 py-3">
      {/* Traffic Lights & Reload */}
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <button
          type="button"
          onClick={onReload}
          aria-label="Reload preview iframe"
          title="Reload preview"
          className="ml-2 rounded-md p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Browser URL Input */}
      <div className="flex min-w-[200px] flex-1 max-w-sm items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950/90 px-3 py-1.5 text-xs font-mono text-neutral-300">
        <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
        <span className="text-emerald-400/90 font-semibold select-none">https://</span>
        <span className="truncate select-all text-neutral-200">
          sophanithmey.vercel.app
        </span>
      </div>

      {/* Viewport & Mode Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {viewMode === 'live' && (
          <div className="hidden sm:flex items-center rounded-lg border border-neutral-800 bg-neutral-950 p-0.5">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              aria-label="Desktop preview"
              className={`rounded p-1 text-xs transition-colors ${
                viewport === 'desktop'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              aria-label="Tablet preview"
              className={`rounded p-1 text-xs transition-colors ${
                viewport === 'tablet'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              aria-label="Mobile preview"
              className={`rounded p-1 text-xs transition-colors ${
                viewport === 'mobile'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Mode Switcher */}
        <div className="flex items-center rounded-lg border border-neutral-800 bg-neutral-950 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('live')}
            className={`flex items-center gap-1 rounded px-2.5 py-1 font-medium transition-colors ${
              viewMode === 'live'
                ? 'bg-amber-500/20 text-amber-300 shadow-glow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Play className="h-3 w-3" />
            <span>Interactive</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('artwork')}
            className={`flex items-center gap-1 rounded px-2.5 py-1 font-medium transition-colors ${
              viewMode === 'artwork'
                ? 'bg-amber-500/20 text-amber-300'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="h-3 w-3" />
            <span>Artwork</span>
          </button>
        </div>

        {/* Direct Launch Link */}
        <a
          href={safeLink.href}
          target={safeLink.target}
          rel={safeLink.rel}
          aria-label="Open portfolio in new tab"
          title="Open live website in new tab"
          className="flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-neutral-200 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
        >
          <span>Open</span>
          <ExternalIcon className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};
