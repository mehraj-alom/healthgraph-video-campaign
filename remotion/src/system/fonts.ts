import {loadFont} from '@remotion/google-fonts/Archivo';
import {loadFont as loadMono} from '@remotion/google-fonts/RobotoMono';
import React from 'react';
import {continueRender, delayRender} from 'remotion';

// Module-scope loadFont() injects @font-face immediately; the returned
// promises resolve when the browser has the font ready.
const {waitUntilDone: waitArchivo} = loadFont('normal', {
  weights: ['300', '400', '500', '600', '700', '800', '900'],
});
const {waitUntilDone: waitMono} = loadMono('normal', {
  weights: ['400', '500', '700'],
});

const fontsReady = Promise.all([waitArchivo(), waitMono()]);

let started = false;

/**
 * Mount inside every composition to block frame rendering until campaign
 * fonts are available (deterministic, idempotent).
 */
export const FontGate: React.FC = () => {
  if (!started) {
    started = true;
    const handle = delayRender('campaign fonts');
    fontsReady
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }
  return null;
};

/** Kept for scripts/tests. */
export const loadCampaignFonts = () => fontsReady;

export const FONT = {
  display: 'Archivo, sans-serif',
  mono: '"Roboto Mono", monospace',
} as const;

export const weight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
  black: 900,
} as const;
