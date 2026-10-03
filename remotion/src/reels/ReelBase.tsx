import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {
  CampaignAudio,
  Subtitles,
  KineticHeadline,
  Overline,
  HealthGraphLogo,
  CTA,
  PhoneMockup,
  DailyReportPage,
  Fragment,
  ParticleField,
  MeasurementDial,
  Timeline,
  VoiceWave,
  GraphNetwork,
  theme,
  FRAGMENTS_9,
  type Timing,
  type NarrationLine,
  lineAt,
} from '../system';
import {H} from '../system/layout';

export interface ReelBaseProps {
  id: string;
  lang: 'en' | 'de';
  timing: Timing;
  narrationLines: NarrationLine[];
  concept: string;
  cluster: string;
  cta: string;
  thumbnailText?: string;
  screenshots: string[];
  visuals: React.ReactElement;
}

export const ReelBase: React.FC<ReelBaseProps> = ({
  id,
  lang,
  timing,
  narrationLines,
  concept,
  cluster,
  cta,
  thumbnailText,
  screenshots,
  visuals,
}) => {
  const frame = useCurrentFrame();
  const currentLine = lineAt(timing, frame);

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id={id} timing={timing} />
      <Subtitles timing={timing} />
      {visuals}
      {frame >= timing.totalFrames - 90 && (
        <CTA start={timing.totalFrames - 90} line={cta} />
      )}
    </AbsoluteFill>
  );
};

export const ThumbnailBase: React.FC<{
  id: string;
  lang: 'en' | 'de';
  concept: string;
  thumbnailText?: string;
  screenshot?: string;
}> = ({id, lang, concept, thumbnailText, screenshot}) => (
  <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: H.leftSafe * 2, boxSizing: 'border-box'}}>
    {screenshot && (
      <PhoneMockup
        screenshot={screenshot}
        start={0}
        scaleFrom={100}
        scaleTo={100}
        pushFrames={0}
        rotateY={0}
      />
    )}
    {!screenshot && (
      <ParticleField seed={7} amount={0.6} />
    )}
    <div style={{textAlign: 'center', zIndex: 10, maxWidth: '90%'}}>
      <Overline text={concept} start={0} />
      <KineticHeadline
        text={thumbnailText || concept}
        start={15}
        duration={60}
        size={72}
        accentWord={thumbnailText ? 2 : 1}
      />
      <HealthGraphLogo start={40} size={64} />
    </div>
  </AbsoluteFill>
);