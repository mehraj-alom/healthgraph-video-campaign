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

import timingEn from '../../generated/timings/reel-14/en.json';
import timingDe from '../../generated/timings/reel-14/de.json';

const NARRATION_EN = {
  "id": "reel-14",
  "language": "en",
  "concept": "open-a-day",
  "cluster": "C",
  "hook": "Open a day from your health history.",
  "cta": "Explore the health diary.",
  "thumbnail": "Open a day from the diary",
  "caption": "Your health history kept like an archive of days. Open one, and the whole day unfolds on a single page: pulse readings, mood, sleep, every log where it belongs. Not a list of cards, a place to come back to. Explore the health diary. #HealthDiary #HealthGraph #DailyHealth #HealthJournal #HealthHistory #DailyLog #PulseCheck #Wellness #HealthTracking",
  "lines": [
    {
      "id": "l1",
      "text": "Open a day from your health history.",
      "beat": "a stack of cream paper daily reports sits on a desk-lit surface; light catches the top report's edge"
    },
    {
      "id": "l2",
      "text": "It doesn't look like a list of cards.",
      "beat": "a ghost of a flat card-list UI dissolves into paper texture, establishing the archive, not a card list"
    },
    {
      "id": "l3",
      "text": "It looks like the day itself.",
      "beat": "close-up on the top paper report's edge; '3 OCT Today' catches the light"
    },
    {
      "id": "l4",
      "text": "The paper rises out of the stack.",
      "beat": "HERO: the paper report lifts out of the stack with a slow tilt, floating above the archive"
    },
    {
      "id": "l5",
      "text": "It unfolds slowly, until the day fills the screen.",
      "beat": "the report unfolds, growing until it fills two-thirds of the frame"
    },
    {
      "id": "l6",
      "text": "Saturday, October third: pulse, fifty nine beats per minute, at five fourteen in the afternoon.",
      "beat": "the pulse line fills in on the paper: Pulse 59 BPM · Fair 5:14 PM, in a quiet serif"
    },
    {
      "id": "l7",
      "text": "A second reading, sixty one beats per minute, from the fingertip.",
      "beat": "the second row fills: ALSO Pulse — Fingertip 61 BPM · Fair"
    },
    {
      "id": "l8",
      "text": "Mood of the day: very good. Sleep: seven hours.",
      "beat": "the lower block unfolds: mood 'Very good', sleep 7h, the '3 events' history row"
    },
    {
      "id": "l9",
      "text": "Six logs sit on the same page, tap to open.",
      "beat": "the footer 'Log ×6, tap to open' taps; a small log card lifts up from the page"
    },
    {
      "id": "l10",
      "text": "Every day becomes a page you can come back to.",
      "beat": "camera drifts back over the stack; many days, each one a paper page"
    },
    {
      "id": "l11",
      "text": "Explore the health diary.",
      "beat": "end card: the paper report settled on top of the stack with the CTA beneath"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-14",
  "language": "de",
  "concept": "einen-tag-offnen",
  "cluster": "C",
  "hook": "Öffne einen Tag aus deiner Gesundheitsgeschichte.",
  "cta": "Entdecke das Gesundheitstagebuch.",
  "thumbnail": "Ein Tag aus dem Tagebuch",
  "caption": "Deine Gesundheitsgeschichte wie ein Archiv aus Tagen. Öffne einen, und der ganze Tag faltet sich auf einer Seite auf: Puls, Stimmung, Schlaf, alle Einträge an ihrem Platz. Keine Kartenliste, sondern ein Ort, zu dem du zurückkehrst. Entdecke das Gesundheitstagebuch. #Gesundheitstagebuch #HealthGraph #Tagebuch #Gesundheitsgeschichte #Tageslog #Pulsmessung #Gesundheitsdaten #Wellness #Schlaf",
  "lines": [
    {
      "id": "l1",
      "text": "Öffne einen Tag aus deiner Gesundheitsgeschichte.",
      "beat": "ein Stapel cremefarbener Papiertageberichte liegt auf einer Schreibtischfläche; das Licht trifft die obere Seite"
    },
    {
      "id": "l2",
      "text": "Es sieht nicht aus wie eine Karte oder eine Liste.",
      "beat": "ein durchscheinender Kartenlisten-Look löst sich in Papierstruktur auf, Archiv statt Kartenliste"
    },
    {
      "id": "l3",
      "text": "Es sieht aus wie der Tag selbst.",
      "beat": "Nahaufnahme der oberen Papierrandkante; '3 OCT Today' liegt im Licht"
    },
    {
      "id": "l4",
      "text": "Das Papier hebt sich aus dem Stapel.",
      "beat": "HERO: der Papiertagebericht hebt sich langsam aus dem Stapel, schwebt leicht geneigt über dem Archiv"
    },
    {
      "id": "l5",
      "text": "Es faltet sich langsam auf, bis der Tag den Bildschirm füllt.",
      "beat": "die Seite faltet sich auf und wächst, bis sie zwei Drittel des Bildes ausfüllt"
    },
    {
      "id": "l6",
      "text": "Samstag, der dritte Oktober: Puls, fünfzig neun Schläge pro Minute, um 17 Uhr 14.",
      "beat": "die Pulszeile füllt sich ein: Pulse 59 BPM · Fair 5:14 PM, in ruhiger Serifenschrift"
    },
    {
      "id": "l7",
      "text": "Eine zweite Messung: einundsechzig Schläge pro Minute, am Finger gemessen.",
      "beat": "die zweite Zeile füllt sich: ALSO Pulse — Fingertip 61 BPM · Fair"
    },
    {
      "id": "l8",
      "text": "Stimmung des Tages: sehr gut. Schlaf: sieben Stunden.",
      "beat": "der untere Block faltet sich auf: Stimmung 'Very good', Sleep 7h, die '3 events'-Zeile"
    },
    {
      "id": "l9",
      "text": "Sechs Einträge liegen auf derselben Seite. Tippe, um sie zu öffnen.",
      "beat": "die Fußzeile 'Log ×6, tap to open' wird getippt; eine kleine Logkarte hebt sich aus der Seite"
    },
    {
      "id": "l10",
      "text": "Jeder Tag wird zu einer Seite, die du wiederfindest.",
      "beat": "Kamera fährt über den Stapel zurück; viele Tage, jeder ein Papierblatt"
    },
    {
      "id": "l11",
      "text": "Entdecke das Gesundheitstagebuch.",
      "beat": "Endkarte: der Papiertagebericht ruht oben auf dem Stapel, darunter die CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Scroll back. See forward." : "Zurückscrollen. Vorwärtssehen.";
const screenshots = ["timeline.jpg"];

const Reel14 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-14" timing={t} />
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
          <Overline text="Time Travel Your Health" start={5} />
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
        <Overline text="Time Travel Your Health" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel14;
