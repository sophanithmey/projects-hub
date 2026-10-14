import type { Project } from '@/types/project';

export function getProjectBySlug(projects: Project[], slug: string): Project | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return projects.find(
    (p) => p.slug.toLowerCase() === normalized && p.visibility !== 'private'
  );
}

export function getFeaturedProjects(projects: Project[], limit?: number): Project[] {
  const featured = projects.filter((p) => p.featured && p.visibility === 'public');
  return limit ? featured.slice(0, limit) : featured;
}

export function getAllCategories(projects: Project[]): string[] {
  const categories = new Set<string>();
  projects
    .filter((p) => p.visibility === 'public')
    .forEach((p) => {
      if (p.category) categories.add(p.category);
    });
  return Array.from(categories).sort();
}

export function getAllTechnologies(projects: Project[]): string[] {
  const techs = new Set<string>();
  projects
    .filter((p) => p.visibility === 'public')
    .forEach((p) => {
      p.technologies.forEach((t) => techs.add(t));
    });
  return Array.from(techs).sort();
}

export function getCategoryCounts(projects: Project[]): Record<string, number> {
  const counts: Record<string, number> = {};
  projects
    .filter((p) => p.visibility === 'public')
    .forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
  return counts;
}
