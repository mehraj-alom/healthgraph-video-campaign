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

import timingEn from '../../generated/timings/reel-15/en.json';
import timingDe from '../../generated/timings/reel-15/de.json';

const NARRATION_EN = {
  "id": "reel-15",
  "language": "en",
  "concept": "journal-answers",
  "cluster": "G",
  "hook": "What if your health journal could answer back?",
  "cta": "Ask your records.",
  "thumbnail": "Your journal can answer back",
  "caption": "No typing, no scrolling. Speak through the small red pulse button, and your journal looks up the answer in your own records. Calm, source-aware, wellness info only, not medical advice. Ask your records. #HealthGraph #VoiceCheckIn #HealthJournal #AskYourRecords #DigitalHealth #HealthData #VoiceUI #WellnessInfo",
  "lines": [
    {
      "id": "l1",
      "text": "What if your health journal could answer back?",
      "beat": "the red voice FAB pulses at the bottom of the explore-grid screen; a soft waveform ripple grows from it"
    },
    {
      "id": "l2",
      "text": "No typing. No scrolling through files.",
      "beat": "ghost typing bubbles and a scrolling document list dissolve off-screen"
    },
    {
      "id": "l3",
      "text": "You just speak, through the small red pulse button.",
      "beat": "close-up on the red voice FAB on its white pill; a thumb taps it, the mic waveform takes over"
    },
    {
      "id": "l4",
      "text": "You ask: how did I sleep this week?",
      "beat": "the voice check-in waveform plays; the suggestion 'How did I sleep this week?' types on softly"
    },
    {
      "id": "l5",
      "text": "Your journal listens, then looks it up.",
      "beat": "the waveform morphs into a thin search line sweeping across records"
    },
    {
      "id": "l6",
      "text": "It turns to your own records.",
      "beat": "ai-chat screen opens; 'How may I Assist you today' header with the user's own records implied behind"
    },
    {
      "id": "l7",
      "text": "The answer comes back as calm, simple text.",
      "beat": "an answer bubble types out slowly, referencing the daily-log entries (sleep 7h) as it forms"
    },
    {
      "id": "l8",
      "text": "Always from your history, not a chatbot guessing.",
      "beat": "small source chips point back to the daily-log screen and to health-graph nodes"
    },
    {
      "id": "l9",
      "text": "Wellness info only, not medical advice.",
      "beat": "the label 'Wellness info only. Not medical advice.' stamps under the answer in small type"
    },
    {
      "id": "l10",
      "text": "The journal remembers what you logged.",
      "beat": "camera rests on the ai-chat with the red voice FAB still pulsing quietly"
    },
    {
      "id": "l11",
      "text": "Ask your records.",
      "beat": "end card on warm charcoal with the red pulse button glowing beside the CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-15",
  "language": "de",
  "concept": "tagebuch-antwortet",
  "cluster": "G",
  "hook": "Und wenn dein Gesundheitstagebuch antworten könnte?",
  "cta": "Frag deine Aufzeichnungen.",
  "thumbnail": "Dein Gesundheitstagebuch antwortet dir",
  "caption": "Kein Tippen, kein Suchen in Ordnern. Du sprichst über den kleinen roten Puls-Button, und dein Tagebuch findet die Antwort in deinen eigenen Einträgen. Ruhig, mit Bezug zu deinen Aufzeichnungen – Gesundheitsinfo, keine medizinische Beratung. Frag deine Aufzeichnungen. #HealthGraph #Gesundheitstagebuch #Gesundheitsdaten #DigitaleGesundheit #Tagebuch #Gesundheitswissen #DSGVO #Wellness #Gesundheitsapp",
  "lines": [
    {
      "id": "l1",
      "text": "Und wenn dein Gesundheitstagebuch antworten könnte?",
      "beat": "der rote Sprach-Button pulsiert am unteren Rand des Explore-Rasters; eine sanfte Wellenform breitet sich aus"
    },
    {
      "id": "l2",
      "text": "Kein Tippen, kein Suchen in Ordnern.",
      "beat": "durchscheinende Tippblasen und eine wechselnde Dokumentliste lösen sich im Bild auf"
    },
    {
      "id": "l3",
      "text": "Du sagst es einfach, über den kleinen roten Puls-Button.",
      "beat": "Nahaufnahme des roten Sprach-Buttons auf der weißen Plakette; ein Daumen tippt, die Mikrofon-Wellenform übernimmt"
    },
    {
      "id": "l4",
      "text": "Du fragst: Wie habe ich diese Woche geschlafen?",
      "beat": "die Voice-Check-in-Wellenform läuft; der Vorschlag 'How did I sleep this week?' tippt sich leise ein"
    },
    {
      "id": "l5",
      "text": "Dein Tagebuch hört zu und schaut nach.",
      "beat": "die Wellenform formt sich zu einer dünnen Suchlinie, die über die Unterlagen fährt"
    },
    {
      "id": "l6",
      "text": "Es wendet sich an deine eigenen Einträge.",
      "beat": "der AI-Chat-Screen öffnet sich; der Header 'How may I Assist you today' mit deinen Einträgen im Hintergrund"
    },
    {
      "id": "l7",
      "text": "Die Antwort kommt leise und verständlich zurück.",
      "beat": "eine Antwortblase tippt sich langsam ein und verweist dabei auf den Tageslog (Schlaf 7h)"
    },
    {
      "id": "l8",
      "text": "Immer aus deiner eigenen Geschichte, nicht aus freien Vermutungen.",
      "beat": "kleine Quellenmarkierungen zeigen zurück auf den Tageslog und auf Health-Graph-Knoten"
    },
    {
      "id": "l9",
      "text": "Gesundheitsinfo, aber keine medizinische Beratung.",
      "beat": "der Hinweis 'Wellness info only. Not medical advice.' steht unter der Antwort in kleiner Schrift"
    },
    {
      "id": "l10",
      "text": "Das Tagebuch weiß, was du eingetragen hast.",
      "beat": "Kamera ruht auf dem AI-Chat, der rote Sprach-Button pulsiert ruhig weiter"
    },
    {
      "id": "l11",
      "text": "Frag deine Aufzeichnungen.",
      "beat": "Endkarte auf warmem Charcoal, daneben glüht der rote Puls-Button"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Your data. Your device." : "Ihre Daten. Ihr Gerät.";
const screenshots = ["privacy.jpg"];

const Reel15 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-15" timing={t} />
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
          <Overline text="Privacy by Architecture" start={5} />
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
        <Overline text="Privacy by Architecture" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel15;
