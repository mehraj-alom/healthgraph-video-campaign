import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
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
} from '../../system';
import {V, H} from '../../system/layout';

import timingEn from '../../generated/timings/reel-12/en.json';
import timingDe from '../../generated/timings/reel-12/de.json';

const NARRATION_EN = {
  "id": "reel-12",
  "language": "en",
  "concept": "measurements-over-time",
  "cluster": "E",
  "hook": "A health measurement is more useful when you can see it over time.",
  "cta": "Discover HealthGraph.",
  "thumbnail": "One reading, then over time",
  "caption": "One number is a moment. A series is a picture. 67 beats per minute, fingertip, quality fair, 80.3 milliseconds HRV RMSSD: one reading on its own. The baseline builds after four morning readings, and every morning adds one more point. No diagnosis, just your data over time. Discover HealthGraph. #HealthGraph #PulseCheck #HeartRate #HRV #SelfTracking #HealthData #MeasureOverTime #DigitalHealth",
  "lines": [
    {
      "id": "l1",
      "text": "A health measurement is more useful when you can see it over time.",
      "beat": "a fingertip on the sensor; the single number 67 BPM appears, then fades out"
    },
    {
      "id": "l2",
      "text": "One number is a moment. A series is a picture.",
      "beat": "one big number alone on the dark background, then it becomes a dot on a small time axis"
    },
    {
      "id": "l3",
      "text": "Like this: 67 beats per minute, fingertip, quality fair.",
      "beat": "real pulse-measurement screen: 67 BPM, FINGERTIP, Quality Fair, 60 seconds"
    },
    {
      "id": "l4",
      "text": "The same screen shows one more value: 80.3 milliseconds, HRV RMSSD.",
      "beat": "focus pulls to the second value block: 80.3 MS, HRV RMSSD"
    },
    {
      "id": "l5",
      "text": "One reading tells you little on its own.",
      "beat": "the number dims again; emphasis shifts to the series, not the single point"
    },
    {
      "id": "l6",
      "text": "The screen says: the baseline builds after four morning readings.",
      "beat": "the line Baseline builds after 4 morning readings is highlighted on the pulse-measurement screen"
    },
    {
      "id": "l7",
      "text": "Every morning adds one more point to the same line.",
      "beat": "a reproduced time-axis chart: one new dot lands per morning, generic labels only"
    },
    {
      "id": "l8",
      "text": "Same data. Now it has direction.",
      "beat": "the dots connect into a calm dotted line across the chart"
    },
    {
      "id": "l9",
      "text": "No diagnosis. Just your data over time.",
      "beat": "camera holds on the finished line; no labels other than the real values"
    },
    {
      "id": "l10",
      "text": "Discover HealthGraph.",
      "beat": "end card on warm charcoal, the dotted line motif behind the CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-12",
  "language": "de",
  "concept": "measurements-over-time",
  "cluster": "E",
  "hook": "Der Verlauf macht die Messung nützlicher.",
  "cta": "Entdecke HealthGraph.",
  "thumbnail": "Eine Messung, gesehen über Zeit",
  "caption": "Eine Zahl ist ein Moment. Eine Reihe ist ein Bild. 67 Herzschläge pro Minute, am Finger, Qualität befriedigend, 80,3 Millisekunden HRV RMSSD: eine einzelne Messung. Die Basis entsteht nach vier Morgenmessungen, und jeden Morgen kommt ein weiterer Punkt dazu. Keine Diagnose, einfach deine Daten über die Zeit. #HealthGraph #Gesundheit #Pulsmessung #Herzfrequenz #HRV #SelfTracking #Gesundheitsdaten #Messwerte\nEntdecke HealthGraph.",
  "lines": [
    {
      "id": "l1",
      "text": "Der Verlauf macht die Messung nützlicher.",
      "beat": "ein Finger auf dem Sensor; die Einzelzahl 67 BPM erscheint und blendet aus"
    },
    {
      "id": "l2",
      "text": "Eine Zahl ist ein Moment. Eine Reihe ist ein Bild.",
      "beat": "eine große Zahl allein auf dunklem Grund, ohne Kontext; sie wird zu einem Punkt auf einer kleinen Zeitachse"
    },
    {
      "id": "l3",
      "text": "Zum Beispiel: 67 Herzschläge pro Minute, am Finger, Qualität befriedigend.",
      "beat": "echter pulse-measurement-Screen: 67 BPM, FINGERTIP, Quality Fair, 60 Sekunden"
    },
    {
      "id": "l4",
      "text": "Dasselbe Bild zeigt einen weiteren Wert: 80,3 Millisekunden, HRV RMSSD.",
      "beat": "der Fokus rutscht zum zweiten Wertblock: 80,3 MS, HRV RMSSD"
    },
    {
      "id": "l5",
      "text": "Eine einzelne Messung sagt allein wenig.",
      "beat": "die Zahl dimmt erneut; der Schwerpunkt liegt auf der Reihe, nicht auf dem Einzelpunkt"
    },
    {
      "id": "l6",
      "text": "Das Bild sagt: Die Basis entsteht nach vier Morgenmessungen.",
      "beat": "die Zeile Baseline builds after 4 morning readings wird im pulse-measurement-Screen hervorgehoben"
    },
    {
      "id": "l7",
      "text": "Jeden Morgen ein weiterer Punkt auf derselben Linie.",
      "beat": "nachgebautes Zeitachsen-Diagramm: jeden Morgen landet ein neuer Punkt, nur generische Beschriftungen"
    },
    {
      "id": "l8",
      "text": "Derselbe Datenbestand. Jetzt mit Verlauf.",
      "beat": "die Punkte verbinden sich zu einer ruhigen gestrichelten Linie über dem Diagramm"
    },
    {
      "id": "l9",
      "text": "Keine Diagnose. Einfach deine Daten über die Zeit.",
      "beat": "die Kamera hält auf der fertigen Linie; keine Beschriftungen außer den echten Werten"
    },
    {
      "id": "l10",
      "text": "Entdecke HealthGraph.",
      "beat": "Endkarte auf warmem Anthrazit, gestricheltes Linien-Motiv hinter dem CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Move. Measure. Learn." : "Bewegen. Messen. Lernen.";
const screenshots = ["movement.jpg"];

const Reel12 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-12" timing={t} />
      <Subtitles timing={t} />
      <VisualSequence frame={frame} timing={t} lines={lines} lang={lang} lineIndex={lineIndex} screenshots={screenshots} />
      {frame >= t.totalFrames - 90 && (
        <CTA start={t.totalFrames - 90} line={cta(lang)} />
      )}
    </AbsoluteFill>
  );
};

const VisualSequence = ({frame, timing, lines, lang, lineIndex, screenshots}: {
  frame: number;
  timing: Timing;
  lines: NarrationLine[];
  lang: 'en' | 'de';
  lineIndex: number;
  screenshots: string[];
}) => {
  if (lineIndex >= 0 && lineIndex <= 1) {
    return (
      <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
        <ParticleField seed={7} amount={0.7} />
        {FRAGMENTS_9.map((f, i) => (
          <Fragment
            key={i}
            spec={f}
            containerW={1080}
            containerH={1400}
            start={lineIndex === 0 ? 0 : 15 + i * 2}
            converge={interpolate(frame, [15, 45], [0, 0.6], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
            convergeTo={{x: 0.5, y: 0.5}}
          />
        ))}
        <div style={{position: 'absolute', top: 540, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
          <Overline text="Movement Patterns" start={5} />
        </div>
      </AbsoluteFill>
    );
  }

  if (lineIndex >= 2 && lineIndex <= 4 && screenshots[0]) {
    return (
      <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <PhoneMockup
          screenshot={screenshots[0]}
          start={lineIndex === 2 ? 0 : 10}
          scaleFrom={90}
          scaleTo={104}
          pushFrames={40}
          rotateY={4}
          focus={{x: 100, y: 560, w: 560, h: 320}}
        />
        {lineIndex === 2 && <DailyReportPage start={20} width={520} />}
      </AbsoluteFill>
    );
  }

  if (lineIndex >= 5 && lineIndex <= 6) {
    return (
      <GraphNetwork start={lineIndex === 5 ? 0 : 10} travelF={60} highlight={lineIndex - 5} />
    );
  }

  if (lineIndex === 7) {
    return (
      <AbsoluteFill style={{backgroundColor: theme.bg, padding: 80, boxSizing: 'border-box'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 60, height: '100%', justifyContent: 'center'}}>
          <VoiceWave start={0} energy={0.7} size={300} />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Timeline
              start={10}
              width={940}
              events={[
                {label: 'Aug 28', t: 0.05, color: theme.cat.nutrition, day: 0},
                {label: 'Sep 12', t: 0.35, color: theme.cat.sleep, day: 3},
                {label: 'Oct 2', t: 0.65, color: theme.cat.heart, day: 6},
                {label: 'Oct 3', t: 0.95, color: theme.green, day: 7},
              ]}
              highlight={3}
            />
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  if (lineIndex >= 8) {
    return (
      <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40}}>
        <HealthGraphLogo start={0} size={120} />
        <Overline text="Movement Patterns" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel12;
