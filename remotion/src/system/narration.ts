/**
 * Narration-driven timeline.
 *
 * Each video ships a narration JSON (scripts/<...>/<id>.<lang>.narration.json):
 *   { id, language, lines: [{id, text, beat}], cta, ... }
 * scripts/tts.mjs turns it into:
 *   - public/voice/<id>/<lang>/<lineId>.wav   (one TTS clip per line)
 *   - src/generated/timings/<id>/<lang>.json   (per-line start/duration in frames)
 *
 * Compositions import their timing JSON statically and drive visuals, subtitles
 * and audio from it — so everything stays in sync with the rendered voice.
 */
import {staticFile} from 'remotion';

export interface NarrationLine {
  id: string;
  text: string;
  beat?: string;
}

export interface Narration {
  id: string;
  language: 'en' | 'de';
  concept?: string;
  cluster?: string;
  hook?: string;
  cta?: string;
  thumbnail?: string;
  caption?: string;
  lines: NarrationLine[];
}

export interface LineTiming {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number; // exclusive
  durationFrames: number;
  gapBefore: number;
}

export interface Timing {
  id: string;
  language: 'en' | 'de';
  fps: number;
  gapFrames: number;
  lines: LineTiming[];
  totalFrames: number;
  voiceSeconds: number;
}

export const voiceSrc = (id: string, language: 'en' | 'de', lineId: string) =>
  staticFile(`voice/${id}/${language}/${lineId}.wav`);

/** Absolute frame -> line currently spoken. Undefined between lines. */
export const lineAt = (t: Timing, frame: number): LineTiming | undefined =>
  t.lines.find((l) => frame >= l.startFrame && frame < l.endFrame);

/** Progress 0..1 inside a line. */
export const lineProgress = (
  t: Timing,
  lineId: string,
  frame: number
): number => {
  const l = t.lines.find((x) => x.id === lineId);
  if (!l) return 0;
  return Math.max(0, Math.min(1, (frame - l.startFrame) / Math.max(1, l.durationFrames)));
};
