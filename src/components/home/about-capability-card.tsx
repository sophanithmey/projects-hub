import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface AboutCapabilityCardProps {
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
  hoverBorderClass: string;
  title: string;
  subtitle: string;
  description: string;
}

export const AboutCapabilityCard: React.FC<AboutCapabilityCardProps> = ({
  icon: Icon,
  iconBgClass,
  iconColorClass,
  hoverBorderClass,
  title,
  subtitle,
  description,
}) => {
  return (
    <div
      className={`rounded-2xl border border-border-subtle bg-canvas-950 p-6 transition-colors ${hoverBorderClass}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBgClass} ${iconColorClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-neutral-100">{title}</h3>
          <p className="text-xs text-neutral-400">{subtitle}</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-neutral-400">{description}</p>
    </div>
  );
};
