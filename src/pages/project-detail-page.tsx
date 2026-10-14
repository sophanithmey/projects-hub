import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { StatusBadge, TechBadge } from '@/components/common/badge';
import { ProjectImage } from '@/components/common/project-image';
import { ExternalLink } from '@/components/common/external-link';
import { ProjectDetailSidebar } from '@/components/projects/project-detail-sidebar';
import { ProjectRelated } from '@/components/projects/project-related';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { findBySlug, publicProjects } = useProjects();
  const project = slug ? findBySlug(slug) : undefined;

  useEffect(() => {
    if (project) {
      document.title = `${project.name} | Sophanith's Projects`;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle)
        ogTitle.setAttribute('content', `${project.name} | Sophanith's Projects`);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', project.description);
    } else {
      document.title = "Project Not Found | Sophanith's Projects";
    }
  }, [project]);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-100">Project Not Found</h1>
        <p className="mt-2 text-sm text-neutral-400">
          The requested project slug does not exist in the Vercel registry.
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to directory</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-8 flex items-center gap-2 text-xs font-mono text-neutral-400">
        <Link to="/projects" className="hover:text-amber-400 transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-amber-300 font-semibold">{project.slug}</span>
      </div>

      {/* Main Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              {project.category}
            </span>
            <StatusBadge status={project.status} />
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
                <Star className="h-3 w-3 fill-amber-400/30" />
                Featured
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
            {project.name}
          </h1>
        </div>

        {/* Prominent Open Project CTA */}
        <div className="shrink-0 pt-2 sm:pt-0">
          <ExternalLink
            url={project.url}
            label="Open Live Application"
            variant="primary"
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Large Visual Preview */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle bg-canvas-900 shadow-2xl">
        <ProjectImage
          src={project.image}
          alt={project.name}
          category={project.category}
          aspectRatio="wide"
        />
      </div>

      {/* Specifications & Sidebar */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
              Overview &amp; Architecture
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-200">
              {project.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
              Technologies &amp; Libraries
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </div>
        </div>

        <ProjectDetailSidebar project={project} />
      </div>

      {/* Related in Category */}
      <ProjectRelated currentProject={project} publicProjects={publicProjects} />
    </article>
  );
};
