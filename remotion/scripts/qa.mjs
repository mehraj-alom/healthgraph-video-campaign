#!/usr/bin/env node
/**
 * QA pipeline for rendered videos.
 *
 *   node scripts/qa.mjs <id> <path-to-mp4> [1080x1920|1920x1080]
 *
 * Checks: duration, resolution, fps, audio presence, loudness, near-black
 * frames, contact sheet. Writes qa/<id>.json + qa/frames/<id>-sheet.png.
 */
import {execFileSync} from 'node:child_process';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const QA = join(ROOT, '..', 'qa');

const run = (cmd, args) => execFileSync(cmd, args, {stdio: 'pipe'}).toString();

const probe = (mp4) => {
  const raw = run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type,codec_name,width,height,r_frame_rate', '-of', 'json', mp4]);
  return JSON.parse(raw);
};

const nearBlackFrames = (mp4, durationSec) => {
  // sample 4x per second, flag YAVG < 4 (true blank; dark scenes read 8-15)
  const out = run('ffmpeg', [
    '-v', 'info', '-i', mp4,
    '-vf', 'fps=4,signalstats,metadata=print:key=lavfi.signalstats.YAVG',
    '-f', 'null', '-',
  ]);
  const vals = [...out.matchAll(/YAVG:\s*([0-9.]+)/g)].map((m) => parseFloat(m[1]));
  const black = [];
  vals.forEach((v, i) => {
    if (v < 4) black.push(Math.round(i / 4));
  });
  return {sampled: vals.length, avg: vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10 : 0, blackSeconds: black};
};

const loudness = (mp4) => {
  const out = run('ffmpeg', ['-hide_banner', '-i', mp4, '-af', 'volumedetect', '-f', 'null', '-']);
  const mean = out.match(/mean_volume:\s*([-\d.]+) dB/);
  const max = out.match(/max_volume:\s*([-\d.]+) dB/);
  return {meanDb: mean ? parseFloat(mean[1]) : null, maxDb: max ? parseFloat(max[1]) : null};
};

const contactSheet = (mp4, id, w, h) => {
  const out = join(QA, 'frames', `${id}-sheet.png`);
  mkdirSync(join(QA, 'frames'), {recursive: true});
  execFileSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-i', mp4,
    '-vf', `select='not(mod(n\\,60))',scale=${Math.round(w / 4)}:-1,tile=4x3:padding=6:color=0x0B0F16`,
    '-frames:v', '1', out,
  ], {stdio: 'pipe'});
  return out;
};

const main = () => {
  const [, , id, mp4, size] = process.argv;
  if (!id || !mp4) {
    console.error('usage: qa.mjs <id> <mp4> [1080x1920|1920x1080]');
    process.exit(2);
  }
  const [w, h] = (size || '1080x1920').split('x').map(Number);
  const probeData = probe(mp4);
  const fmt = probeData.format || {};
  const streams = probeData.streams || [];
  const v = streams.find((s) => s.codec_type === 'video');
  const a = streams.find((s) => s.codec_type === 'audio');
  const duration = parseFloat(fmt.duration || '0');
  const nb = nearBlackFrames(mp4, duration);
  const vol = loudness(mp4);
  const sheet = contactSheet(mp4, id, w, h);

  const issues = [];
  if (v.width !== w || v.height !== h) issues.push(`resolution ${v.width}x${v.height} != ${w}x${h}`);
  if (!a) issues.push('no audio stream');
  if (vol.maxDb != null && vol.maxDb > -0.5) issues.push(`loudness clipped (max ${vol.maxDb}dB)`);
  if (vol.meanDb != null && vol.meanDb > -16) issues.push(`mean loudness high (${vol.meanDb}dB) — music may overpower narration`);
  if (nb.blackSeconds.length > 0.5 * (nb.sampled / 4)) issues.push(`suspected blank content (${nb.blackSeconds.length}s sampled near-black)`);

  const report = {
    id,
    mp4,
    expected: {width: w, height: h},
    actual: {width: v.width, height: v.height, fps: v.r_frame_rate, codec: v.codec_name, audioCodec: a ? a.codec_name : null},
    durationSec: Math.round(duration * 100) / 100,
    loudness: vol,
    brightness: nb,
    contactSheet: sheet,
    issues,
    passed: issues.length === 0,
    checkedAt: new Date().toISOString(),
  };
  mkdirSync(QA, {recursive: true});
  writeFileSync(join(QA, `${id}.json`), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({id, passed: report.passed, issues, durationSec: report.durationSec, loudness: vol}));
};

main();
