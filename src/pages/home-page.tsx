import React, { useEffect } from 'react';
import { useProjects } from '@/hooks/use-projects';
import { HeroSection } from '@/components/home/hero-section';
import { PortfolioShowcaseSection } from '@/components/home/portfolio-showcase-section';
import { FeaturedSection } from '@/components/home/featured-section';
import { CategoriesSection } from '@/components/home/categories-section';
import { TechStackSection } from '@/components/home/tech-stack-section';
import { AboutSection } from '@/components/home/about-section';

export const HomePage: React.FC = () => {
  const { publicProjects, featuredProjects, categories, technologies } = useProjects();

  useEffect(() => {
    document.title = "Sophanith's Projects | Creative Vercel Portfolio";
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', "Sophanith's Projects | Creative Vercel Portfolio");
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Curated portfolio of creative web applications, interactive experiments, and production systems deployed on Vercel by Sophanith Mey.'
      );
    }
  }, []);

  return (
    <div className="relative">
      <HeroSection
        totalProjects={publicProjects.length}
        totalCategories={categories.length}
      />
      <FeaturedSection featuredProjects={featuredProjects} />
      <PortfolioShowcaseSection />
      <CategoriesSection projects={publicProjects} categories={categories} />
      <TechStackSection technologies={technologies} />
      <AboutSection />
    </div>
  );
};
