import { useMemo } from 'react';
import type { Project } from '@/types/project';
import projectsData from '@/data/projects.json';
import { validateProjectsList } from '@/schemas/project-schema';
import {
  getProjectBySlug,
  getFeaturedProjects,
  getAllCategories,
  getAllTechnologies,
} from '@/utils/project-helpers';

export function useProjects() {
  const projects = useMemo(() => {
    const rawList = projectsData as Project[];

    // Validate in development mode
    if (import.meta.env.DEV) {
      const validation = validateProjectsList(rawList);
      if (!validation.success) {
        console.warn(
          'projects.json schema validation warnings:',
          validation.error.format()
        );
      }
    }

    return rawList;
  }, []);

  const publicProjects = useMemo(
    () => projects.filter((p) => p.visibility === 'public'),
    [projects]
  );

  const featuredProjects = useMemo(() => getFeaturedProjects(projects), [projects]);

  const categories = useMemo(() => getAllCategories(projects), [projects]);

  const technologies = useMemo(() => getAllTechnologies(projects), [projects]);

  const findBySlug = (slug: string) => getProjectBySlug(projects, slug);

  return {
    allProjects: projects,
    publicProjects,
    featuredProjects,
    categories,
    technologies,
    findBySlug,
  };
}
