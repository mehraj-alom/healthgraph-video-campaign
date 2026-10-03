/**
 * <PhoneMockup> — premium phone frame presenting a real HealthGraph
 * screenshot. Supports:
 *  - enter (scale+fade), camera push-in (zoom), perspective rotation,
 *  - parallax on the screen content (screenY), section focus (focus rect),
 *  - status-bar crop.
 * Screenshots are 720x1600; scaled to the frame height inside the bezel.
 */
import React from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeGlide, easeOutQuart} from './easing';
import {theme} from './theme';

export interface PhoneMockupProps {
  /** image id from public/images, e.g. "daily-report.jpg" */
  screenshot: string;
  /** frame the phone becomes fully visible */
  start: number;
  /** exit frame (fade out) */
  end?: number;
  /** 1000 = native; >1000 = push in over time */
  scaleFrom?: number;
  scaleTo?: number;
  /** frames for the push */
  pushFrames?: number;
  rotateX?: number; // deg
  rotateY?: number; // deg
  /** parallax: shift screen content vertically (px at native scale) */
  parallaxY?: number;
  /** optional highlight rect in screenshot coords (0..720 x 0..1600) */
  focus?: {x: number; y: number; w: number; h: number};
  /** crop the top status bar */
  cropStatusBar?: boolean;
  opacity?: number;
  centerX?: number;
  widthFactor?: number; // 0..1 of frame width
}

const SHOT_W = 720;
const SHOT_H = 1600;
const STATUS_H = 64;

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  screenshot,
  start,
  end,
  scaleFrom = 88,
  scaleTo = 100,
  pushFrames = 60,
  rotateX = 0,
  rotateY = 0,
  parallaxY = 0,
  focus,
  cropStatusBar = true,
  opacity = 1,
  centerX = 540,
  widthFactor = 0.78,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [start, start + 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeGlide,
  });
  const exit = end
    ? interpolate(frame, [end, end + 18], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;
  const scale = interpolate(frame, [start, start + pushFrames], [scaleFrom, scaleTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutQuart,
  }) / 100;
  const W = 1080 * widthFactor;
  const H = (W / SHOT_W) * SHOT_H;
  const statusCrop = cropStatusBar ? STATUS_H : 0;
  const innerH = H - 48; // bezel padding
  const shotScale = innerH / (SHOT_H - statusCrop);
  const focusScale = shotScale;

  return (
    <AbsoluteFill style={{opacity: enter * exit * opacity}}>
      <div
        style={{
          position: 'absolute',
          left: centerX,
          top: 960,
          transform: `translate(-50%,-50%) perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        }}
      >
        {/* frame */}
        <div
          style={{
            width: W + 28,
            height: H + 28,
            borderRadius: 64,
            background: 'linear-gradient(145deg, #2A2F3A, #0C0E13 60%)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            padding: 14,
          }}
        >
          <div
            style={{
              width: W,
              height: innerH,
              borderRadius: 48,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: theme.bg,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: SHOT_H,
                transform: `translateY(${-statusCrop * shotScale + parallaxY * shotScale}px)`,
              }}
            >
              <img
                src={staticFile(`images/${screenshot}`)}
                alt="HealthGraph screen"
                style={{
                  width: W,
                  height: SHOT_H,
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                }}
              />
            </div>
            {/* subtle top light */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0) 18%)',
                pointerEvents: 'none',
              }}
            />
            {/* focus highlight */}
            {focus && (
              <FocusRect
                x={focus.x}
                y={focus.y - statusCrop}
                w={focus.w}
                h={focus.h}
                scale={focusScale}
                start={start + 24}
              />
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FocusRect: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  scale: number;
  start: number;
}> = ({x, y, w, h, scale, start}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeGlide,
  });
  const pulse = 0.6 + 0.4 * Math.sin((frame - start) * 0.12);
  return (
    <div
      style={{
        position: 'absolute',
        left: x * scale,
        top: y * scale,
        width: w * scale,
        height: h * scale,
        borderRadius: 18 * scale,
        border: `${2 * scale}px solid ${theme.greenBright}`,
        boxShadow: `0 0 ${26 * pulse}px ${theme.glowGreen}, inset 0 0 ${
          20 * pulse
        }px ${theme.glowGreen}`,
        opacity: p,
      }}
    />
  );
};
