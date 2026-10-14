import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PortfolioShowcaseSection } from '@/components/home/portfolio-showcase-section';

describe('PortfolioShowcaseSection Component', () => {
  it('renders showcase headline, career metrics, and interactive browser frame', () => {
    render(
      <MemoryRouter>
        <PortfolioShowcaseSection />
      </MemoryRouter>
    );

    // Headline and subheadings
    expect(screen.getByText('Sophanith Mey — Personal Portfolio')).toBeInTheDocument();
    expect(screen.getByText(/Frontend at Wingmall/i)).toBeInTheDocument();
    expect(screen.getByText(/4\+ Years Active/i)).toBeInTheDocument();
    expect(screen.getByText(/1st Class Honours/i)).toBeInTheDocument();

    // Browser URL bar display
    expect(screen.getByText('sophanithmey.vercel.app')).toBeInTheDocument();

    // Live iframe should be present initially
    const iframe = screen.getByTitle('Sophanith Mey — Personal Portfolio Live Preview');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://sophanithmey.vercel.app/');
    expect(iframe).toHaveAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-popups allow-forms'
    );
  });

  it('allows toggling between Interactive mode and Artwork mode', () => {
    render(
      <MemoryRouter>
        <PortfolioShowcaseSection />
      </MemoryRouter>
    );

    // Click Artwork mode
    const artworkBtn = screen.getByRole('button', { name: /Artwork/i });
    fireEvent.click(artworkBtn);

    // Iframe should be swapped for artwork image
    expect(
      screen.queryByTitle('Sophanith Mey — Personal Portfolio Live Preview')
    ).not.toBeInTheDocument();
    const artworkImg = screen.getByAltText('Sophanith Mey Portfolio Artwork');
    expect(artworkImg).toBeInTheDocument();
    expect(artworkImg).toHaveAttribute('src', '/images/sophanithmey-portfolio.svg');

    // Switch back to Interactive
    const interactiveBtn = screen.getByRole('button', { name: /Interactive/i });
    fireEvent.click(interactiveBtn);
    expect(
      screen.getByTitle('Sophanith Mey — Personal Portfolio Live Preview')
    ).toBeInTheDocument();
  });

  it('provides safe outbound links to the live portfolio', () => {
    render(
      <MemoryRouter>
        <PortfolioShowcaseSection />
      </MemoryRouter>
    );

    const openLink = screen.getByRole('link', { name: /Open portfolio in new tab/i });
    expect(openLink).toHaveAttribute('href', 'https://sophanithmey.vercel.app/');
    expect(openLink).toHaveAttribute('target', '_blank');
    expect(openLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
