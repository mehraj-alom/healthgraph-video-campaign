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

import timingEn from '../../generated/timings/reel-02/en.json';
import timingDe from '../../generated/timings/reel-02/de.json';

const NARRATION_EN = {
  "id": "reel-02",
  "language": "en",
  "concept": "ask-your-records",
  "cluster": "B",
  "hook": "What if you could ask your own health history?",
  "cta": "Ask your records.",
  "thumbnail": "Ask your health history",
  "caption": "What if you could ask your own health history? Ask when you uploaded your blood report, and HealthGraph takes you to the entry: the date, the context, the day it happened. Your records, queryable, with the source behind every answer. Wellness info only, not medical advice. Explore HealthGraph at healthgraph.shop. #healthgraph #askyourrecords #healthhistory #digitalhealth #healthdata #personalhealth #healthapp #selftracking #healthjournal #connectedhistory",
  "lines": [
    {
      "id": "l1",
      "text": "What if you could ask your own health history?",
      "beat": "Dark title card, chat input field fades in"
    },
    {
      "id": "l2",
      "text": "When did I upload my blood report?",
      "beat": "ai-chat screen: question typed into the 'Ask about your health' input"
    },
    {
      "id": "l3",
      "text": "It reads your own history to answer.",
      "beat": "ai-chat screen: answer bubble appears, 'Wellness info only' note visible"
    },
    {
      "id": "l4",
      "text": "It gives the date, not a guess.",
      "beat": "Answer highlights the date, push-in on it"
    },
    {
      "id": "l5",
      "text": "And it can take you there.",
      "beat": "Chat screen collapses, transition into health-graph"
    },
    {
      "id": "l6",
      "text": "Watch it open the day in your timeline.",
      "beat": "daily-report card '3 OCT Today' opens, tabs slide in"
    },
    {
      "id": "l7",
      "text": "The entry is right there, in context.",
      "beat": "daily-report: entry highlighted, footer 'Log x6, tap to open'"
    },
    {
      "id": "l8",
      "text": "No more hunting through folders by hand.",
      "beat": "Ghosted folder icons dissolve behind the open record"
    },
    {
      "id": "l9",
      "text": "The answer comes with the record behind it.",
      "beat": "Split view: answer on left, record on right, linked by a line"
    },
    {
      "id": "l10",
      "text": "Ask your records.",
      "beat": "End card with wordmark and CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-02",
  "language": "de",
  "concept": "verlauf-gefragt",
  "cluster": "B",
  "hook": "Stell dir vor, du kannst deinen Gesundheitsverlauf fragen.",
  "cta": "Frag deine Gesundheitsunterlagen.",
  "thumbnail": "Frag deinen Gesundheitsverlauf",
  "caption": "Stell dir vor, du kannst deinen eigenen Verlauf einfach fragen: Wann habe ich meinen Blutbefund hochgeladen? HealthGraph führt dich zum Eintrag – Datum, Kontext, der Tag, an dem es stattfand. Jede Antwort zeigt die Quelle dahinter. Wellness-Informationen, kein medizinischer Rat. Kostenlos · DSGVO-konform · Ohne Werbung. Entdecke HealthGraph auf healthgraph.shop. #gesundheit #gesundheitsapp #gesundheitsverlauf #digitalegesundheit #persönlichegesundheit #datenschutz #sichsorgen #wohlbefinden #eigendaten #dokumentation",
  "lines": [
    {
      "id": "l1",
      "text": "Stell dir vor, du kannst deinen Gesundheitsverlauf fragen.",
      "beat": "Dunkle Titelkarte, Chat-Eingabefeld entsteht"
    },
    {
      "id": "l2",
      "text": "Wann habe ich meinen Blutbefund hochgeladen?",
      "beat": "ai-chat screen: Frage wird in das Eingabefeld 'Ask about your health' eingegeben"
    },
    {
      "id": "l3",
      "text": "Es liest deinen Verlauf, bevor es antwortet.",
      "beat": "ai-chat screen: Antwortblase erscheint, Hinweis 'Wellness info only' sichtbar"
    },
    {
      "id": "l4",
      "text": "Es nennt das Datum, keine Vermutung.",
      "beat": "Antwort hebt das Datum hervor, sanftes Hineinzoomen"
    },
    {
      "id": "l5",
      "text": "Und es kann dich dorthin nehmen.",
      "beat": "Chat screen schwindet, Übergang in den health-graph"
    },
    {
      "id": "l6",
      "text": "Beobachte, wie es den Tag in deiner Zeitleiste öffnet.",
      "beat": "daily-report-Karte '3 OCT Today' öffnet sich, Tabs schieben hinein"
    },
    {
      "id": "l7",
      "text": "Der Eintrag steht da, mit Kontext.",
      "beat": "daily-report: Eintrag wird hervorgehoben, Fußzeile 'Log x6, tap to open'"
    },
    {
      "id": "l8",
      "text": "Kein langes Stochern in Ordnern mehr.",
      "beat": "Vergilbte Ordner-Icons lösen sich hinter dem geöffneten Eintrag auf"
    },
    {
      "id": "l9",
      "text": "Die Antwort zeigt die Quelle dahinter mit.",
      "beat": "Sichttrennung: Antwort links, Eintrag rechts, verbunden durch eine Linie"
    },
    {
      "id": "l10",
      "text": "Frag deine Gesundheitsunterlagen.",
      "beat": "Endkarte mit Wortmarke und CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "All 20 areas. One tap." : "Alle 20 Bereiche. Ein Tipp.";
const screenshots = ["health-areas.jpg"];

const Reel02 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-02" timing={t} />
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
          <Overline text="Twenty Areas, One Screen" start={5} />
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
        <Overline text="Twenty Areas, One Screen" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel02;
