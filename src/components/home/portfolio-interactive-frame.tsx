import React, { useState } from 'react';
import { getSafeExternalLinkProps } from '@/utils/url-validator';
import {
  PortfolioFrameHeader,
  type ViewportMode,
} from '@/components/home/portfolio-frame-header';

interface PortfolioInteractiveFrameProps {
  url: string;
  fallbackImage: string;
  title?: string;
}

export const PortfolioInteractiveFrame: React.FC<PortfolioInteractiveFrameProps> = ({
  url,
  fallbackImage,
  title = 'Sophanith Mey — Personal Portfolio Live Preview',
}) => {
  const [viewMode, setViewMode] = useState<'live' | 'artwork'>('live');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const safeLink = getSafeExternalLinkProps(url);

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey((prev) => prev + 1);
  };

  const getViewportWidth = () => {
    if (viewport === 'mobile') return 'max-w-[390px]';
    if (viewport === 'tablet') return 'max-w-[768px]';
    return 'w-full';
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-canvas-950 shadow-2xl transition-all duration-300">
      <PortfolioFrameHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        viewport={viewport}
        setViewport={setViewport}
        onReload={handleReload}
        safeLink={safeLink}
      />

      {/* Frame Screen Area */}
      <div className="relative bg-[#080808] p-2 sm:p-4 overflow-hidden flex items-center justify-center min-h-[500px] lg:min-h-[580px]">
        {viewMode === 'live' ? (
          <div
            className={`relative w-full ${getViewportWidth()} transition-all duration-300 rounded-xl overflow-hidden border border-neutral-800/80 shadow-2xl bg-black`}
          >
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-canvas-950/90 backdrop-blur-sm text-neutral-300 gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                <p className="font-mono text-xs text-amber-300">
                  Connecting to live portfolio preview...
                </p>
              </div>
            )}
            <iframe
              key={reloadKey}
              src={url}
              title={title}
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              loading="lazy"
              className="h-[520px] sm:h-[580px] w-full border-none bg-canvas-950"
            />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center p-2">
            <img
              src={fallbackImage}
              alt="Sophanith Mey Portfolio Artwork"
              className="w-full max-h-[560px] object-contain rounded-xl shadow-2xl border border-neutral-800"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};
