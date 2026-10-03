#!/usr/bin/env node
/**
 * Composition registry generator.
 *
 * Scans src/discovery, src/test and src/reels/<id>/manifest.json files and
 * writes src/generated/compositions.tsx. Deterministic — safe for parallel use.
 *
 * A manifest looks like:
 * {
 *   "import": "Reel01",
 *   "thumbnailImport": "Thumbnail01",
 *   "compositions": [
 *     {"name": "Reel01En", "lang": "en", "tailFrames": 90, "width": 1080, "height": 1920},
 *     {"name": "Reel01De", "lang": "de", "tailFrames": 90, "width": 1080, "height": 1920}
 *   ],
 *   "thumbnail": {"name": "Reel01Thumb", "width": 1080, "height": 1080}
 * }
 *
 * duration = timings/<id>/<lang>.json totalFrames + tailFrames
 * (falls back to the manifest's durationSec when no timing file exists yet).
 */
import {existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const TIMINGS = join(SRC, 'generated', 'timings');

const timingDuration = (id, lang, fallbackSec) => {
  const p = join(TIMINGS, id, `${lang}.json`);
  if (existsSync(p)) {
    const t = JSON.parse(readFileSync(p, 'utf8'));
    return t.totalFrames;
  }
  return Math.round((fallbackSec ?? 90) * 30);
};

const collect = () => {
  const items = [];
  for (const dir of ['discovery', 'test']) {
    const mf = join(SRC, dir, 'manifest.json');
    if (existsSync(mf)) items.push({dir, m: JSON.parse(readFileSync(mf, 'utf8'))});
  }
  const reels = join(SRC, 'reels');
  if (existsSync(reels)) {
    for (const sub of readdirSync(reels, {withFileTypes: true})) {
      if (!sub.isDirectory()) continue;
      const mf = join(reels, sub.name, 'manifest.json');
      if (existsSync(mf)) items.push({dir: `reels/${sub.name}`, m: JSON.parse(readFileSync(mf, 'utf8'))});
    }
  }
  return items;
};

const main = () => {
  const items = collect();
  const lines = [
    '// GENERATED FILE — do not edit. Regenerate with `npm run gen`.',
    "import React from 'react';",
    "import {AbsoluteFill, Composition} from 'remotion';",
  ];
  const body = [];
  let idx = 0;
  for (const {dir, m} of items) {
    const id = m.id || (dir === 'discovery' ? 'discovery' : dir.split('/').pop());
    lines.push(`import ${m.import} from '../${dir}/${m.import}';`);
    if (m.thumbnailImport) lines.push(`import ${m.thumbnailImport} from '../${dir}/${m.thumbnailImport}';`);
    for (const c of m.compositions) {
      const dur = timingDuration(id, c.lang, c.durationSec);
      body.push(
        `      <Composition key="${c.name}" id="${c.name}" component={${m.import}} durationInFrames={${dur + (c.tailFrames ?? 0)}} fps={30} width={${c.width}} height={${c.height}} defaultProps={${JSON.stringify({lang: c.lang, ...c.props})}} />`
      );
      idx += 1;
    }
    if (m.thumbnail && m.thumbnailImport) {
      body.push(
        `      <Composition key="${m.thumbnail.name}" id="${m.thumbnail.name}" component={${m.thumbnailImport}} durationInFrames={90} fps={30} width={${m.thumbnail.width}} height={${m.thumbnail.height}} />`
      );
      idx += 1;
    }
  }
  lines.push(
    'export const GeneratedCompositions: React.FC = () => {',
    '  return (',
    '    <>',
    ...body,
    '    </>',
    '  );',
    '};',
    ''
  );
  mkdirSync(join(SRC, 'generated'), {recursive: true});
  writeFileSync(join(SRC, 'generated', 'compositions.tsx'), lines.join('\n'));
  console.log(`[gen] ${idx} compositions registered from ${items.length} manifests`);
};

main();
