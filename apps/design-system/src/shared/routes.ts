// Route table for the GasKya design-system viewer. Numbers mirror the Studio
// specimen order (design-system/projects/gaskya/preview/).
export const ROUTES = {
  PALETTE: '/01-palette',
  TYPE: '/02-type',
  GEOMETRY: '/03-geometry',
  MOTION: '/04-motion',
  BUTTONS: '/10-buttons',
  INPUTS: '/11-inputs',
  SELECTION: '/12-selection',
  MORE_INPUTS: '/15-inputs-more',
  DATETIME: '/13-datetime',
  TABLES: '/20-tables',
  QUESTIONS: '/21-questions',
  FIGURE_QUESTIONS: '/21b-figure-questions',
  QUESTION_BANK: '/21c-question-bank',
  ANSWER_REVIEW: '/22-answer-review',
  MEDIA: '/23-media',
  CHARTS: '/24-charts',
  PROGRESS: '/25-progress',
  SKELETONS: '/26-skeletons',
  AVATARS: '/27-avatars',
  CARDS: '/28-cards',
  TOOLTIPS: '/29-tooltips',
  NAVIGATION: '/29b-navigation',
  MODALS: '/40-modals',
  FEEDBACK: '/41-feedback',
  DRAWER: '/drawer',
} as const;

export type RouteKey = keyof typeof ROUTES;
