import React from 'react';
import { ExternalLink as ExternalLinkIcon, AlertTriangle } from 'lucide-react';
import { getSafeExternalLinkProps } from '@/utils/url-validator';

interface ExternalLinkProps {
  url: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'subtle';
  className?: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  url,
  label = 'Open Project',
  variant = 'primary',
  className = '',
}) => {
  const { href, target, rel, isSafe } = getSafeExternalLinkProps(url);

  if (!isSafe) {
    return (
      <span
        title="Invalid or unsafe destination link"
        className={`inline-flex items-center gap-2 rounded-lg border border-red-900/40 bg-red-950/20 px-3 py-2 text-xs font-medium text-red-400 cursor-not-allowed ${className}`}
      >
        <AlertTriangle className="h-4 w-4" />
        <span>Unsafe Link</span>
      </span>
    );
  }

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-canvas-950';

  const variants = {
    primary:
      'rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-ink shadow-glow hover:brightness-110 hover:shadow-glow-lg active:scale-[0.98]',
    secondary:
      'rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-sm text-neutral-100 hover:border-amber-500/50 hover:bg-neutral-800 hover:text-amber-300',
    subtle:
      'text-xs text-neutral-400 hover:text-amber-300 underline-offset-4 hover:underline',
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span>{label}</span>
      <ExternalLinkIcon className="h-4 w-4 shrink-0" />
    </a>
  );
};
