import React from 'react';
import type { ProjectStatus } from '@/types/project';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; dotClass: string; bgClass: string; textClass: string }
> = {
  production: {
    label: 'Live',
    dotClass: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
    bgClass: 'bg-emerald-950/40 border-emerald-800/40',
    textClass: 'text-emerald-300',
  },
  active: {
    label: 'Active',
    dotClass: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]',
    bgClass: 'bg-cyan-950/40 border-cyan-800/40',
    textClass: 'text-cyan-300',
  },
  beta: {
    label: 'Beta',
    dotClass: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
    bgClass: 'bg-amber-950/40 border-amber-800/40',
    textClass: 'text-amber-300',
  },
  maintenance: {
    label: 'Maintenance',
    dotClass: 'bg-orange-400',
    bgClass: 'bg-orange-950/40 border-orange-800/40',
    textClass: 'text-orange-300',
  },
  archived: {
    label: 'Archived',
    dotClass: 'bg-neutral-500',
    bgClass: 'bg-neutral-900 border-neutral-800',
    textClass: 'text-neutral-400',
  },
  concept: {
    label: 'Concept',
    dotClass: 'bg-purple-400',
    bgClass: 'bg-purple-950/40 border-purple-800/40',
    textClass: 'text-purple-300',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.active;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide ${config.bgClass} ${config.textClass} ${padding}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
};

export const TechBadge: React.FC<{ tech: string; onClick?: () => void }> = ({
  tech,
  onClick,
}) => {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="rounded-md border border-neutral-800 bg-neutral-900/60 px-2 py-0.5 text-xs font-medium text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
      >
        {tech}
      </button>
    );
  }

  return (
    <span className="rounded-md border border-neutral-800 bg-neutral-900/60 px-2 py-0.5 text-xs font-medium text-neutral-300">
      {tech}
    </span>
  );
};
