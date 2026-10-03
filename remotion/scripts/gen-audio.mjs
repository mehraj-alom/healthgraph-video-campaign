#!/usr/bin/env node
/**
 * Campaign audio. No stock audio: everything is synthesized, seeded and
 * deterministic (approach proven in the repo's healthgraph-de-ad project).
 *
 *   node scripts/gen-audio.mjs          # SFX library + all score beds
 *   node scripts/gen-audio.mjs reel-01  # one video id
 *
 * Outputs:
 *   public/sfx/*.wav            static SFX library (44.1kHz)
 *   public/audio/<id>-<lang>.wav  score bed for one video (22.05kHz, matches voice)
 *
 * Mix policy enforced in compositions: voice 1.0, score ~0.5, sfx 0.4–0.8.
 */
import {existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TIMINGS = join(ROOT, 'src', 'generated', 'timings');
const SFX_DIR = join(ROOT, 'public', 'sfx');
const AUDIO_DIR = join(ROOT, 'public', 'audio');

const TAU = Math.PI * 2;

const lcg = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
};
const hashSeed = (str) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
};

const lowpass = (cutoffHz, sr) => {
  const dt = 1 / sr;
  const rc = 1 / (TAU * cutoffHz);
  const a = dt / (rc + dt);
  let prev = 0;
  return (x) => (prev = prev + a * (x - prev));
};

const fade = (i, n, attack, release) => {
  const t = i / n;
  if (i < attack) return i / Math.max(1, attack);
  if (i > n - release) return Math.max(0, (n - i) / Math.max(1, release));
  return 1;
};

const writeWav = (path, buf, sr) => {
  const n = buf.length;
  const bytes = Buffer.alloc(44 + n * 2);
  const w32 = (o, v) => bytes.writeUInt32LE(v, o);
  const w16 = (o, v) => bytes.writeUInt16LE(v, o);
  // RIFF header
  bytes.write('RIFF', 0);
  w32(4, 36 + n * 2);
  bytes.write('WAVE', 8);
  // fmt chunk
  bytes.write('fmt ', 12);
  w32(16, 16);  // fmt chunk size
  w16(20, 1);   // audio format (PCM)
  w16(22, 1);   // num channels
  w32(24, sr);  // sample rate
  w32(28, sr * 2); // byte rate
  w16(32, 2);   // block align
  w16(34, 16);  // bits per sample
  // data chunk
  bytes.write('data', 36);
  w32(40, n * 2);
  // audio data
  for (let i = 0; i < n; i++) {
    const v = Math.max(-1, Math.min(1, buf[i]));
    const s = Math.round(v * 32767);
    w16(44 + i * 2, s < 0 ? s + 65536 : s);
  }
  writeFileSync(path, bytes);
};

// ─── SFX library (44.1kHz) ──────────────────────────────────────────────────
const SR = 44100;

const sfx = {
  tick: () => {
    const n = Math.floor(0.06 * SR);
    const b = new Float64Array(n);
    const lp = lowpass(5200, SR);
    for (let i = 0; i < n; i++) b[i] = (Math.random() * 2 - 1) * Math.exp((-i / SR) * 90) * 0.5;
    for (let i = 0; i < n; i++) b[i] = lp(b[i]) * 0.5 + Math.sin(TAU * 1900 * (i / SR)) * Math.exp((-i / SR) * 60) * 0.18;
    return {buf: b, sr: SR};
  },
  whoosh: () => {
    const n = Math.floor(0.5 * SR);
    const b = new Float64Array(n);
    const lp = lowpass(900, SR);
    let lp2 = lowpass(2600, SR);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const env = Math.sin(Math.PI * (i / n)) ** 2;
      const sweep = 700 + 1900 * (i / n);
      lp2 = lowpass(sweep, SR);
      b[i] = lp2((Math.random() * 2 - 1) * env) * 0.6 + lp((Math.random() * 2 - 1) * env) * 0.4;
    }
    return {buf: b, sr: SR};
  },
  ping: () => {
    const n = Math.floor(0.18 * SR);
    const b = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      b[i] = Math.sin(TAU * (880 - 300 * t) * t) * Math.exp(-t * 22) * 0.35;
    }
    return {buf: b, sr: SR};
  },
  connect: () => {
    const n = Math.floor(0.42 * SR);
    const b = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const a = Math.sin(TAU * 523.25 * t) * Math.exp(-t * 5) * 0.22;
      const b2 = Math.sin(TAU * 783.99 * t) * Math.exp(-Math.max(0, t - 0.07) * 5) * 0.18;
      b[i] = a + b2;
    }
    return {buf: b, sr: SR};
  },
  pulse: () => {
    const n = Math.floor(0.3 * SR);
    const b = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      b[i] = Math.sin(TAU * 52 * t) * Math.exp(-t * 12) * 0.5 + Math.sin(TAU * 104 * t) * Math.exp(-t * 18) * 0.12;
    }
    return {buf: b, sr: SR};
  },
  page: () => {
    // paper page turn: filtered noise with downward pitch sweep, 240ms
    const n = Math.floor(0.24 * SR);
    const b = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const env = Math.exp(-t * 14) * (1 - Math.exp(-t * 180));
      b[i] = (Math.random() * 2 - 1) * env * 0.28;
    }
    const lp = lowpass(1400, SR);
    for (let i = 1; i < n; i++) b[i] = b[i - 1] * 0.52 + lp(b[i]) * 0.48;
    return {buf: b, sr: SR};
  },
  riser: () => {
    const n = Math.floor(1.6 * SR);
    const b = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      b[i] = (Math.random() * 2 - 1) * t * t * 0.25 * (0.6 + 0.4 * Math.sin(TAU * 6 * t));
    }
    const lp = lowpass(2200, SR);
    for (let i = 0; i < n; i++) b[i] = lp(b[i]);
    return {buf: b, sr: SR};
  },
};

const genSfx = () => {
  mkdirSync(SFX_DIR, {recursive: true});
  for (const [name, fn] of Object.entries(sfx)) {
    const {buf, sr} = fn();
    const out = join(SFX_DIR, `${name}.wav`);
    if (!existsSync(out)) writeWav(out, buf, sr);
  }
  console.log(`[audio] sfx library: ${Object.keys(sfx).length} files`);
};

// ─── Score beds (22.05kHz to match piper voice) ────────────────────────────
const SRV = 22050;

const scoreBed = (id, lang, seconds) => {
  const n = Math.ceil(seconds * SRV);
  const b = new Float64Array(n);
  const rand = lcg(hashSeed(`score:${id}:${lang}`));
  const add = (i, v) => {
    if (i >= 0 && i < n) b[i] += v;
  };
  const f0 = [55, 82.41, 110, 146.83][Math.floor(rand() * 4)]; // root families
  const partials = [
    [1, 0.5], [2, 0.22], [3, 0.12], [4.003, 0.08],
  ];
  const beatSec = 60 / 63; // 63 bpm heartbeat
  for (let i = 0; i < n; i++) {
    const t = i / SRV;
    let s = 0;
    for (const [mult, amp] of partials) {
      const lfo = 0.75 + 0.25 * Math.sin(TAU * 0.05 * t + mult);
      s += Math.sin(TAU * f0 * mult * t) * amp * lfo;
    }
    // heartbeat
    const ph = t % beatSec;
    s += Math.sin(TAU * f0 * 0.5 * t) * Math.exp(-ph * 16) * 0.5;
    // slow shimmer
    s += (rand() * 2 - 1) * 0.012 * (0.5 + 0.5 * Math.sin(TAU * 0.02 * t));
    add(i, s * 0.16);
  }
  // gentle swell every ~10s
  for (let k = 0; k < Math.floor(seconds / 10); k++) {
    const start = Math.floor((k * 10 + 5) * SRV);
    for (let i = 0; i < Math.floor(4 * SRV) && start + i < n; i++) {
      const env = Math.sin(Math.PI * (i / (4 * SRV)));
      add(start + i, Math.sin(TAU * f0 * 2 * (i / SRV)) * env * 0.05);
    }
  }
  const attack = Math.floor(1.5 * SRV);
  const release = Math.floor(2.0 * SRV);
  for (let i = 0; i < n; i++) b[i] *= fade(i, n, attack, release);
  // normalize to -18dB-ish ceiling
  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(b[i]));
  const g = peak > 0 ? 0.32 / peak : 1;
  for (let i = 0; i < n; i++) b[i] *= g;
  return {buf: b, sr: SRV};
};

const genScores = (onlyId) => {
  mkdirSync(AUDIO_DIR, {recursive: true});
  let count = 0;
  for (const idDir of readdirSync(TIMINGS, {withFileTypes: true})) {
    if (!idDir.isDirectory()) continue;
    if (onlyId && idDir.name !== onlyId) continue;
    for (const f of readdirSync(join(TIMINGS, idDir.name))) {
      if (!f.endsWith('.json')) continue;
      const lang = f.replace('.json', '');
      const t = JSON.parse(readFileSync(join(TIMINGS, idDir.name, f), 'utf8'));
      const secs = t.totalFrames / t.fps + 2.5;
      const out = join(AUDIO_DIR, `${idDir.name}-${lang}.wav`);
      if (existsSync(out)) continue;
      const {buf, sr} = scoreBed(idDir.name, lang, secs);
      writeWav(out, buf, sr);
      count += 1;
    }
  }
  console.log(`[audio] ${count} score beds generated`);
};

genSfx();
genScores(process.argv[2]);
