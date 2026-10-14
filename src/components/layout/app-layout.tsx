import React from 'react';
import { NavBar } from '@/components/layout/nav-bar';
import { SiteFooter } from '@/components/layout/site-footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-canvas-950 text-neutral-100 selection:bg-amber-500/20 selection:text-amber-200">
      {/* Subtle ambient lighting in background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(at 15% 15%, rgba(245, 158, 11, 0.15) 0px, transparent 50%), radial-gradient(at 85% 85%, rgba(14, 165, 233, 0.1) 0px, transparent 50%)',
        }}
      />
      <NavBar />
      <main className="relative z-10 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
};
