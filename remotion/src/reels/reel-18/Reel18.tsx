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

import timingEn from '../../generated/timings/reel-18/en.json';
import timingDe from '../../generated/timings/reel-18/de.json';

const NARRATION_EN = {
  "id": "reel-18",
  "language": "en",
  "concept": "answer-vs-record",
  "cluster": "B",
  "hook": "Don't just get an AI answer. Find the record behind it.",
  "cta": "Ask your records.",
  "thumbnail": "The record behind the answer",
  "caption": "An AI answer is only as good as what you can check behind it. Ask your records, get the answer, then open the entries it came from. That's context, not just a chat reply. Ask your records. #healthgraph #askyourrecords #selftracking #evidencebased #healthjournal #digitaldiary #transparency #healthtech #personalhealth #contextmatters",
  "lines": [
    {
      "id": "l1",
      "text": "Don't just get an AI answer. Find the record behind it.",
      "beat": "ai-chat screen: suggested card How did I sleep this week is tapped, chat thread opens, Wellness info only disclaimer visible"
    },
    {
      "id": "l2",
      "text": "Ask your records a real question, like how you slept this week.",
      "beat": "ai-chat: question types into the Ask about your health input, 2 AI messages per month FREE badge visible"
    },
    {
      "id": "l3",
      "text": "The answer comes back in plain language.",
      "beat": "ai-chat: reply card slides in over the dark chat background"
    },
    {
      "id": "l4",
      "text": "But every answer points back to where it came from.",
      "beat": "reply card dissolves into a row of evidence cards, green connector lines draw from the answer to each source"
    },
    {
      "id": "l5",
      "text": "The sleep log, the daily log, the entries behind the claim.",
      "beat": "daily-log and patterns-sleep screens slide in as source cards: sleep 7h, Sleep duration 420min steady"
    },
    {
      "id": "l6",
      "text": "You can open the source and check it yourself.",
      "beat": "paper report opens: daily-report cream card 3 OCT, Pulse 59 BPM entry highlighted, Log x6 footer"
    },
    {
      "id": "l7",
      "text": "That's the difference between an answer and evidence.",
      "beat": "split view: answer card left, source cards right, connector lines hold, hierarchy clear"
    },
    {
      "id": "l8",
      "text": "Context, not just a chat reply.",
      "beat": "health-graph: 2 OCT and 3 OCT nodes link up with the source entries, filter chips All Visit Heart Sleep Nutrition visible"
    },
    {
      "id": "l9",
      "text": "Ask your records.",
      "beat": "end card: healthgraph wordmark, Ask your records"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-18",
  "language": "de",
  "concept": "answer-vs-record",
  "cluster": "B",
  "hook": "Hole dir nicht nur eine KI-Antwort. Finde die Quelle dahinter.",
  "cta": "Frage deine Aufzeichnungen.",
  "thumbnail": "Die Quelle hinter der Antwort",
  "caption": "Eine KI-Antwort ist nur so gut wie das, was du dahinter nachprüfen kannst. Frage deine Aufzeichnungen, hole dir die Antwort und öffne die Einträge, aus denen sie stammt. Das ist Kontext, nicht nur eine Chat-Antwort. Frage deine Aufzeichnungen. #healthgraph #aufzeichnungenfragen #selftracking #nachvollziehbar #gesundheitstagebuch #digitalarchiv #transparenz #healthtech #gesundheit #kontext",
  "lines": [
    {
      "id": "l1",
      "text": "Hole dir nicht nur eine KI-Antwort. Finde die Quelle dahinter.",
      "beat": "ai-chat screen: suggested card How did I sleep this week is tapped, chat thread opens, Wellness info only disclaimer visible"
    },
    {
      "id": "l2",
      "text": "Stell deinen Aufzeichnungen eine echte Frage, wie diese: Wie habe ich diese Woche geschlafen?",
      "beat": "ai-chat: question types into the Ask about your health input, 2 AI messages per month FREE badge visible"
    },
    {
      "id": "l3",
      "text": "Die Antwort kommt in verständlicher Sprache zurück.",
      "beat": "ai-chat: reply card slides in over the dark chat background"
    },
    {
      "id": "l4",
      "text": "Jede Antwort zeigt genau hin, woher sie kommt.",
      "beat": "reply card dissolves into a row of evidence cards, green connector lines draw from the answer to each source"
    },
    {
      "id": "l5",
      "text": "Das Schlafprotokoll, das Tagesprotokoll, die Einträge hinter der Aussage.",
      "beat": "daily-log and patterns-sleep screens slide in as source cards: sleep 7h, Sleep duration 420min steady"
    },
    {
      "id": "l6",
      "text": "Du kannst die Quelle öffnen und selbst nachlesen.",
      "beat": "paper report opens: daily-report cream card 3 OCT, Pulse 59 BPM entry highlighted, Log x6 footer"
    },
    {
      "id": "l7",
      "text": "Das ist der Unterschied zwischen einer Antwort und einem Beleg.",
      "beat": "split view: answer card left, source cards right, connector lines hold, hierarchy clear"
    },
    {
      "id": "l8",
      "text": "Kontext, nicht nur eine Chat-Antwort.",
      "beat": "health-graph: 2 OCT and 3 OCT nodes link up with the source entries, filter chips All Visit Heart Sleep Nutrition visible"
    },
    {
      "id": "l9",
      "text": "Frage deine Aufzeichnungen.",
      "beat": "end card: healthgraph wordmark, Frage deine Aufzeichnungen"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Context beats chat." : "Kontext schlägt Chat.";
const screenshots = ["context.jpg"];

const Reel18 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-18" timing={t} />
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
          <Overline text="Context, Not Chat" start={5} />
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
        <Overline text="Context, Not Chat" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel18;
