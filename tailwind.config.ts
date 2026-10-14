import type { Config } from 'tailwindcss';

/** Maps a CSS variable holding "R G B" channels to a Tailwind color with alpha support. */
const themed = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Fixed dark text for use on solid amber surfaces (same in both themes)
        ink: '#0a0a0a',
        white: themed('white'),
        canvas: {
          950: themed('canvas-950'),
          900: themed('canvas-900'),
          850: themed('canvas-850'),
          800: themed('canvas-800'),
        },
        border: {
          subtle: themed('border-subtle'),
          strong: themed('border-strong'),
          glow: '#f59e0b20',
        },
        accent: {
          amber: '#f59e0b',
          glow: '#fbbf24',
          orange: '#ea580c',
        },
        neutral: {
          50: themed('neutral-50'),
          100: themed('neutral-100'),
          200: themed('neutral-200'),
          300: themed('neutral-300'),
          400: themed('neutral-400'),
          500: themed('neutral-500'),
          600: themed('neutral-600'),
          700: themed('neutral-700'),
          800: themed('neutral-800'),
          900: themed('neutral-900'),
          950: themed('neutral-950'),
        },
        amber: {
          200: themed('amber-200'),
          300: themed('amber-300'),
          400: themed('amber-400'),
        },
        emerald: {
          300: themed('emerald-300'),
          400: themed('emerald-400'),
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(245, 158, 11, 0.15)',
        'glow-lg': '0 0 40px -10px rgba(245, 158, 11, 0.25)',
        surface: '0 8px 30px -4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
