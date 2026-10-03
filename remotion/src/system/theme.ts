/**
 * Campaign theme — extracted from the real HealthGraph app (frontend/src/theme/tokens.ts)
 * plus the dark UI visible in the provided screenshots. Single source of truth for color.
 */
export const theme = {
  // Dark campaign surface (matches screenshot dark navy)
  bg: '#0B0F16',
  bgDeep: '#070A10',
  surface: '#141B26',
  card: '#1A2331',
  cardHi: '#202C3D',
  line: '#26303F',
  lineSoft: '#1E2734',

  text: '#F4EFE6',
  textSecondary: '#A9B4C2',
  textMuted: '#5F6B7A',
  textFaint: '#3A4453',

  // Signals
  green: '#4E9B5F',
  greenBright: '#7FC48D',
  greenDim: '#2F7D5B',
  teal: '#2E8B7A',
  apricot: '#E8862E',
  apricotDim: '#C96A1E',
  apricotSoft: 'rgba(232,134,46,0.14)',
  red: '#E8355B',

  // Category colors (app healthCategories tokens)
  cat: {
    sleep: '#8A7BC8',
    heart: '#C2503E',
    nutrition: '#4E9B5F',
    activity: '#4A90C2',
    wellbeing: '#E8862E',
    medication: '#8A7BC8',
    mood: '#E8A07C',
    hydration: '#4A90C2',
  },

  // Paper (Daily Health Diary)
  paper: '#F5F0E1',
  paperDim: '#EAE3D0',
  paperDeep: '#E2D8C3',
  ink: '#23201A',
  inkSoft: '#6B6353',
  inkFaint: '#8A8172',
  paperHairline: '#D8CFBA',
  paperGreen: '#2F7D5B',

  // Light cream app context
  cream: '#EAE4D6',
  creamSurface: '#FFFBF3',

  // Gradients / glows
  glowGreen: 'rgba(78,155,95,0.24)',
  glowApricot: 'rgba(232,134,46,0.20)',
  glowRed: 'rgba(232,53,91,0.22)',
  vignette: 'rgba(4,6,10,0.55)',
} as const;

export type Theme = typeof theme;
