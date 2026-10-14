import { describe, it, expect } from 'vitest';
import type { Project } from '@/types/project';
import {
  getProjectBySlug,
  getFeaturedProjects,
  getAllCategories,
  getAllTechnologies,
  getCategoryCounts,
} from '@/utils/project-helpers';

const testProjects: Project[] = [
  {
    id: 'p1',
    name: 'Project One',
    slug: 'project-one',
    description: 'First app',
    url: 'https://p1.vercel.app',
    image: '/images/p1.svg',
    category: 'Audio',
    technologies: ['React', 'TypeScript'],
    featured: true,
    status: 'production',
    visibility: 'public',
  },
  {
    id: 'p2',
    name: 'Project Two',
    slug: 'project-two',
    description: 'Second app',
    url: 'https://p2.vercel.app',
    image: '/images/p2.svg',
    category: 'Design',
    technologies: ['React', 'CSS'],
    featured: false,
    status: 'active',
    visibility: 'public',
  },
  {
    id: 'p3',
    name: 'Project Hidden',
    slug: 'project-hidden',
    description: 'Private app',
    url: 'https://p3.vercel.app',
    image: '/images/p3.svg',
    category: 'Design',
    technologies: ['Node'],
    featured: true,
    status: 'beta',
    visibility: 'private',
  },
  {
    id: 'p4',
    name: 'Project Unlisted',
    slug: 'project-unlisted',
    description: 'Unlisted lab demo',
    url: 'https://p4.vercel.app',
    image: '/images/p4.svg',
    category: 'Labs',
    technologies: ['Rust', 'Wasm'],
    featured: false,
    status: 'beta',
    visibility: 'unlisted',
  },
];

describe('Project Lookup & Helper Utilities', () => {
  it('finds project by exact slug case-insensitively', () => {
    const found = getProjectBySlug(testProjects, 'project-one');
    expect(found).toBeDefined();
    expect(found?.name).toBe('Project One');

    const foundUpper = getProjectBySlug(testProjects, 'PROJECT-ONE');
    expect(foundUpper).toBeDefined();
    expect(foundUpper?.id).toBe('p1');
  });

  it('allows looking up unlisted project by slug', () => {
    const unlisted = getProjectBySlug(testProjects, 'project-unlisted');
    expect(unlisted).toBeDefined();
    expect(unlisted?.visibility).toBe('unlisted');
  });

  it('blocks private projects from slug lookup', () => {
    const privateProject = getProjectBySlug(testProjects, 'project-hidden');
    expect(privateProject).toBeUndefined();
  });

  it('returns undefined for non-existent slugs', () => {
    expect(getProjectBySlug(testProjects, 'does-not-exist')).toBeUndefined();
    expect(getProjectBySlug(testProjects, '')).toBeUndefined();
  });

  it('extracts featured public projects with optional limit', () => {
    const featured = getFeaturedProjects(testProjects);
    expect(featured).toHaveLength(1);
    expect(featured[0]?.id).toBe('p1');

    const limited = getFeaturedProjects(testProjects, 1);
    expect(limited).toHaveLength(1);
  });

  it('extracts unique categories and counts for public projects', () => {
    const categories = getAllCategories(testProjects);
    expect(categories).toEqual(['Audio', 'Design']);

    const counts = getCategoryCounts(testProjects);
    expect(counts['Audio']).toBe(1);
    expect(counts['Design']).toBe(1);
    expect(counts['Labs']).toBeUndefined();
  });

  it('extracts unique technologies for public projects', () => {
    const techs = getAllTechnologies(testProjects);
    expect(techs).toEqual(['CSS', 'React', 'TypeScript']);
  });
});
