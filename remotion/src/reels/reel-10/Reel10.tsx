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

import timingEn from '../../generated/timings/reel-10/en.json';
import timingDe from '../../generated/timings/reel-10/de.json';

const NARRATION_EN = {
  "id": "reel-10",
  "language": "en",
  "concept": "disconnected-apps",
  "cluster": "A",
  "hook": "Your records are connected. Your apps usually aren't.",
  "cta": "Explore HealthGraph.",
  "thumbnail": "Your records finally connect",
  "caption": "Your records reference each other, but the apps holding your data rarely talk to each other. HealthGraph puts your records in one place and shows the connections that were always there: twelve nodes, twenty two connections, one history. Explore HealthGraph. #HealthGraph #HealthRecords #HealthData #DigitalHealth #HealthHistory #SelfTracking #PersonalData #ConnectedHealth",
  "lines": [
    {
      "id": "l1",
      "text": "Your records are connected. Your apps usually aren't.",
      "beat": "split frame: connected document cards with edges on the left, isolated grey app icons on the right"
    },
    {
      "id": "l2",
      "text": "A visit points to a measurement. A medication points to a day.",
      "beat": "a thin edge draws between a VISIT card and a MEASUREMENT card, then between MEDICATION and a day card"
    },
    {
      "id": "l3",
      "text": "But the apps holding your data rarely talk to each other.",
      "beat": "generic app tiles labeled SLEEP, PULSE, NOTES sit apart, grey, without edges"
    },
    {
      "id": "l4",
      "text": "So the picture stays split.",
      "beat": "the split scene dims; the gap between the two clusters stays visible"
    },
    {
      "id": "l5",
      "text": "HealthGraph puts your records in one place.",
      "beat": "real records-upload screen: PDF, PNG, JPG, max 50 MB, teal upload button"
    },
    {
      "id": "l6",
      "text": "Upload a report. Log a pulse. Note a symptom.",
      "beat": "quick montage: records-upload, pulse-measurement result 67 BPM fingertip, daily-log mood Very good"
    },
    {
      "id": "l7",
      "text": "It connects them into one graph.",
      "beat": "the loose objects fly toward one central hub; edges begin to draw around it"
    },
    {
      "id": "l8",
      "text": "The health graph shows connections that were always there.",
      "beat": "full health-graph screen, 12 nodes and 22 connections; camera glides through the graph"
    },
    {
      "id": "l9",
      "text": "One history. Not twenty open tabs.",
      "beat": "the graph pulls back wide; the scattered app tiles fade behind it"
    },
    {
      "id": "l10",
      "text": "Explore HealthGraph.",
      "beat": "end card on warm charcoal, graph motif behind the CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-10",
  "language": "de",
  "concept": "disconnected-apps",
  "cluster": "A",
  "hook": "Deine Unterlagen hängen zusammen. Deine Apps meistens nicht.",
  "cta": "Erlebe HealthGraph.",
  "thumbnail": "Deine Unterlagen, endlich verbunden",
  "caption": "Deine Unterlagen gehören zusammen: Ein Besuch verweist auf eine Messung, ein Medikament auf einen Tag. Aber die Apps, in denen deine Daten liegen, sprechen selten miteinander, so bleibt das Bild zerstückelt. HealthGraph bringt deine Unterlagen an einem Ort zusammen und zeigt die Verbindungen, die schon immer da waren. Kostenlos, DSGVO-konform, ohne Werbung. #HealthGraph #Gesundheit #Gesundheitsunterlagen #Gesundheitsdaten #DigitaleGesundheit #SelfTracking #Gesundheitsverlauf #DeineDaten\nErlebe HealthGraph.",
  "lines": [
    {
      "id": "l1",
      "text": "Deine Unterlagen hängen zusammen. Deine Apps meistens nicht.",
      "beat": "geteilte Bildfläche: links verbundene Dokumentkarten mit Kanten, rechts isolierte graue App-Symbole"
    },
    {
      "id": "l2",
      "text": "Ein Besuch verweist auf eine Messung. Ein Medikament auf einen Tag.",
      "beat": "eine dünne Kante zeichnet sich zwischen einer Visit-Karte und einer Messkarte, dann zwischen Medikament und Tageskarte"
    },
    {
      "id": "l3",
      "text": "Aber die Apps, in denen deine Daten liegen, sprechen selten miteinander.",
      "beat": "generische App-Kacheln mit den Beschriftungen SLEEP, PULSE, NOTES liegen getrennt, grau, ohne Kanten"
    },
    {
      "id": "l4",
      "text": "So bleibt das Gesamtbild zerstückelt.",
      "beat": "die Split-Szene dimmt; der Spalt zwischen den beiden Gruppen bleibt sichtbar"
    },
    {
      "id": "l5",
      "text": "HealthGraph bringt deine Unterlagen an einem Ort zusammen.",
      "beat": "echter records-upload-Screen: PDF, PNG, JPG, max 50 MB, türkiser Upload-Button"
    },
    {
      "id": "l6",
      "text": "Bericht hochladen. Puls messen. Symptom notieren.",
      "beat": "schnelle Montage: records-upload, pulse-measurement-Ergebnis 67 BPM fingertip, daily-log Stimmung Very good"
    },
    {
      "id": "l7",
      "text": "Es verbindet sie in einem Graphen.",
      "beat": "die losen Objekte fliegen zu einem zentralen Hub; Kanten beginnen, sich um ihn zu zeichnen"
    },
    {
      "id": "l8",
      "text": "Der Health Graph zeigt die Verbindungen, die schon immer da waren.",
      "beat": "voller health-graph-Screen, 12 nodes und 22 connections; die Kamera gleitet durch den Graph"
    },
    {
      "id": "l9",
      "text": "Eine Geschichte. Nicht zwanzig offene Fenster.",
      "beat": "der Graph zoomt weit aus; die gestreuten App-Kacheln verblassen hinter ihm"
    },
    {
      "id": "l10",
      "text": "Erlebe HealthGraph.",
      "beat": "Endkarte auf warmem Anthrazit, Graph-Motiv hinter dem CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Never miss. Always know." : "Nie verpassen. Immer wissen.";
const screenshots = ["medications.jpg"];

const Reel10 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-10" timing={t} />
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
          <Overline text="The Medication Timeline" start={5} />
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
        <Overline text="The Medication Timeline" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel10;
