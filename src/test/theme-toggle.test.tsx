import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { THEME_STORAGE_KEY } from '@/hooks/use-theme';

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.clear();
  });

  it('switches between dark and light mode and persists the choice', () => {
    render(<ThemeToggle />);

    const toLight = screen.getByRole('button', { name: /switch to light mode/i });
    fireEvent.click(toLight);

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');

    const toDark = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(toDark);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('keeps multiple toggles in sync', () => {
    render(
      <>
        <ThemeToggle />
        <ThemeToggle />
      </>
    );

    const toggles = screen.getAllByRole('button', { name: /switch to light mode/i });
    expect(toggles).toHaveLength(2);
    fireEvent.click(toggles[0] as HTMLElement);

    expect(screen.getAllByRole('button', { name: /switch to dark mode/i })).toHaveLength(
      2
    );
  });
});
