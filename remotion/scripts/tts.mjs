#!/usr/bin/env node
/**
 * TTS pipeline.
 *
 * For every narration JSON under ../scripts (discovery + reels), render one
 * Piper clip per line and emit frame-accurate timing files.
 *
 *   node scripts/tts.mjs            # all narrations
 *   node scripts/tts.mjs reel-01    # one video id
 *
 * Outputs:
 *   public/voice/<id>/<lang>/<lineId>.wav
 *   src/generated/timings/<id>/<lang>.json
 *
 * Deterministic voice choices (one per language — campaign consistency rule):
 *   en -> en_US-lessac-medium
 *   de -> de_DE-thorsten-medium
 */
import {execFileSync} from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPTS = resolve(ROOT, '..', 'scripts');
const VOICE_MODELS = resolve(ROOT, '..', 'voice', 'models');
const PUBLIC_VOICE = join(ROOT, 'public', 'voice');
const TIMINGS = join(ROOT, 'src', 'generated', 'timings');

const FPS = 30;
const GAP_FRAMES = 8; // silence between lines
const PIPER = process.env.PIPER_BIN || 'piper';

const VOICES = {
  en: {model: 'en-en_US-lessac-medium.onnx', config: 'en-en_US-lessac-medium.onnx.json'},
  de: {model: 'de-de_DE-thorsten-medium.onnx', config: 'de-de_DE-thorsten-medium.onnx.json'},
};

const findNarrations = () => {
  const out = [];
  const scan = (dir, depth) => {
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
      if (entry.isDirectory()) {
        if (depth < 2) scan(join(dir, entry.name), depth + 1);
      } else if (entry.name.endsWith('.narration.json')) {
        out.push(join(dir, entry.name));
      }
    }
  };
  scan(SCRIPTS, 0);
  return out.sort();
};

const wavDuration = (p) => {
  const raw = execFileSync('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'csv=p=0',
    p,
  ]);
  return parseFloat(raw.toString().trim());
};

const synthLine = (text, lang, outWav) => {
  mkdirSync(dirname(outWav), {recursive: true});
  const v = VOICES[lang];
  const txt = join(dirname(outWav), `.line-${Date.now()}.txt`);
  writeFileSync(txt, text);
  execFileSync(PIPER, [
    '-m', join(VOICE_MODELS, v.model),
    '-c', join(VOICE_MODELS, v.config),
    '-i', txt,
    '-f', outWav,
    '--sentence-silence', '0.05',
  ], {stdio: 'inherit'});
  rmSync(txt, {force: true});
  return wavDuration(outWav);
};

const main = (onlyId) => {
  let done = 0;
  let failed = 0;
  for (const file of findNarrations()) {
    const n = JSON.parse(readFileSync(file, 'utf8'));
    if (onlyId && n.id !== onlyId) continue;
    const lang = n.language;
    mkdirSync(join(TIMINGS, n.id), {recursive: true});
    const lines = n.lines.map((l, i) => ({...l, index: i}));
    const outLines = [];
    let cursor = 0;
    for (const l of lines) {
      const wav = join(PUBLIC_VOICE, n.id, lang, `${l.id}.wav`);
      let secs;
      if (existsSync(wav)) {
        secs = wavDuration(wav);
      } else {
        console.log(`[tts] ${n.id}/${lang} ${l.id}: ${l.text.slice(0, 48)}…`);
        secs = synthLine(l.text, lang, wav);
      }
      const durF = Math.max(12, Math.round(secs * FPS));
      outLines.push({
        id: l.id,
        text: l.text,
        startFrame: cursor,
        endFrame: cursor + durF,
        durationFrames: durF,
        gapBefore: cursor === 0 ? 0 : GAP_FRAMES,
      });
      cursor += durF + GAP_FRAMES;
    }
    const totalFrames = Math.max(...outLines.map((l) => l.endFrame));
    const timing = {
      id: n.id,
      language: lang,
      fps: FPS,
      gapFrames: GAP_FRAMES,
      lines: outLines,
      totalFrames,
      voiceSeconds: Math.round((totalFrames / FPS) * 1000) / 1000,
    };
    writeFileSync(
      join(TIMINGS, n.id, `${lang}.json`),
      JSON.stringify(timing, null, 2)
    );
    done += 1;
    console.log(`[tts] ${n.id}/${lang}: ${outLines.length} lines -> ${timing.voiceSeconds}s`);
  }
  if (done === 0) console.log('[tts] nothing to do');
  if (failed > 0) process.exit(1);
};

main(process.argv[2]);
