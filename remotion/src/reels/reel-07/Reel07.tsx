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

import timingEn from '../../generated/timings/reel-07/en.json';
import timingDe from '../../generated/timings/reel-07/de.json';

const NARRATION_EN = {
  "id": "reel-07",
  "language": "en",
  "concept": "medication-to-history",
  "cluster": "F",
  "hook": "One medication entry isn't your health history.",
  "cta": "Discover HealthGraph.",
  "thumbnail": "One entry. Then a history.",
  "caption": "One dose, logged once, is just a data point. Scheduled, it becomes a running record: the reminder shows up on time, taken or skipped gets logged, every dose lands in your day's history, and the week and month views place it in context. Not a to-do list, a history. #HealthGraph #Medication #HealthHistory #DailyLog #Patterns #HealthData #SelfTracking #Wellness #HealthApp #PersonalRecords\nDiscover HealthGraph.",
  "lines": [
    {
      "id": "l1",
      "text": "One medication entry isn't your health history.",
      "beat": "home-dashboard: the real Medication card, Add one to star, sits alone with lots of empty space, single-entry feel"
    },
    {
      "id": "l2",
      "text": "One dose, logged once, says very little by itself.",
      "beat": "Slow push-in on the medication card; one logged dose, the rest of the screen quiet"
    },
    {
      "id": "l3",
      "text": "Scheduled, it repeats on the same days.",
      "beat": "Same medication card gains a scheduled marker, motif: a quiet recurring calendar dot, no new invented values"
    },
    {
      "id": "l4",
      "text": "The reminder shows up exactly when it's due.",
      "beat": "The medication card pulses with the restrained red voice-pulse motif at the due moment"
    },
    {
      "id": "l5",
      "text": "Taken or skipped, either way gets logged.",
      "beat": "The medication card toggles between the taken state and the not taken state, both recorded"
    },
    {
      "id": "l6",
      "text": "Each dose becomes an event in your day.",
      "beat": "The recorded dose slides into the daily-log Recent history row, joining the pattern of 3 events"
    },
    {
      "id": "l7",
      "text": "Then the week and month views place it in context.",
      "beat": "home-dashboard: Your patterns, the Week and Month tabs switch, real pattern chart Sleep duration 420min steady as the context chart"
    },
    {
      "id": "l8",
      "text": "Not a to-do list. A running record.",
      "beat": "Side by side: the medication card and the patterns charts, one entry shown inside its surroundings"
    },
    {
      "id": "l9",
      "text": "That's how one entry becomes a history.",
      "beat": "Pull back to the full home dashboard: card and patterns together, the single dose now in context"
    },
    {
      "id": "l10",
      "text": "Discover HealthGraph.",
      "beat": "End card: CTA over the dimmed home dashboard, voice FAB idle at the bottom"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-07",
  "language": "de",
  "concept": "medication-to-history",
  "cluster": "F",
  "hook": "Ein einzelner Medikamenteneintrag ist noch kein Verlauf.",
  "cta": "Entdecke HealthGraph.",
  "thumbnail": "Aus einem Eintrag ein Verlauf",
  "caption": "Eine Dosis, einmal notiert, ist nur ein Eintrag. Geplant wird daraus ein fortlaufender Verlauf: die Erinnerung kommt pünktlich, eingenommen oder ausgelassen wird festgehalten, jede Einnahme wird zu einem Ereignis im Tagesverlauf, und die Wochen- und Monatsansichten ordnen sie ein. Keine Aufgabenliste, sondern ein Verlauf. #HealthGraph #Medikamente #Gesundheitsverlauf #Tagesbericht #Wohlbefinden #DeineDaten #Selbsterkenntnis #DigitalGesund #Vorbeugung #Gesundheits-App\nEntdecke HealthGraph.",
  "lines": [
    {
      "id": "l1",
      "text": "Ein einzelner Medikamenteneintrag ist noch kein Verlauf.",
      "beat": "home-dashboard: Die echte Medikamenten-Karte, Add one to star, liegt allein mitten im Bild, bewusst viel Leerraum"
    },
    {
      "id": "l2",
      "text": "Eine Dosis, einmal notiert, sagt für sich wenig.",
      "beat": "Sanfter Zoom auf die Medikamenten-Karte; eine eingenommene Dosis, der Rest des Screens ruhig"
    },
    {
      "id": "l3",
      "text": "Geplant wiederholt er sich an den gleichen Tagen.",
      "beat": "Dasselbe Medikamenten-Karte erhält einen Termin-Marker, Motiv: ein ruhiges wiederkehrendes Kalender-Pünktchen, keine erfundenen Werte"
    },
    {
      "id": "l4",
      "text": "Die Erinnerung kommt genau dann, wenn die Einnahme fällig ist.",
      "beat": "Die Medikamenten-Karte pulsiert im fälligen Moment dezent mit dem roten Voice-Puls-Motiv"
    },
    {
      "id": "l5",
      "text": "Ob eingenommen oder ausgelassen, beides wird festgehalten.",
      "beat": "Die Medikamenten-Karte schaltet zwischen dem Eingenommen-Zustand und dem Ausgelassen-Zustand, beide werden erfasst"
    },
    {
      "id": "l6",
      "text": "Jede Einnahme wird zu einem Ereignis in deinem Tag.",
      "beat": "Die erfasste Dosis rutscht in die Zeile Recent history des daily-log, passend zum Muster der 3 events"
    },
    {
      "id": "l7",
      "text": "Dann ordnen die Wochen- und Monatsansichten sie in den Verlauf ein.",
      "beat": "home-dashboard: Your patterns, Tabs Week und Month wechseln, echte Mustergrafik Sleep duration 420min steady als Kontextgrafik"
    },
    {
      "id": "l8",
      "text": "Keine Aufgabenliste, sondern ein fortlaufender Verlauf.",
      "beat": "Nebeneinander: Medikamenten-Karte und Mustergrafiken, ein einzelner Eintrag zeigt sich in seiner Umgebung"
    },
    {
      "id": "l9",
      "text": "So wird aus einem Eintrag ein Verlauf.",
      "beat": "Zurückzoomen auf das komplette home-dashboard: Karte und Muster zusammen, die einzelne Dosis nun im Kontext"
    },
    {
      "id": "l10",
      "text": "Entdecke HealthGraph.",
      "beat": "Endkarte: CTA über dem gedämpften home-dashboard, Voice-Knopf unten in Ruhe"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Speak. It logs." : "Sprechen. Es loggt.";
const screenshots = ["voice-button.jpg"];

const Reel07 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-07" timing={t} />
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
          <Overline text="Voice into the Graph" start={5} />
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
        <Overline text="Voice into the Graph" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel07;
