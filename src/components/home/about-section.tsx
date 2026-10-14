import React from 'react';
import { User, Code2, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';
import creatorData from '@/data/social-links.json';
import { getSafeExternalLinkProps } from '@/utils/url-validator';
import { ExternalLink } from '@/components/common/external-link';
import { AboutCapabilityCard } from '@/components/home/about-capability-card';

export const AboutSection: React.FC = () => {
  const { name, title, bio, location, availableForHire, portfolioUrl, socialLinks } =
    creatorData;
  const portfolioSafeProps = getSafeExternalLinkProps(portfolioUrl);

  return (
    <section id="about" className="py-16 border-t border-border-subtle bg-canvas-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Creator Profile */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
              <User className="h-4 w-4" />
              <span>About the Creator</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-100">
                {name}
              </h2>
              <p className="mt-1 font-mono text-sm text-neutral-400">{title}</p>
            </div>
            <p className="text-sm leading-relaxed text-neutral-300">
              {bio}{' '}
              <a
                href={portfolioSafeProps.href}
                target={portfolioSafeProps.target}
                rel={portfolioSafeProps.rel}
                className="inline-flex items-center gap-0.5 font-semibold text-amber-400 hover:text-amber-300 hover:underline"
              >
                <span>See more</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
              <span>Location: {location}</span>
              {availableForHire && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available for contracts
                </span>
              )}
            </div>

            {/* Actions & Configured Social Links */}
            <div className="space-y-4 pt-2 border-t border-border-subtle">
              <div className="flex flex-wrap items-center gap-3">
                <ExternalLink
                  url={portfolioUrl}
                  label="See More on Portfolio"
                  variant="primary"
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                {socialLinks
                  .filter((link) => link.id !== 'portfolio')
                  .map((link) => {
                    const safeProps = getSafeExternalLinkProps(link.url);
                    return (
                      <a
                        key={link.id}
                        href={safeProps.href}
                        target={safeProps.target}
                        rel={safeProps.rel}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-canvas-950 px-3.5 py-2 text-xs font-medium text-neutral-200 transition-colors hover:border-amber-500/40 hover:text-amber-300"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-60" />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Core Capabilities & Engineering Standards */}
          <div className="lg:col-span-6 space-y-4">
            <AboutCapabilityCard
              icon={Code2}
              iconBgClass="bg-amber-500/10"
              iconColorClass="text-amber-400"
              hoverBorderClass="hover:border-amber-500/30"
              title="Frontend Developer"
              subtitle="Modern TypeScript, React & Next.js ecosystems"
              description="Crafting responsive, high-performance web applications and mobile apps with clean component architectures, rich animations, and robust client-side state management."
            />

            <AboutCapabilityCard
              icon={Zap}
              iconBgClass="bg-purple-500/10"
              iconColorClass="text-purple-400"
              hoverBorderClass="hover:border-purple-500/30"
              title="Edge Performance & Cloud Delivery"
              subtitle="Sub-second load times & zero cold starts"
              description="Deploying globally distributed web experiences with optimized Core Web Vitals, intelligent caching, responsive vector assets, and accessible theming."
            />

            <AboutCapabilityCard
              icon={ShieldCheck}
              iconBgClass="bg-cyan-500/10"
              iconColorClass="text-cyan-400"
              hoverBorderClass="hover:border-cyan-500/30"
              title="Production-Grade Reliability"
              subtitle="Type safety, security protocols & automated testing"
              description="Delivering reliable code with end-to-end type validation, sanitized outbound navigation, and automated test pipelines for resilient production releases."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
