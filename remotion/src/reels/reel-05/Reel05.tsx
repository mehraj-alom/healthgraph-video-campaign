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

import timingEn from '../../generated/timings/reel-05/en.json';
import timingDe from '../../generated/timings/reel-05/de.json';

const NARRATION_EN = {
  "id": "reel-05",
  "language": "en",
  "concept": "daily-health-diary",
  "cluster": "C",
  "hook": "Your health history has dates. Why shouldn't you see it like a story?",
  "cta": "Explore the health diary.",
  "thumbnail": "Your health as a story",
  "caption": "Your health history is full of dates. In the daily health diary, each date becomes a paper report you can flip through, open and read in full: pulse 59 BPM at 5:14 PM, fingertip 61 BPM, six logs one tap away. A physical archive of days, not a list of cards. #HealthGraph #HealthDiary #DailyReport #HealthHistory #SelfTracking #Wellness #HealthData #Longitudinal #PersonalData #MindfulHealth\nExplore the health diary.",
  "lines": [
    {
      "id": "l1",
      "text": "Your health history has dates. Why shouldn't you see it like a story?",
      "beat": "Establish the physical archive: a stack of cream paper daily reports (daily-report card style) rises in depth, explicitly a paper archive, not a card list"
    },
    {
      "id": "l2",
      "text": "Each day becomes its own paper report in your daily health diary.",
      "beat": "Cut to the stack: many cream paper pages, each with a date spine on its edge, warm paper texture"
    },
    {
      "id": "l3",
      "text": "Not a folder of files, but a stack you can flip through.",
      "beat": "Stack continues on screen: paper reports, physically stacked with depth, deliberately no card list, no app grid"
    },
    {
      "id": "l4",
      "text": "Scroll through the stack.",
      "beat": "Fingers scroll the paper-report stack; pages slide past with soft page turns"
    },
    {
      "id": "l5",
      "text": "Pick any date.",
      "beat": "Stack pauses on the 3 OCT page; the selected paper report lifts out of the stack"
    },
    {
      "id": "l6",
      "text": "The report rises from the stack.",
      "beat": "Selected paper report rises out of the stack toward the camera, other pages settling behind"
    },
    {
      "id": "l7",
      "text": "It opens, and the day shows itself.",
      "beat": "Paper report opens like a page, revealing the real daily-report card: 3 OCT Today, Daily Report, Saturday, October 3; crop the user name"
    },
    {
      "id": "l8",
      "text": "Pulse: 59 beats per minute, fair, at 5:14 PM.",
      "beat": "Open report: focus on the real Pulse 59 BPM Fair 5:14 PM line on the daily-report card"
    },
    {
      "id": "l9",
      "text": "Then the fingertip reading: 61 beats, the same day.",
      "beat": "Focus slides down to the real ALSO Pulse Fingertip 61 BPM Fair line on the same open report"
    },
    {
      "id": "l10",
      "text": "Six logs sit behind it, one tap away.",
      "beat": "Footer Log ×6, tap to open glints on the daily-report card, then dims back"
    },
    {
      "id": "l11",
      "text": "Every day on its own page, in the right order.",
      "beat": "Pull back to the full paper-report stack: the archive, dates in order, the opened day visible on top"
    },
    {
      "id": "l12",
      "text": "Explore the health diary.",
      "beat": "End card: CTA over the softly focused paper-report stack, warm charcoal background"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-05",
  "language": "de",
  "concept": "daily-health-diary",
  "cluster": "C",
  "hook": "Dein Gesundheitsverlauf hat Daten. Warum nicht wie eine Geschichte lesen?",
  "cta": "Entdecke das Gesundheits-Tagebuch.",
  "thumbnail": "Deine Gesundheit, Seite für Seite",
  "caption": "Dein Gesundheitsverlauf ist voller Daten und Momente. Im täglichen Gesundheits-Tagebuch wird jeder Tag zu einem Bericht, den man blättert, öffnet und in Ruhe liest: Puls 59 Schläge pro Minute um 17:14 Uhr, Fingermesswert 61, sechs Einträge mit einem Antippen erreichbar. Ein physisches Archiv aus Tagen, keine Liste von Karten. #HealthGraph #Gesundheits-Tagebuch #Tagesbericht #Gesundheitsverlauf #Wohlbefinden #Selbsterkenntnis #DeineDaten #DigitalGesund #Vorbeugung #Achtsamkeit\nEntdecke das Gesundheits-Tagebuch.",
  "lines": [
    {
      "id": "l1",
      "text": "Dein Gesundheitsverlauf hat Daten. Warum nicht wie eine Geschichte lesen?",
      "beat": "Physisches Archiv etablieren: Stapel cremefarbener Papier-Tagesberichte hebt sich in der Tiefe, ausdrücklich kein Karten-Liste"
    },
    {
      "id": "l2",
      "text": "Jeder Tag wird ein eigener Bericht im täglichen Gesundheits-Tagebuch.",
      "beat": "Schnitt auf den Berichtsstapel: viele cremefarbene Seiten, jede mit Datums-Grat am Rand, warmes Papiervolumen"
    },
    {
      "id": "l3",
      "text": "Kein Ordner voller Dateien, sondern ein Stapel, den man blättert.",
      "beat": "Stapel bleibt im Bild: Papierberichte, physisch gestapelt mit Tiefe, bewusst keine Kartenliste, keine App-Kacheln"
    },
    {
      "id": "l4",
      "text": "Durch den Stapel blättern.",
      "beat": "Finger blättern durch den Berichtsstapel, Seiten gleiten mit sanftem Blättern vorbei"
    },
    {
      "id": "l5",
      "text": "Einfach ein Datum wählen.",
      "beat": "Stapel bleibt bei der Seite 3 Okt. stehen; der gewählte Papierbericht löst sich aus dem Stapel"
    },
    {
      "id": "l6",
      "text": "Der Bericht hebt sich aus dem Stapel.",
      "beat": "Der gewählte Papierbericht hebt sich aus dem Stapel in Richtung Kamera, die übrigen Seiten setzen sich dahinter ab"
    },
    {
      "id": "l7",
      "text": "Er öffnet sich, und der Tag zeigt sich.",
      "beat": "Bericht öffnet sich wie eine Seite: echte daily-report-Karte, 3 Okt. Heute, Tagesbericht, Samstag, 3. Oktober; Nutzername cropped"
    },
    {
      "id": "l8",
      "text": "Puls: 59 Schläge pro Minute, um 17:14 Uhr.",
      "beat": "Geöffneter Bericht: Fokus auf die echte Zeile Pulse 59 BPM Fair 5:14 PM der daily-report-Karte"
    },
    {
      "id": "l9",
      "text": "Dazu der Fingermesswert: 61 Schläge, noch am selben Tag.",
      "beat": "Fokus gleitet auf die echte Zeile ALSO Pulse Fingertip 61 BPM Fair im selben Bericht"
    },
    {
      "id": "l10",
      "text": "Sechs Einträge liegen dahinter, mit einem Antippen erreichbar.",
      "beat": "Fußzeile Log ×6, tap to open pulsiert auf der daily-report-Karte, dann wieder ruhig"
    },
    {
      "id": "l11",
      "text": "Jeder Tag eine eigene Seite, in der richtigen Reihenfolge.",
      "beat": "Zurückzoomen auf den vollen Berichtsstapel: das Archiv, Daten in Reihenfolge, der geöffnete Tag liegt oben"
    },
    {
      "id": "l12",
      "text": "Entdecke das Gesundheits-Tagebuch.",
      "beat": "Endkarte: CTA über dem weich geblürten Berichtsstapel, warmer Kohle-Farbton"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Real files. Real answers." : "Echte Dateien. Echte Antworten.";
const screenshots = ["documents.jpg"];

const Reel05 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-05" timing={t} />
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
          <Overline text="Documents That Stay Documents" start={5} />
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
        <Overline text="Documents That Stay Documents" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel05;
