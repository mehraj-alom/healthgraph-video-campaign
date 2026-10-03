/**
 * Campaign motion language. One active protagonist per scene; restrained,
 * precise.
 */
import {Easing} from 'remotion';

/** App "premium glide" — slow settle, no bounce. Default for screen/UI movement. */
export const easeGlide = Easing.bezier(0.22, 1, 0.36, 1);
/** App easeOutQuart — entrances. */
export const easeOutQuart = Easing.bezier(0.25, 1, 0.45, 1);
/** App easeInCubic — exits. */
export const easeInCubic = Easing.bezier(0.45, 0, 0.7, 0.2);
/** Travel between states. */
export const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1);
/** Dial / measurement settle. */
export const easeDial = Easing.bezier(0.33, 1, 0.68, 1);
/** Hard data snap. */
export const easeSnap = Easing.bezier(0.16, 1, 0.3, 1);

/**
 * Scene standard durations (frames @30fps) derived from app animation tokens.
 * fast 150ms, standard 250ms, emphasized 350ms, slow 500ms.
 */
export const DUR = {
  micro: 5,
  fast: 9,
  standard: 15,
  emphasized: 21,
  slow: 30,
  sceneEnter: 24,
  sceneMove: 45,
  sceneHoldMin: 30,
} as const;
