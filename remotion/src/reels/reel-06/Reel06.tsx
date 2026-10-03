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

import timingEn from '../../generated/timings/reel-06/en.json';
import timingDe from '../../generated/timings/reel-06/de.json';

const NARRATION_EN = {
  "id": "reel-06",
  "language": "en",
  "concept": "ai-records-navigation",
  "cluster": "B",
  "hook": "You forgot when you uploaded that report?",
  "cta": "Ask your records.",
  "thumbnail": "Your records remember the date",
  "caption": "Which week was it again? Instead of digging through files, ask your records. The answer comes with the date, the timeline slides over to that day, the daily page opens, and the evidence is highlighted right there: three events, mood very good, seven hours of sleep. Two AI messages a month are free. #HealthGraph #AskYourRecords #AIHealth #HealthHistory #DailyLog #SelfTracking #HealthData #Wellness #DigitalHealth #PersonalRecords\nAsk your records.",
  "lines": [
    {
      "id": "l1",
      "text": "You forgot when you uploaded that report?",
      "beat": "ai-chat screen, dimmed at first: input Ask about your health and the suggested questions visible; hook text overlays the chat"
    },
    {
      "id": "l2",
      "text": "So you ask, instead of digging through files.",
      "beat": "ai-chat: the question types itself into the input field, the support-resources card stays visible as calm context"
    },
    {
      "id": "l3",
      "text": "Two AI messages a month are free.",
      "beat": "The real 2 AI messages / month FREE chip highlights at the bottom of the ai-chat screen, then settles"
    },
    {
      "id": "l4",
      "text": "The answer comes with the date.",
      "beat": "Chat reply bubble appears and the found date in it gets a soft zoom; no invented answer text, date is the hero"
    },
    {
      "id": "l5",
      "text": "The timeline slides over to that day.",
      "beat": "Health Graph screen (12 nodes, 22 connections) drag-travels through time, sliding until the 3 OCT node is centered"
    },
    {
      "id": "l6",
      "text": "The daily page opens on its own.",
      "beat": "daily-log screen, 3 Oct Daily Log, opens as the page with a clean card transition"
    },
    {
      "id": "l7",
      "text": "And the evidence is highlighted right there.",
      "beat": "On daily-log, the Recent history row highlights: Nutrition Log, Sleep Log, Wellbeing Log, 3 events"
    },
    {
      "id": "l8",
      "text": "Mood, very good. Sleep, seven hours.",
      "beat": "daily-log fields highlight in sequence: Mood Very good, then Sleep 7h"
    },
    {
      "id": "l9",
      "text": "Every answer points back to a place in your history.",
      "beat": "Cross-dissolve: a thin line connects the chat answer bubble to the 3 OCT timeline node, answer linked to its place"
    },
    {
      "id": "l10",
      "text": "Ask your records.",
      "beat": "End card: CTA over the dimmed ai-chat screen, voice FAB idle at the bottom"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-06",
  "language": "de",
  "concept": "ai-records-navigation",
  "cluster": "B",
  "hook": "Weißt du noch, wann du diesen Bericht hochgeladen hast?",
  "cta": "Frag deine Aufzeichnungen.",
  "thumbnail": "Deine Aufzeichnungen erinnern sich",
  "caption": "Und wann war das wieder? Statt in Ordnern zu suchen, fragst du deine Aufzeichnungen. Die Antwort nennt gleich das Datum mit, die Zeitachse gleitet zu diesem Tag, die Tagesseite öffnet sich, und die Belege werden direkt dort hervorgehoben: drei Ereignisse, Stimmung sehr gut, sieben Stunden Schlaf. Zwei KI-Nachrichten pro Monat sind kostenlos. #HealthGraph #Gesundheitsverlauf #Tagesbericht #KIGesundheit #Achtsamkeit #Selbsterkenntnis #DeineDaten #DigitalGesund #Vorbeugung #Gesundheits-App\nFrag deine Aufzeichnungen.",
  "lines": [
    {
      "id": "l1",
      "text": "Weißt du noch, wann du diesen Bericht hochgeladen hast?",
      "beat": "ai-chat-Bildschirm, zunächst gedämpft: Eingabefeld Ask about your health mit Vorschlagsfragen sichtbar; Hook-Text über dem Chat"
    },
    {
      "id": "l2",
      "text": "Dann frag einfach, statt in Ordnern zu suchen.",
      "beat": "ai-chat: Die Frage tippt sich ins Eingabefeld, die Support-Karte bleibt als ruhiger Kontext im Bild"
    },
    {
      "id": "l3",
      "text": "Zwei KI-Nachrichten pro Monat sind kostenlos.",
      "beat": "Die echte Chip-Zeile 2 AI messages / month FREE hebt sich kurz am unteren Rand des ai-chat-Screens hervor, dann ruhig"
    },
    {
      "id": "l4",
      "text": "Die Antwort nennt gleich das Datum mit.",
      "beat": "Antwortfeld im Chat erscheint, das gefundene Datum wird sanft herangezoomt; das Datum ist der Fokus, keine erfundene Antwort"
    },
    {
      "id": "l5",
      "text": "Die Zeitachse gleitet zu diesem Tag.",
      "beat": "Health-Graph-Ansicht (12 nodes, 22 connections) fährt per Zug durch die Zeit, bis der Knoten 3 OCT mittig liegt"
    },
    {
      "id": "l6",
      "text": "Die Tagesseite öffnet sich von selbst.",
      "beat": "daily-log-Screen, 3. Oktober Tagesprotokoll, öffnet sich als Seite mit sauberem Karten-Übergang"
    },
    {
      "id": "l7",
      "text": "Und die Belege werden direkt dort hervorgehoben.",
      "beat": "Im daily-log wird die Zeile Recent history hervorgehoben: Nutrition Log, Sleep Log, Wellbeing Log, 3 events"
    },
    {
      "id": "l8",
      "text": "Stimmung: sehr gut. Schlaf: sieben Stunden.",
      "beat": "Felder im daily-log werden nacheinander hervorgehoben: Stimmung Very good, dann Schlaf 7h"
    },
    {
      "id": "l9",
      "text": "Jede Antwort verweist an einen Ort deines Verlaufs.",
      "beat": "Überblendung: eine dünne Linie verbindet die Chat-Antwort mit dem Zeitachsen-Knoten 3 OCT, Antwort an ihren Ort verankert"
    },
    {
      "id": "l10",
      "text": "Frag deine Aufzeichnungen.",
      "beat": "Endkarte: CTA über dem gedämpften ai-chat-Screen, Voice-Knopf unten in Ruhe"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Ask. Get answers." : "Fragen. Antworten bekommen.";
const screenshots = ["ask-records.jpg"];

const Reel06 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-06" timing={t} />
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
          <Overline text="Ask Your Records" start={5} />
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
        <Overline text="Ask Your Records" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel06;
