import React from 'react';
import { Globe } from 'lucide-react';
import type { Project } from '@/types/project';
import { ExternalLink } from '@/components/common/external-link';
import { formatDisplayUrl } from '@/utils/url-validator';

interface ProjectDetailSidebarProps {
  project: Project;
}

export const ProjectDetailSidebar: React.FC<ProjectDetailSidebarProps> = ({
  project,
}) => {
  return (
    <aside className="lg:col-span-4 space-y-6 rounded-2xl border border-border-subtle bg-canvas-900/60 p-6">
      <div>
        <span className="text-xs font-mono uppercase text-neutral-400">
          Deployment Host
        </span>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-neutral-200">
          <Globe className="h-4 w-4 text-emerald-400" />
          <span>Vercel Edge Platform</span>
        </p>
      </div>

      <div>
        <span className="text-xs font-mono uppercase text-neutral-400">
          Live Destination
        </span>
        <p className="mt-1 font-mono text-xs text-neutral-300 break-all">
          {formatDisplayUrl(project.url)}
        </p>
      </div>

      <div className="border-t border-border-subtle pt-4">
        <ExternalLink
          url={project.url}
          label="Launch App &rarr;"
          variant="secondary"
          className="w-full justify-center"
        />
      </div>
    </aside>
  );
};
