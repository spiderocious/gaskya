import type { Config } from 'tailwindcss';

// GasKya theme — "the calm before the test". Mirrors
// design-system/projects/gaskya/preview/_foundation.css and
// packages/ui/src/theme/index.ts. Components mostly consume CSS vars from
// @gaskya/ui/styles.css; these utilities exist for app-level convenience.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#f6f1ec', 2: '#efe8e0' },
        sheet: '#ffffff',
        ink: { DEFAULT: '#2c2620', 2: '#4a4338', 3: '#7c7264', 4: '#a89e90' },
        hair: { DEFAULT: '#e3dacf', 2: '#ebe3d8' },
        accent: {
          DEFAULT: '#5a2a4d',
          deep: '#421e39',
          press: '#2b1326',
          soft: '#f3ebf1',
          edge: '#dfcbda',
          mid: '#8a4f7c',
        },
        crit: { DEFAULT: '#a1281e', soft: '#fbeeec', edge: '#e6c2bd' },
        warn: { DEFAULT: '#9a6612', soft: '#fbf3e2', edge: '#e8d6a8' },
        good: { DEFAULT: '#4e6b4f', soft: '#ecf1ea', edge: '#cbdac6' },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        input: '14px',
        card: '18px',
        lg: '22px',
      },
      boxShadow: {
        // the physical key-press: a hard coloured edge, no blur
        key: '0 3px 0 0 var(--ac-deep)',
        'key-hover': '0 4px 0 0 var(--ac-deep)',
      },
    },
  },
  plugins: [],
} satisfies Config;
