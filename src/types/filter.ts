export type ProjectSortOption = 'default' | 'featured-first' | 'name-asc' | 'name-desc';

export interface ProjectFilterOptions {
  searchQuery: string;
  selectedCategory: string;
  selectedTechnology: string;
  featuredOnly: boolean;
  sortBy: ProjectSortOption;
}
