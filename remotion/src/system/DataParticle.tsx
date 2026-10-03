/**
 * <DataParticle> / <ParticleField> — subtle deterministic particle drift
 * used for depth in dark scenes. Canvas-based, seed-driven, cheap.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {theme} from './theme';

export interface ParticleFieldProps {
  seed: number;
  count?: number;
  /** 0..1 density/opacity */
  amount?: number;
  color?: string;
  speed?: number;
  /** vertical drift direction (-1 up, 1 down) */
  drift?: number;
}

const hash = (i: number, seed: number) => {
  let h = (i * 374761393 + seed * 668265263) >>> 0;
  h = (h ^ (h >> 13)) * 1274126177 >>> 0;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
};

export const ParticleField: React.FC<ParticleFieldProps> = ({
  seed,
  count = 42,
  amount = 1,
  color = theme.greenBright,
  speed = 1,
  drift = -1,
}) => {
  const frame = useCurrentFrame();
  const W = 1080;
  const H = 1920;
  const canvas = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < count; i++) {
      const bx = hash(i, seed) * W;
      const by = hash(i + 7, seed) * H;
      const size = 1.4 + hash(i + 13, seed) * 2.8;
      const y = (by + frame * speed * 2.2 * drift) % H;
      const yy = y < 0 ? y + H : y;
      const tw = 0.5 + 0.5 * Math.sin(frame * 0.05 + i * 1.7);
      const a = amount * (0.16 + 0.3 * tw) * (0.4 + 0.6 * hash(i + 31, seed));
      ctx.beginPath();
      ctx.arc(bx + Math.sin(frame * 0.02 + i) * 10, yy, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = a;
      ctx.fill();
    }
  });
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <canvas
        ref={canvas}
        width={W}
        height={H}
        style={{position: 'absolute', inset: 0}}
      />
    </AbsoluteFill>
  );
};
