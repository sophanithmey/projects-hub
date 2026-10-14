import type { Project } from '@/types/project';
import type { ProjectFilterOptions } from '@/types/filter';

export function filterProjects(
  projects: Project[],
  filters: ProjectFilterOptions
): Project[] {
  const { searchQuery, selectedCategory, selectedTechnology, featuredOnly, sortBy } =
    filters;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = projects.filter((project) => {
    // Only showcase public projects in directory listing
    if (project.visibility !== 'public') {
      return false;
    }

    if (featuredOnly && !project.featured) {
      return false;
    }

    if (
      selectedCategory &&
      selectedCategory !== 'all' &&
      project.category.toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return false;
    }

    if (
      selectedTechnology &&
      selectedTechnology !== 'all' &&
      !project.technologies.some(
        (tech) => tech.toLowerCase() === selectedTechnology.toLowerCase()
      )
    ) {
      return false;
    }

    if (normalizedQuery) {
      const matchName = project.name.toLowerCase().includes(normalizedQuery);
      const matchDescription = project.description
        .toLowerCase()
        .includes(normalizedQuery);
      const matchTech = project.technologies.some((tech) =>
        tech.toLowerCase().includes(normalizedQuery)
      );
      if (!matchName && !matchDescription && !matchTech) {
        return false;
      }
    }

    return true;
  });

  return sortProjects(filtered, sortBy);
}

export function sortProjects(
  projects: Project[],
  sortBy: ProjectFilterOptions['sortBy']
): Project[] {
  const list = [...projects];

  switch (sortBy) {
    case 'featured-first':
      return list.sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case 'default':
    default:
      return list;
  }
}
