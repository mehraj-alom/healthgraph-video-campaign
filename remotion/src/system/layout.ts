/**
 * Frame layout + safe areas. All coordinates in the composition's pixel space.
 */

export const FPS = 30;

export const V = {
  width: 1080,
  height: 1920,
  /** Instagram UI overlays: top ~120, bottom ~260. Keep key content inside. */
  topSafe: 140,
  bottomSafe: 280,
  /** Subtitle block lives here: y from 1440 to 1660, never above critical UI. */
  subTop: 1440,
  subBottom: 1660,
  /** Thumb / focus zone for 9:16 content card: center 300..1500 */
  contentTop: 300,
  contentBottom: 1500,
} as const;

export const H = {
  width: 1920,
  height: 1080,
  topSafe: 110,
  bottomSafe: 110,
  leftSafe: 120,
  rightSafe: 120,
} as const;

/** Vertical margin helper for reel scenes. */
export const vCenter = (h: number) => (V.height - h) / 2;
