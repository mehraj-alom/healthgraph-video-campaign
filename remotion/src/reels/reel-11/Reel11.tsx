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

import timingEn from '../../generated/timings/reel-11/en.json';
import timingDe from '../../generated/timings/reel-11/de.json';

const NARRATION_EN = {
  "id": "reel-11",
  "language": "en",
  "concept": "ask-instead-of-searching",
  "cluster": "B",
  "hook": "Imagine asking your health records instead of searching through PDFs.",
  "cta": "Ask your records.",
  "thumbnail": "Ask instead of scrolling PDFs",
  "caption": "Searching through PDFs means open, scroll, squint, close. What if you could just ask? Ask how you slept this week, and the matching record opens right where it matters, with the date and context around it. Wellness information, not a diagnosis. Ask your records. #HealthGraph #AskYourRecords #HealthRecords #HealthData #DigitalHealth #SelfTracking #PersonalHealth #DocumentSearch",
  "lines": [
    {
      "id": "l1",
      "text": "Imagine asking your health records instead of searching through PDFs.",
      "beat": "a stack of generic PDF documents; a cursor hovers over an empty search field"
    },
    {
      "id": "l2",
      "text": "Searching is open, scroll, squint, close.",
      "beat": "documents open and close rapidly: open, scroll, squint, close"
    },
    {
      "id": "l3",
      "text": "Asking is different.",
      "beat": "the documents step aside; a chat input fades in"
    },
    {
      "id": "l4",
      "text": "Open the chat. Type a question.",
      "beat": "real ai-chat screen; the input field Ask about your health stays in view"
    },
    {
      "id": "l5",
      "text": "How did I sleep this week?",
      "beat": "the suggested chip How did I sleep this week is tapped in the ai-chat screen"
    },
    {
      "id": "l6",
      "text": "The answer lands with the records behind it.",
      "beat": "an answer card expands in the chat; the source references in it glow"
    },
    {
      "id": "l7",
      "text": "The matching record opens, already at the right place.",
      "beat": "the daily-report card opens, already at the right section, 3 OCT in view"
    },
    {
      "id": "l8",
      "text": "You see the context: date, measurements, notes around it.",
      "beat": "context panel around the entry: date, adjacent entries, and the patterns-sleep chart 420 min steady"
    },
    {
      "id": "l9",
      "text": "Wellness information, not a diagnosis.",
      "beat": "the small line Wellness info only, Not medical advice rests calm in frame"
    },
    {
      "id": "l10",
      "text": "Ask your records.",
      "beat": "end card: chat with a calm blinking cursor, CTA over the dimmed ai-chat screen"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-11",
  "language": "de",
  "concept": "ask-instead-of-searching",
  "cluster": "B",
  "hook": "Stell dir vor, du fragst deine Unterlagen, statt PDFs durchzublättern.",
  "cta": "Frag deine Unterlagen.",
  "thumbnail": "Fragen statt durch PDFs blättern",
  "caption": "PDFs durchzublättern heißt: öffnen, scrollen, suchen, schließen. Was wäre, wenn du einfach fragen könntest? Frag, wie du diese Woche geschlafen hast, und die passende Unterlage öffnet sich direkt an der richtigen Stelle, mit Datum und Kontext. Gesundheitsinformation, keine Diagnose. #HealthGraph #Gesundheit #Gesundheitsunterlagen #Gesundheitsdaten #DigitaleGesundheit #SelfTracking #Dokumente #DeineDaten\nFrag deine Unterlagen.",
  "lines": [
    {
      "id": "l1",
      "text": "Stell dir vor, du fragst deine Unterlagen, statt PDFs durchzublättern.",
      "beat": "ein Stapel generischer PDF-Dokumente; ein Cursor schwebt über einem leeren Suchfeld"
    },
    {
      "id": "l2",
      "text": "Durchsuchen heißt: öffnen, scrollen, suchen, schließen.",
      "beat": "Dokumente öffnen und schließen sich schnell: öffnen, scrollen, suchen, schließen"
    },
    {
      "id": "l3",
      "text": "Fragen ist etwas anderes.",
      "beat": "die Dokumente rücken beiseite; ein Chat-Eingabefeld blendet ruhig ein"
    },
    {
      "id": "l4",
      "text": "Öffne den Chat. Tippe eine Frage.",
      "beat": "echter ai-chat-Screen; das Eingabefeld Ask about your health bleibt im Blick"
    },
    {
      "id": "l5",
      "text": "Wie habe ich diese Woche geschlafen?",
      "beat": "der Vorschlag How did I sleep this week wird im ai-chat-Screen angeklickt"
    },
    {
      "id": "l6",
      "text": "Die Antwort kommt zusammen mit den Unterlagen dahinter.",
      "beat": "eine Antwortkarte expandiert im Chat; die Quellenverweise darin leuchten auf"
    },
    {
      "id": "l7",
      "text": "Die passende Unterlage öffnet sich direkt an der richtigen Stelle.",
      "beat": "die daily-report-Karte öffnet sich bereits an der richtigen Stelle, 3 OCT im Blick"
    },
    {
      "id": "l8",
      "text": "Du siehst den Kontext: Datum, Messungen, Notizen drumherum.",
      "beat": "Kontextfeld um den Eintrag: Datum, benachbarte Einträge und die patterns-sleep-Kurve 420 min steady"
    },
    {
      "id": "l9",
      "text": "Gesundheitsinformation, keine Diagnose.",
      "beat": "die kleine Zeile Wellness info only, Not medical advice bleibt ruhig im Bild"
    },
    {
      "id": "l10",
      "text": "Frag deine Unterlagen.",
      "beat": "Endkarte: Chat mit ruhigem Cursor, CTA über dem gedämpften ai-chat-Screen"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Food becomes insight." : "Essen wird Einsicht.";
const screenshots = ["nutrition.jpg"];

const Reel11 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-11" timing={t} />
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
          <Overline text="Nutrition as Data" start={5} />
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
        <Overline text="Nutrition as Data" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel11;
