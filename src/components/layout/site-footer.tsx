import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Globe, Send, ArrowUpRight } from 'lucide-react';
import creatorData from '@/data/social-links.json';
import type { SocialLink } from '@/types/social';
import { getSafeExternalLinkProps } from '@/utils/url-validator';

const ICON_MAP = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  mail: Mail,
  globe: Globe,
  telegram: Send,
};

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { name, bio } = creatorData;
  const socialLinks = creatorData.socialLinks as SocialLink[];

  return (
    <footer className="mt-24 border-t border-border-subtle bg-canvas-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand & Bio */}
          <div className="md:col-span-6">
            <span className="text-base font-bold tracking-tight text-neutral-100">
              {name}
            </span>
            <p className="mt-2 max-w-md text-sm text-neutral-400">{bio}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs text-neutral-300">
                Independent Portfolio &bull; Deployed on Vercel
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-neutral-400 transition-colors hover:text-amber-300"
                >
                  Featured Showcase
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-neutral-400 transition-colors hover:text-amber-300"
                >
                  All Projects Directory
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-neutral-400 transition-colors hover:text-amber-300"
                >
                  About the Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Social connections */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Connect
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {socialLinks.map((link: SocialLink) => {
                const IconComponent =
                  ICON_MAP[link.icon as keyof typeof ICON_MAP] || Globe;
                const safeProps = getSafeExternalLinkProps(link.url);
                return (
                  <a
                    key={link.id}
                    href={safeProps.href}
                    target={safeProps.target}
                    rel={safeProps.rel}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1.5 text-xs text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-300"
                  >
                    <IconComponent className="h-3.5 w-3.5" />
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-border-subtle pt-6 text-xs text-neutral-500 sm:flex-row">
          <p>
            &copy; {currentYear} {name}. Single source of truth: projects.json.
          </p>
          <p className="mt-2 sm:mt-0 font-mono text-[11px] text-neutral-500">
            Experience with React/Nextjs + Vite + TypeScript + Tailwind + Shadcn/UI
          </p>
        </div>
      </div>
    </footer>
  );
};
