export type ProjectStatus =
  'production' | 'active' | 'beta' | 'archived' | 'maintenance' | 'concept';

export type ProjectVisibility = 'public' | 'unlisted' | 'private';

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  url: string;
  image: string;
  category: string;
  technologies: string[];
  featured: boolean;
  status: ProjectStatus;
  visibility: ProjectVisibility;
}
