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

import timingEn from '../../generated/timings/reel-04/en.json';
import timingDe from '../../generated/timings/reel-04/de.json';

const NARRATION_EN = {
  "id": "reel-04",
  "language": "en",
  "concept": "document-to-timeline",
  "cluster": "D",
  "hook": "Imagine your medical documents actually becoming part of your timeline.",
  "cta": "See how your health history could connect.",
  "thumbnail": "From paper to timeline",
  "caption": "A report is more than a file: it holds a moment of your health. Upload it to your records, and HealthGraph turns it into a structured entry in your graph, with its place in time. From document to timeline, your medical documents become part of your history. See how your health history could connect. Explore HealthGraph at healthgraph.shop. #healthgraph #healthtimeline #medicalrecords #healthhistory #digitalhealth #personalhealth #selfcare #healthapp #documenttohistory #connectedhistory",
  "lines": [
    {
      "id": "l1",
      "text": "Imagine your medical documents actually becoming part of your timeline.",
      "beat": "Title card: documents adrift in the dark"
    },
    {
      "id": "l2",
      "text": "A report is more than a file.",
      "beat": "Document close-up, separating from a stack of fragments"
    },
    {
      "id": "l3",
      "text": "It holds a moment of your health.",
      "beat": "Document pauses, softly highlighted"
    },
    {
      "id": "l4",
      "text": "Upload it to your records.",
      "beat": "records upload screen: PDF drops in, teal upload button"
    },
    {
      "id": "l5",
      "text": "The app reads the structured parts.",
      "beat": "Extraction: highlight sweep across the document text"
    },
    {
      "id": "l6",
      "text": "Date, type, value: a clean entry.",
      "beat": "Structured fields appear as data labels: date, type, value"
    },
    {
      "id": "l7",
      "text": "The document becomes a node in your graph.",
      "beat": "health-graph screen: new node appears, 'Tap a node for links'"
    },
    {
      "id": "l8",
      "text": "And that node takes its place in time.",
      "beat": "Node settles on the time axis, 'Drag to travel through time' hint visible"
    },
    {
      "id": "l9",
      "text": "Next to the visit, the pulse, the sleep.",
      "beat": "health-graph neighborhood: visit, heart and sleep nodes adjacent"
    },
    {
      "id": "l10",
      "text": "Drag across time: the day is now linked.",
      "beat": "Camera drags across the graph through time"
    },
    {
      "id": "l11",
      "text": "From paper to part of your history.",
      "beat": "Document morphs into its node, supporting 3D moment"
    },
    {
      "id": "l12",
      "text": "See how your health history could connect.",
      "beat": "End card with wordmark and CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-04",
  "language": "de",
  "concept": "dokument-zur-zeitleiste",
  "cluster": "D",
  "hook": "Stell dir vor, deine Arztunterlagen werden Teil deiner Zeitleiste.",
  "cta": "Schau, wie sich dein Gesundheitsverlauf verbinden könnte.",
  "thumbnail": "Vom Dokument zur Zeitleiste",
  "caption": "Ein Befund ist mehr als eine Datei: Er hält einen Moment deiner Gesundheit fest. Mit HealthGraph wird er zu einem strukturierten Eintrag in deinem Graphen – mit Datum und seinem Platz in der Zeit. Vom Dokument zur Zeitleiste, deine Unterlagen werden Teil deines Verlaufs. Kostenlos · DSGVO-konform · Ohne Werbung. Entdecke HealthGraph auf healthgraph.shop. #gesundheit #gesundheitsapp #arztunterlagen #gesundheitsverlauf #zeitstrahl #digitalegesundheit #dokumentation #datenschutz #persönlichegesundheit #sichsorgen",
  "lines": [
    {
      "id": "l1",
      "text": "Stell dir vor, deine Arztunterlagen werden Teil deiner Zeitleiste.",
      "beat": "Titelkarte: Dokumente treiben im Dunkeln"
    },
    {
      "id": "l2",
      "text": "Ein Befund ist mehr als eine Datei.",
      "beat": "Nahaufnahme eines Dokuments, es löst sich vom Haufen ab"
    },
    {
      "id": "l3",
      "text": "Er hält einen Moment deiner Gesundheit fest.",
      "beat": "Dokument pausiert, wird sanft hervorgehoben"
    },
    {
      "id": "l4",
      "text": "Lade ihn in deine Aufzeichnungen hoch.",
      "beat": "records upload screen: PDF fällt hinein, teal Upload-Button"
    },
    {
      "id": "l5",
      "text": "Die App liest die strukturierten Teile heraus.",
      "beat": "Extraktion: Hervorhebungsband über dem Dokumententext"
    },
    {
      "id": "l6",
      "text": "Datum, Art, Wert: ein sauberer Eintrag.",
      "beat": "Strukturierte Felder erscheinen als Daten-Labels: Datum, Art, Wert"
    },
    {
      "id": "l7",
      "text": "Aus dem Dokument wird ein Knoten im Graphen.",
      "beat": "health-graph screen: neuer Knoten erscheint, 'Tap a node for links'"
    },
    {
      "id": "l8",
      "text": "Und der Knoten bekommt seinen Platz in der Zeit.",
      "beat": "Knoten rutscht auf die Zeitachse, 'Drag to travel through time' sichtbar"
    },
    {
      "id": "l9",
      "text": "Neben dem Besuch, dem Puls, dem Schlaf.",
      "beat": "health-graph-Umgebung: Visit-, Heart- und Sleep-Knoten in der Nähe"
    },
    {
      "id": "l10",
      "text": "Ziehe durch die Zeit: der Tag ist jetzt verbunden.",
      "beat": "Kamera zieht über den Graphen durch die Zeit"
    },
    {
      "id": "l11",
      "text": "Von Papier zu einem Teil deiner Geschichte.",
      "beat": "Dokument wird zu seinem Knoten, unterstützende 3D-Bewegung"
    },
    {
      "id": "l12",
      "text": "Schau, wie sich dein Gesundheitsverlauf verbinden könnte.",
      "beat": "Endkarte mit Wortmarke und CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Measure. Watch. Connect." : "Messen. Sehen. Verbinden.";
const screenshots = ["pulse-oximeter.jpg"];

const Reel04 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-04" timing={t} />
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
          <Overline text="Pulse at Your Fingertip" start={5} />
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
        <Overline text="Pulse at Your Fingertip" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel04;
