import { describe, it, expect } from 'vitest';
import {
  projectSchema,
  projectsListSchema,
  validateProject,
  validateProjectsList,
} from '@/schemas/project-schema';
import rawProjects from '@/data/projects.json';

describe('Project Schema Validation', () => {
  const validProject = {
    id: 'test-01',
    name: 'Sample App',
    slug: 'sample-app',
    description: 'A test project description',
    url: 'https://sample-app.vercel.app',
    image: '/images/sample-app.svg',
    category: 'Developer Tools',
    technologies: ['React', 'TypeScript'],
    featured: true,
    status: 'production',
    visibility: 'public',
  };

  it('validates a correct project schema', () => {
    const result = validateProject(validProject);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Sample App');
    }
  });

  it('validates all entries in the actual projects.json registry', () => {
    const directResult = projectsListSchema.safeParse(rawProjects);
    expect(directResult.success).toBe(true);

    const result = validateProjectsList(rawProjects);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.length).toBeGreaterThan(0);
      result.data.forEach((p) => {
        expect(p.id).toBeTruthy();
        expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      });
    }
  });

  it('rejects missing required fields', () => {
    const invalid = { ...validProject, name: '' };
    const result = validateProject(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects uppercase or invalid characters in slug', () => {
    const invalidSlug = { ...validProject, slug: 'Invalid_Slug!' };
    const result = projectSchema.safeParse(invalidSlug);
    expect(result.success).toBe(false);
  });

  it('rejects invalid status literals', () => {
    const invalidStatus = { ...validProject, status: 'unknown-status' };
    const result = projectSchema.safeParse(invalidStatus);
    expect(result.success).toBe(false);
  });

  it('rejects invalid visibility literals', () => {
    const invalidVis = { ...validProject, visibility: 'hidden' };
    const result = projectSchema.safeParse(invalidVis);
    expect(result.success).toBe(false);
  });

  it('rejects empty technologies array', () => {
    const noTechs = { ...validProject, technologies: [] };
    const result = projectSchema.safeParse(noTechs);
    expect(result.success).toBe(false);
  });

  it('rejects malformed url string', () => {
    const badUrl = { ...validProject, url: 'not-a-valid-url' };
    const result = projectSchema.safeParse(badUrl);
    expect(result.success).toBe(false);
  });
});
