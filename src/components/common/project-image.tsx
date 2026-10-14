import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ProjectImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
  aspectRatio?: 'video' | 'wide' | 'square';
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  category = 'Project',
  className = '',
  aspectRatio = 'video',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClass = {
    video: 'aspect-[16/9]',
    wide: 'aspect-[21/9]',
    square: 'aspect-square',
  }[aspectRatio];

  if (!src || hasError) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-border-subtle bg-gradient-to-br from-canvas-900 via-neutral-900 to-canvas-850 p-6 ${aspectClass} ${className}`}
        role="img"
        aria-label={`${alt} preview placeholder`}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.4) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-200">{alt}</p>
            <p className="text-xs uppercase tracking-wider text-amber-400/80">
              {category}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border-subtle bg-canvas-900 ${aspectClass} ${className}`}
    >
      {isLoading && <div className="absolute inset-0 animate-pulse bg-neutral-800/40" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02] ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
