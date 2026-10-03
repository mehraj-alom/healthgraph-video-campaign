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

import timingEn from '../../generated/timings/reel-16/en.json';
import timingDe from '../../generated/timings/reel-16/de.json';

const NARRATION_EN = {
  "id": "reel-16",
  "language": "en",
  "concept": "document-to-history",
  "cluster": "D",
  "hook": "From document to health history.",
  "cta": "Discover HealthGraph at healthgraph.shop.",
  "thumbnail": "From document to health history",
  "caption": "From a single document to a connected health history: extraction, normalization, a structured event, then the graph. Precise, source-aware, no manual entry. Discover HealthGraph at healthgraph.shop. #HealthGraph #HealthData #DataPipeline #StructuredData #HealthTimeline #HealthHistory #DigitalHealth #HealthJournal",
  "lines": [
    {
      "id": "l1",
      "text": "From document to health history.",
      "beat": "records-upload screen; a mono data label 'PDF · max 50 MB' sits on an incoming file frame, instrumentation-style"
    },
    {
      "id": "l2",
      "text": "Stage one, a document arrives.",
      "beat": "the file frame docks into the pipeline; label 'STAGE 01 / EXTRACT' stamps on"
    },
    {
      "id": "l3",
      "text": "The app extracts the fields: dates, values, units.",
      "beat": "field labels (DATE, VALUE, UNIT) parse out of the document rows and link with thin lines"
    },
    {
      "id": "l4",
      "text": "Stage two, normalization.",
      "beat": "label 'STAGE 02 / NORMALIZE' stamps; values realign into a mono column grid"
    },
    {
      "id": "l5",
      "text": "Dates become timestamps, values become consistent measurements.",
      "beat": "date strings snap into timestamp ticks; numbers align to the baseline with tick marks"
    },
    {
      "id": "l6",
      "text": "Stage three, a structured health event.",
      "beat": "label 'STAGE 03 / EVENT'; an event card assembles from parts: date, value, source document"
    },
    {
      "id": "l7",
      "text": "Each event keeps a link to the original document.",
      "beat": "a source-link edge draws from the event card back to the document frame; a mono label confirms it"
    },
    {
      "id": "l8",
      "text": "Stage four, the event joins the timeline.",
      "beat": "label 'STAGE 04 / TIMELINE'; the event lands between 2 OCT and 3 OCT on a growing timeline"
    },
    {
      "id": "l9",
      "text": "The graph updates: 12 nodes, 22 connections.",
      "beat": "cut to health-graph screen; a new node connects, edges draw between nodes"
    },
    {
      "id": "l10",
      "text": "No manual entry, no lost files.",
      "beat": "a tidy grid of event cards; the document frame glows in the 'Past uploads' list"
    },
    {
      "id": "l11",
      "text": "Discover HealthGraph at healthgraph.shop.",
      "beat": "end card: the full pipeline strip (doc, extract, event, graph) behind the CTA"
    }
  ]
};
const NARRATION_DE = {
  "id": "reel-16",
  "language": "de",
  "concept": "dokument-zur-geschichte",
  "cluster": "D",
  "hook": "Vom Dokument zur Gesundheitsgeschichte.",
  "cta": "Entdecke HealthGraph auf healthgraph.shop.",
  "thumbnail": "Vom Dokument zur Gesundheitsgeschichte",
  "caption": "Vom einzelnen Dokument zur verbundenen Gesundheitsgeschichte: Extraktion, Normalisierung, ein strukturiertes Ereignis, dann der Graph. Präzise, mit Quellbezug, ohne manuelles Erstellen. Entdecke HealthGraph auf healthgraph.shop. #HealthGraph #Gesundheitsdaten #Datenpipeline #StrukturierteDaten #Gesundheitsgeschichte #DigitalGesundheit #Zeitachse #Gesundheitsapp #Tagebuch",
  "lines": [
    {
      "id": "l1",
      "text": "Vom Dokument zur Gesundheitsgeschichte.",
      "beat": "Hochladescreen für Unterlagen; ein monospace-Datenlabel 'PDF · max. 50 MB' auf einem eingehenden Dateirahmen, instrumentenartig"
    },
    {
      "id": "l2",
      "text": "Schritt eins: ein Dokument gelangt in die App.",
      "beat": "der Dateirahmen dockt in die Pipeline; das Label 'SCHRITT 01 / EXTRAKTION' stempelt sich ein"
    },
    {
      "id": "l3",
      "text": "Die App extrahiert die Felder: Datum, Werte, Einheiten.",
      "beat": "Feldlabels (DATUM, WERT, EINHEIT) werden aus den Dokumentzeilen gelöst und mit dünnen Linien verbunden"
    },
    {
      "id": "l4",
      "text": "Schritt zwei: Normalisierung.",
      "beat": "das Label 'SCHRITT 02 / NORMALISIERUNG' stempelt sich ein; Werte richten sich in ein monospace-Spaltenraster"
    },
    {
      "id": "l5",
      "text": "Datum wird Zeitstempel, Werte werden konsistent.",
      "beat": "Datumsangaben klicken in Zeitstempel-Markierungen ein; Zahlen rücken an die Baseline mit Tick-Markierungen"
    },
    {
      "id": "l6",
      "text": "Schritt drei: ein strukturiertes Gesundheitsereignis.",
      "beat": "das Label 'SCHRITT 03 / ERREIGNIS'; eine Ereigniskarte setzt sich aus den Teilen zusammen: Datum, Wert, Ursprungsdokument"
    },
    {
      "id": "l7",
      "text": "Jedes Ereignis behält den Bezug zum ursprünglichen Dokument.",
      "beat": "eine Quellenkante zeichnet sich von der Ereigniskarte zurück zum Dokumentrahmen; ein monospace-Label bestätigt"
    },
    {
      "id": "l8",
      "text": "Schritt vier: Das Ereignis fügt sich in die Zeitachse ein.",
      "beat": "das Label 'SCHRITT 04 / ZEITACHSE'; das Ereignis landet zwischen 2. OKT und 3. OKT auf einer wachsenden Zeitachse"
    },
    {
      "id": "l9",
      "text": "Der Graph aktualisiert sich: 12 Knoten, 22 Verbindungen.",
      "beat": "Schnitt zum Health-Graph-Screen; ein neuer Knoten verbindet sich, Kanten zeichnen sich zwischen den Knoten"
    },
    {
      "id": "l10",
      "text": "Kein manuelles Erstellen, keine verlorene PDF-Datei.",
      "beat": "ein ordentliches Raster aus Ereigniskarten; der Dokumentrahmen leuchtet in der 'Past uploads'-Liste"
    },
    {
      "id": "l11",
      "text": "Entdecke HealthGraph auf healthgraph.shop.",
      "beat": "Endkarte: die komplette Pipeline (Dokument, Extraktion, Ereignis, Graph) hinter der CTA"
    }
  ]
};

const timing = (lang: 'en' | 'de'): Timing => (lang === 'en' ? timingEn : timingDe) as Timing;
const narration = (lang: 'en' | 'de'): NarrationLine[] => lang === 'en' ? NARRATION_EN.lines : NARRATION_DE.lines;
const cta = (lang: 'en' | 'de') => lang === 'en' ? "Works without the cloud." : "Funktioniert ohne Cloud.";
const screenshots = ["offline.jpg"];

const Reel16 = ({lang}: {lang: 'en' | 'de'}) => {
  const frame = useCurrentFrame();
  const t = timing(lang);
  const lines = narration(lang);
  const currentLine = lineAt(t, frame);
  const lineIndex = currentLine ? t.lines.findIndex(l => l.id === currentLine.id) : -1;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <CampaignAudio id="reel-16" timing={t} />
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
          <Overline text="Offline First" start={5} />
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
        <Overline text="Offline First" start={10} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ParticleField seed={7} amount={0.5} />
    </AbsoluteFill>
  );
};

export default Reel16;
