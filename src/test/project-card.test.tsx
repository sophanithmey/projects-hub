import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '@/components/projects/project-card';
import type { Project } from '@/types/project';

const sampleProject: Project = {
  id: 'card-test-01',
  name: 'Vercel Pulse Synth',
  slug: 'vercel-pulse-synth',
  description: 'A Web Audio synthesizer app deployed on Vercel Edge.',
  url: 'https://pulse-synth.vercel.app',
  image: '/images/khmer-instrument.svg',
  category: 'Creative Audio',
  technologies: ['Web Audio', 'React', 'TypeScript'],
  featured: true,
  status: 'production',
  visibility: 'public',
};

describe('ProjectCard Component', () => {
  it('renders project metadata, description, and external Vercel link', () => {
    render(
      <MemoryRouter>
        <ProjectCard project={sampleProject} />
      </MemoryRouter>
    );

    // Name and description
    expect(screen.getByText('Vercel Pulse Synth')).toBeInTheDocument();
    expect(
      screen.getByText('A Web Audio synthesizer app deployed on Vercel Edge.')
    ).toBeInTheDocument();

    // Category and badges
    expect(screen.getByText('Creative Audio')).toBeInTheDocument();
    expect(screen.getByText('Web Audio')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();

    // External link
    const externalLink = screen.getByRole('link', { name: /Open Vercel App/i });
    expect(externalLink).toHaveAttribute('href', 'https://pulse-synth.vercel.app');
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Detail page link
    const detailLink = screen.getByRole('link', { name: /Learn Details/i });
    expect(detailLink).toHaveAttribute('href', '/projects/vercel-pulse-synth');
  });
});
