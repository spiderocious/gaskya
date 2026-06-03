import { ROUTES } from './routes.ts';

export type NavGroup = 'Foundation' | 'Primitives' | 'Data & state' | 'Overlays & system';

export const NAV_GROUPS: NavGroup[] = [
  'Foundation',
  'Primitives',
  'Data & state',
  'Overlays & system',
];

export interface NavItem {
  label: string;
  route: string;
  group: NavGroup;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Palette', route: ROUTES.PALETTE, group: 'Foundation' },
  { label: 'Type', route: ROUTES.TYPE, group: 'Foundation' },
  { label: 'Geometry', route: ROUTES.GEOMETRY, group: 'Foundation' },
  { label: 'Motion', route: ROUTES.MOTION, group: 'Foundation' },

  { label: 'Buttons', route: ROUTES.BUTTONS, group: 'Primitives' },
  { label: 'Inputs', route: ROUTES.INPUTS, group: 'Primitives' },
  { label: 'Selection', route: ROUTES.SELECTION, group: 'Primitives' },
  { label: 'More inputs', route: ROUTES.MORE_INPUTS, group: 'Primitives' },
  { label: 'Date & time', route: ROUTES.DATETIME, group: 'Primitives' },

  { label: 'Tables', route: ROUTES.TABLES, group: 'Data & state' },
  { label: 'Questions', route: ROUTES.QUESTIONS, group: 'Data & state' },
  { label: 'Answer review', route: ROUTES.ANSWER_REVIEW, group: 'Data & state' },
  { label: 'Media players', route: ROUTES.MEDIA, group: 'Data & state' },
  { label: 'Charts', route: ROUTES.CHARTS, group: 'Data & state' },
  { label: 'Progress', route: ROUTES.PROGRESS, group: 'Data & state' },
  { label: 'Skeletons & empty', route: ROUTES.SKELETONS, group: 'Data & state' },
  { label: 'Avatars & pills', route: ROUTES.AVATARS, group: 'Data & state' },
  { label: 'Cards', route: ROUTES.CARDS, group: 'Data & state' },
  { label: 'Tooltips', route: ROUTES.TOOLTIPS, group: 'Data & state' },

  { label: 'Modals', route: ROUTES.MODALS, group: 'Overlays & system' },
  { label: 'Feedback', route: ROUTES.FEEDBACK, group: 'Overlays & system' },
  { label: 'Drawer service', route: ROUTES.DRAWER, group: 'Overlays & system' },
];
