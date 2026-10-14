import { useState, useMemo, useCallback } from 'react';
import type { Project } from '@/types/project';
import type { ProjectFilterOptions, ProjectSortOption } from '@/types/filter';
import { filterProjects } from '@/utils/filter-projects';

const INITIAL_FILTERS: ProjectFilterOptions = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedTechnology: 'all',
  featuredOnly: false,
  sortBy: 'default',
};

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<ProjectFilterOptions>(INITIAL_FILTERS);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  }, []);

  const setSelectedCategory = useCallback((selectedCategory: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory }));
  }, []);

  const setSelectedTechnology = useCallback((selectedTechnology: string) => {
    setFilters((prev) => ({ ...prev, selectedTechnology }));
  }, []);

  const setFeaturedOnly = useCallback((featuredOnly: boolean) => {
    setFilters((prev) => ({ ...prev, featuredOnly }));
  }, []);

  const setSortBy = useCallback((sortBy: ProjectSortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery.trim() !== '' ||
      filters.selectedCategory !== 'all' ||
      filters.selectedTechnology !== 'all' ||
      filters.featuredOnly ||
      filters.sortBy !== 'default'
    );
  }, [filters]);

  const filteredProjects = useMemo(() => {
    return filterProjects(projects, filters);
  }, [projects, filters]);

  return {
    filters,
    filteredProjects,
    hasActiveFilters,
    setSearchQuery,
    setSelectedCategory,
    setSelectedTechnology,
    setFeaturedOnly,
    setSortBy,
    resetFilters,
  };
}
