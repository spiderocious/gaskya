// Design tokens — the single source of truth for the GasKya palette.
// Mirrors the Studio foundation at
// design-system/projects/gaskya/preview/_foundation.css (stance: "the calm
// before the test"). Re-theme by editing these values *and* the matching
// entries in each app's tailwind.config.ts + packages/ui/src/styles.css.
//
// One accent only: deep aubergine = "truth / merit / earned". Crimson is
// reserved for the live clock + irreversible actions. Amber = everyday warn,
// sage = saved / on-track. Warm paper, no pure black.

export const COLORS = {
  // Paper & ink (warm, no pure black)
  paper: '#F6F1EC',
  paper2: '#EFE8E0',
  sheet: '#FFFFFF',
  ink: '#2C2620',
  ink2: '#4A4338',
  ink3: '#7C7264',
  ink4: '#A89E90',
  hair: '#E3DACF',
  hair2: '#EBE3D8',

  // Aubergine — the single accent
  accent: '#5A2A4D',
  accentDeep: '#421E39',
  accentPress: '#2B1326',
  accentSoft: '#F3EBF1',
  accentEdge: '#DFCBDA',
  accentMid: '#8A4F7C',

  // Reserved states
  crit: '#A1281E',
  critSoft: '#FBEEEC',
  critEdge: '#E6C2BD',
  warn: '#9A6612',
  warnSoft: '#FBF3E2',
  warnEdge: '#E8D6A8',
  good: '#4E6B4F',
  goodSoft: '#ECF1EA',
  goodEdge: '#CBDAC6',
} as const;

export type ColorToken = keyof typeof COLORS;

export const FONTS = {
  // Fraunces thinks & coaches; Inter is chrome; JetBrains Mono is the record.
  serif: '"Fraunces", Georgia, "Times New Roman", serif',
  sans: '"Inter", system-ui, -apple-system, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export const RADII = {
  sm: '10px',
  input: '14px',
  card: '18px',
  lg: '22px',
  bub: '999px',
} as const;

// The physical key-press depth — the system's one tactile flourish.
export const KEY_LIFT = '3px';
