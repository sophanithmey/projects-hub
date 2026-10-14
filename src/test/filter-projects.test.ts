import { describe, it, expect } from 'vitest';
import type { Project } from '@/types/project';
import { filterProjects, sortProjects } from '@/utils/filter-projects';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Alpha Synth',
    slug: 'alpha-synth',
    description: 'Real-time audio synthesizer and oscillator',
    url: 'https://alpha.vercel.app',
    image: '/images/alpha.svg',
    category: 'Audio',
    technologies: ['React', 'Web Audio API'],
    featured: false,
    status: 'production',
    visibility: 'public',
  },
  {
    id: '2',
    name: 'Beta Studio',
    slug: 'beta-studio',
    description: 'Typographic markdown editor',
    url: 'https://beta.vercel.app',
    image: '/images/beta.svg',
    category: 'Productivity',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    status: 'active',
    visibility: 'public',
  },
  {
    id: '3',
    name: 'Gamma Orbit',
    slug: 'gamma-orbit',
    description: '3D flight tracker and globe simulation',
    url: 'https://gamma.vercel.app',
    image: '/images/gamma.svg',
    category: 'Visualization',
    technologies: ['Three.js', 'WebGL', 'TypeScript'],
    featured: true,
    status: 'beta',
    visibility: 'public',
  },
  {
    id: '4',
    name: 'Delta Secret',
    slug: 'delta-secret',
    description: 'Private unlisted research experiment',
    url: 'https://delta.vercel.app',
    image: '/images/delta.svg',
    category: 'Audio',
    technologies: ['Rust', 'WebAssembly'],
    featured: false,
    status: 'beta',
    visibility: 'unlisted',
  },
];

describe('filterProjects', () => {
  const baseFilter = {
    searchQuery: '',
    selectedCategory: 'all',
    selectedTechnology: 'all',
    featuredOnly: false,
    sortBy: 'default' as const,
  };

  it('filters out non-public projects by default', () => {
    const results = filterProjects(mockProjects, baseFilter);
    expect(results).toHaveLength(3);
    expect(results.some((p) => p.visibility === 'unlisted')).toBe(false);
  });

  it('filters by project name search query', () => {
    const results = filterProjects(mockProjects, {
      ...baseFilter,
      searchQuery: 'Alpha',
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe('Alpha Synth');
  });

  it('filters by description search query', () => {
    const results = filterProjects(mockProjects, {
      ...baseFilter,
      searchQuery: 'markdown editor',
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe('Beta Studio');
  });

  it('filters by category', () => {
    const results = filterProjects(mockProjects, {
      ...baseFilter,
      selectedCategory: 'Audio',
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.category).toBe('Audio');
  });

  it('filters by technology', () => {
    const results = filterProjects(mockProjects, {
      ...baseFilter,
      selectedTechnology: 'Three.js',
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe('Gamma Orbit');
  });

  it('filters featured-only projects', () => {
    const results = filterProjects(mockProjects, {
      ...baseFilter,
      featuredOnly: true,
    });
    expect(results).toHaveLength(2);
    expect(results.every((p) => p.featured)).toBe(true);
  });

  it('sorts projects by name ascending and descending', () => {
    const asc = sortProjects(mockProjects.slice(0, 3), 'name-asc');
    expect(asc.map((p) => p.name)).toEqual(['Alpha Synth', 'Beta Studio', 'Gamma Orbit']);

    const desc = sortProjects(mockProjects.slice(0, 3), 'name-desc');
    expect(desc.map((p) => p.name)).toEqual([
      'Gamma Orbit',
      'Beta Studio',
      'Alpha Synth',
    ]);
  });

  it('sorts featured first', () => {
    const sorted = sortProjects(mockProjects.slice(0, 3), 'featured-first');
    expect(sorted[0]?.featured).toBe(true);
    expect(sorted[1]?.featured).toBe(true);
    expect(sorted[2]?.featured).toBe(false);
  });
});
