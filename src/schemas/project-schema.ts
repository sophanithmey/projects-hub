import { z } from 'zod';

export const projectStatusSchema = z.enum([
  'production',
  'active',
  'beta',
  'archived',
  'maintenance',
  'concept',
]);

export const projectVisibilitySchema = z.enum(['public', 'unlisted', 'private']);

export const projectSchema = z.object({
  id: z.string().min(1, 'Project id is required'),
  name: z.string().min(1, 'Project name is required'),
  slug: z
    .string()
    .min(1, 'Project slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(1, 'Project description is required'),
  url: z.string().url('Project URL must be a valid URL'),
  image: z.string().min(1, 'Project image path is required'),
  category: z.string().min(1, 'Project category is required'),
  technologies: z.array(z.string().min(1)).min(1, 'At least one technology is required'),
  featured: z.boolean(),
  status: projectStatusSchema,
  visibility: projectVisibilitySchema,
});

export const projectsListSchema = z.array(projectSchema);

export type ProjectSchemaType = z.infer<typeof projectSchema>;

export function validateProject(data: unknown) {
  return projectSchema.safeParse(data);
}

export function validateProjectsList(data: unknown) {
  return projectsListSchema.safeParse(data);
}
