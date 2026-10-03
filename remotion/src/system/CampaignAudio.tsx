/**
 * <CampaignAudio> — full audio stack for one video:
 *  - score bed (public/audio/<id>-<lang>.wav) under everything, ducked while
 *    narration is spoken
 *  - one <Audio> per narration line, positioned by its timing file
 * Usage: <CampaignAudio id="reel-01" timing={timing} />
 * SFX are placed separately by composers:
 *   <Audio src={staticFile('sfx/ping.wav')} startFrom={f} volume={0.5} />
 */
import React from 'react';
import {Audio, interpolate, staticFile} from 'remotion';
import {Timing, voiceSrc} from './narration';

export interface CampaignAudioProps {
  id: string;
  timing: Timing;
  /** score bed volume (voice = 1.0) */
  scoreVolume?: number;
  voiceVolume?: number;
}

const duckAmount = (
  timing: Timing,
  f: number
): number => {
  let d = 0;
  for (const l of timing.lines) {
    const a = interpolate(f, [l.startFrame - 18, l.startFrame + 4], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const b = interpolate(
      f,
      [l.endFrame, l.endFrame + 30],
      [1, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
    );
    d = Math.max(d, Math.min(a, b));
  }
  return d;
};

export const CampaignAudio: React.FC<CampaignAudioProps> = ({
  id,
  timing,
  scoreVolume = 0.5,
  voiceVolume = 1,
}) => {
  const score = staticFile(`audio/${id}-${timing.language}.wav`);
  return (
    <>
      <Audio
        src={score}
        volume={(f) => scoreVolume * (1 - 0.45 * duckAmount(timing, f))}
      />
      {timing.lines.map((l) => (
        <Audio
          key={l.id}
          src={voiceSrc(id, timing.language, l.id)}
          startFrom={l.startFrame}
          volume={voiceVolume}
        />
      ))}
    </>
  );
};
