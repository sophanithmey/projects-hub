# Project Hub — Creative Vercel Portfolio

A personal portfolio application built with React, Vite, TypeScript, and Tailwind CSS designed to collect and showcase web applications deployed on Vercel.

The hub operates with a lightweight, zero-backend architecture powered by a single source of truth in `src/data/projects.json`.

---

## Features

- **Single JSON Registry**: Maintain all project metadata in `src/data/projects.json`. No database, no Supabase, no Firebase, and no backend maintenance required.
- **Zod Schema Validation**: Type-safe schema validation at development and test time.
- **Creative Dark Theme**: Refined aesthetic with warm amber and copper accents, glassmorphism cards, and responsive asymmetric grids.
- **Search & Filtering**: Instant client-side search across title, description, and technologies, plus category and featured-only filters.
- **Deep Routing**: Direct detail pages for each project via `/projects/:slug`.
- **Safe External Links**: Strict HTTPS validation and safe external link attributes (`rel="noopener noreferrer"`).
- **Reduced-Motion & Accessibility**: Fully accessible semantic HTML, keyboard navigable, and honors `prefers-reduced-motion`.

---

## Getting Started

### Prerequisites

- Node.js LTS version 20.x (defined in `.nvmrc`)
- Yarn (v1.22+)

### Installation

1. Load the recommended Node version using `nvm`:
   ```bash
   nvm use
   ```
   If you do not have Node 20 installed:
   ```bash
   nvm install
   ```

2. Install project dependencies with Yarn:
   ```bash
   yarn install
   ```

### Available Scripts

- `yarn dev` — Start the local Vite development server
- `yarn build` — Typecheck and build the production bundle into `dist/`
- `yarn test` — Run the Vitest test suite
- `yarn lint` — Run ESLint across TypeScript source files
- `yarn typecheck` — Run TypeScript compiler check without emitting
- `yarn format` — Format code with Prettier

---

## How to Add a Project to `projects.json`

Open `src/data/projects.json` and add a new entry to the array:

```json
{
  "id": "prj-09",
  "name": "My Canvas Synth",
  "slug": "my-canvas-synth",
  "description": "Interactive WebGL audio-reactive canvas visualizer.",
  "url": "https://my-canvas-synth.vercel.app",
  "image": "/images/my-canvas-synth.svg",
  "category": "Creative Audio",
  "technologies": ["React", "WebGL", "TypeScript", "Tailwind CSS"],
  "featured": true,
  "status": "production",
  "visibility": "public"
}
```

### Schema Field Reference

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (e.g. `"prj-09"`) |
| `name` | `string` | Display name of the application |
| `slug` | `string` | URL slug in kebab-case (e.g. `"my-canvas-synth"`) |
| `description` | `string` | Summary of what the project does and its architecture |
| `url` | `string` | Secure HTTPS destination URL (e.g. `"https://....vercel.app"`) |
| `image` | `string` | Path relative to public root (e.g. `"/images/my-canvas-synth.svg"`) |
| `category` | `string` | Domain category (e.g. `"Creative Audio"`, `"Developer Tools"`) |
| `technologies` | `string[]` | Array of libraries and tools used |
| `featured` | `boolean` | Set to `true` to highlight on the homepage and featured filter |
| `status` | `'production' \| 'active' \| 'beta' \| 'archived' \| 'maintenance' \| 'concept'` | Lifecycle status |
| `visibility` | `'public' \| 'unlisted' \| 'private'` | Presentation control |

> **Security Note**: Never store API tokens, secrets, or confidential credentials in `projects.json`. All data in this JSON registry is bundled into the client application.

---

## How to Add Screenshots

1. Save your screenshot or SVG illustration in the `public/images/` directory.
2. Use **kebab-case filenames** (for example: `public/images/my-canvas-synth.svg` or `public/images/my-canvas-synth.webp`).
3. Reference the file path in `projects.json` using `/images/<kebab-case-name>.<ext>`.
4. If an image file is missing or fails to load, a polished fallback placeholder will automatically display in its place.

---

## How to Configure Social Links & Profile

Edit `src/data/social-links.json` to update your name, title, bio, and outbound social links:

```json
{
  "name": "Your Name",
  "title": "Creative Frontend Engineer",
  "bio": "Building modern web applications deployed on Vercel.",
  "location": "San Francisco, CA / Remote",
  "availableForHire": true,
  "socialLinks": [
    {
      "id": "github",
      "name": "GitHub",
      "url": "https://github.com/your-username",
      "icon": "github"
    },
    {
      "id": "twitter",
      "name": "X / Twitter",
      "url": "https://twitter.com/your-username",
      "icon": "twitter"
    }
  ]
}
```

Supported icon names: `"github"`, `"twitter"`, `"linkedin"`, `"mail"`, `"globe"`.

---

## How to Build and Deploy to Vercel

### Option 1: Git Integration (Recommended)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to the [Vercel Dashboard](https://vercel.com/new).
3. Import your repository.
4. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `yarn build`
   - **Output Directory**: `dist`
   - **Install Command**: `yarn install`
5. Click **Deploy**.

Whenever you edit `src/data/projects.json` and push to your git branch, Vercel will trigger an automatic preview or production deployment.

### Option 2: Deploying via Vercel CLI

```bash
# Install Vercel CLI globally if not already installed
npm i -g vercel

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

### Single Page Application (SPA) Routing on Vercel

To ensure routes such as `/projects` and `/projects/:slug` resolve correctly when refreshed on Vercel, a `vercel.json` rewrite configuration is included:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
