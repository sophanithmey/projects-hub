# Agent Rules & Guidelines — Project Hub

These rules govern all AI coding assistants, agents, and human contributors working within this repository. All contributors MUST adhere strictly to these standards.

---

## 1. Architectural Principles & Single Source of Truth

- **Zero-Backend Architecture**: This application is a client-side portfolio statically pre-rendered with Vite and deployed on Vercel Edge.
- **No Backend / External Databases**: Never introduce Supabase, Firebase, relational or NoSQL databases, Node/Express backends, serverless API routes, user authentication, or automated Vercel API queries.
- **Single Source of Truth**: All project metadata is strictly maintained in [`src/data/projects.json`](file:///Users/sophanith.mey/Personal/project-hub/src/data/projects.json). Profile data and social links reside in [`src/data/social-links.json`](file:///Users/sophanith.mey/Personal/project-hub/src/data/social-links.json).
- **Stateless Updates**: To add, modify, or remove projects, update the JSON registry and redeploy. Never add client-side dynamic fetching from external portfolio management APIs.

---

## 2. File Organization & Strict Line Constraints

- **Strict Kebab-Case**: All files and directory names across `src/`, `public/`, and test folders MUST use strictly `kebab-case` (e.g., `featured-spotlight.tsx`, `use-projects.ts`, `url-validator.ts`, `khmer-instrument.svg`).
- **File Length Limits**:
  - Keep each source file under **150 lines** where practical.
  - **Never exceed 200 lines**.
  - Proactively decompose larger components into focused subcomponents (e.g., extracting spotlight banners, bento cards, sidebars, or badges into dedicated files).

---

## 3. Project Schema & Zod Validation

Every entry in [`src/data/projects.json`](file:///Users/sophanith.mey/Personal/project-hub/src/data/projects.json) must conform to `Project` in [`src/types/project.ts`](file:///Users/sophanith.mey/Personal/project-hub/src/types/project.ts) and validate against `projectSchema` in [`src/schemas/project-schema.ts`](file:///Users/sophanith.mey/Personal/project-hub/src/schemas/project-schema.ts):

```json
{
  "id": "prj-12",
  "name": "Soursdey Digital Weddings",
  "slug": "soursdey-digital-weddings",
  "description": "Interactive Cambodian digital wedding invitation platform featuring audio RSVP and ceremony maps.",
  "url": "https://soursdey.vercel.app/",
  "image": "/images/soursdey-digital-weddings.svg",
  "category": "Culture & Events",
  "technologies": ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  "featured": true,
  "status": "production",
  "visibility": "public"
}
```

### Required Fields & Allowed Values:
- `id`: Unique string (`"prj-XX"`).
- `name`: Display name of the application.
- `slug`: Lowercase alphanumeric with hyphens (`^[a-z0-9-]+$`).
- `description`: 1-2 sentence concise summary.
- `url`: Valid, secure `https://` destination URL.
- `image`: Path relative to public root in kebab-case (e.g., `"/images/my-app.svg"`).
- `category`: Taxonomy category (e.g., `"Culture & Events"`, `"Fintech & Tools"`, `"Lifestyle & Utilities"`).
- `technologies`: Array of non-empty strings.
- `featured`: `true` | `false` (controls spotlight placement on home page).
- `status`: `'production' | 'active' | 'beta' | 'archived' | 'maintenance' | 'concept'`.
- `visibility`: `'public' | 'unlisted' | 'private'`.

**Security Note**: Never commit secrets, API keys, or private tokens to `projects.json` or any client-side file.

---

## 4. How to Add a New Project (Step-by-Step)

When asked to add a new project:
1. **Asset Creation**: Generate or place a bespoke SVG or illustration in `public/images/<kebab-slug>.svg`.
2. **Registry Entry**: Add a complete entry into [`src/data/projects.json`](file:///Users/sophanith.mey/Personal/project-hub/src/data/projects.json) following the schema above.
3. **Verify Links & Schema**: Ensure the URL is HTTPS and does not conflict with existing IDs or slugs.
4. **Run Verification**: Execute the full verification suite (tests, typecheck, lint, format check, build).

---

## 5. URL Validation & Link Safety

- Outbound project links MUST use **HTTPS**. Protocol schemes like `http:`, `javascript:`, `data:`, or relative URLs are rejected by [`src/utils/url-validator.ts`](file:///Users/sophanith.mey/Personal/project-hub/src/utils/url-validator.ts).
- Always use the [`<ExternalLink />`](file:///Users/sophanith.mey/Personal/project-hub/src/components/common/external-link.tsx) component or `getSafeExternalLinkProps` helper to ensure `rel="noopener noreferrer"` and `target="_blank"` are applied.

---

## 6. Media & Asset Management

- Store all illustrations and graphics in `public/images/` using `kebab-case`.
- Keep `public/images/` synchronized with active projects in `src/data/projects.json`. Delete unused, dangling, or obsolete SVG files when projects are replaced.
- Always render project images with [`<ProjectImage />`](file:///Users/sophanith.mey/Personal/project-hub/src/components/common/project-image.tsx) for fallback handling and graceful load states.

---

## 7. Design System & Accessibility Standards

- **Color Palette**:
  - Dark Canvas: `canvas-950` (`#090a0d`), `canvas-900` (`#111318`), `canvas-800` (`#1a1d24`).
  - Warm Accents: Amber tones (`#f59e0b`, `#fbbf24`), subtle glow effects (`rgba(245, 158, 11, 0.1)`).
  - Borders: Crisp, ultra-subtle borders (`border-white/10` or `border-zinc-800`).
  - Glassmorphism: `backdrop-blur-md` for header, modal drawers, and floating panels.
- **Light & Dark Themes**:
  - `canvas-*`, `neutral-*`, `border-*`, `white`, `amber-200/300/400`, and `emerald-300/400` are theme-aware CSS variables defined in `src/index.css` (`:root` = dark, `html.light` = light). Use these tokens; never hardcode hex/`rgb()` colors in components.
  - Text on solid `bg-amber-500` surfaces MUST use `text-ink` (fixed dark) and hover with `hover:brightness-110`.
  - Theme state lives in `src/hooks/use-theme.ts`; render the toggle via `<ThemeToggle />`. The inline script in `index.html` applies the saved theme before first paint.
- **Typography & Layout**:
  - Semantic HTML5 headings (`<h1>` on Hero, `<h2>` on major sections).
  - High scannability with badges, metadata chips, and responsive grids.
- **Accessibility**:
  - Meaningful `aria-label` attributes on icon buttons, drawer toggles, and outbound links.
  - Visible focus outlines (`focus-visible:ring-2 focus-visible:ring-amber-500`).
  - Respect `@media (prefers-reduced-motion: reduce)` on all custom animations and transitions.

---

## 8. Development & Verification Workflow

- **Runtime**: Node.js 20 LTS (enforced via `.nvmrc`).
- **Package Manager**: Yarn (v1.22+).
- **Mandatory Verification**: Before concluding any task or code edit, run the full verification pipeline:
  ```bash
  yarn test         # Vitest suite (all unit and component tests)
  yarn typecheck    # TypeScript compiler check (tsc --noEmit)
  yarn lint         # ESLint with zero warnings allowed (--max-warnings 0)
  yarn format:check # Prettier code formatting verification
  yarn build        # Production bundle build (tsc -b && vite build)
  ```
- **Integrity Guarantee**: Never state or assume that tests, types, or builds pass without executing the commands and verifying their output.
