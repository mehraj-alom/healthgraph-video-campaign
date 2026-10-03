/**
 * <GraphNetwork> — the 3D HealthGraph.
 *
 * A deterministic node/edge network representing a personal health history:
 * category nodes (Event, Visit, Heart, Sleep, Nutrition + document nodes),
 * edges as connections, and a camera that travels through the graph.
 * Built with @remotion/three so every frame is reproducible.
 *
 * Mirrors the real app's graph language: 12 nodes · 22 connections,
 * category colors, "travel through time" camera move.
 *
 * 3D supports storytelling — it never implies diagnosis.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';
import {theme} from './theme';
import {easeInOutCubic} from './easing';

// ── deterministic layout ─────────────────────────────────────────────────────
const CAT = {
  event: 0xc9a86a,
  visit: 0x8b8fa3,
  heart: 0xc2503e,
  sleep: 0x8a7bc8,
  nutrition: 0x4e9b5f,
};

interface NodeDef {
  label: string;
  cat: keyof typeof CAT;
  pos: [number, number, number];
  r: number;
  document?: boolean; // rendered as a thin plane
}

/** Layout: time flows along +x; categories fan out in y/z. */
const NODES: NodeDef[] = [
  {label: 'day -3', cat: 'event', pos: [-4.6, 0.4, 0.2], r: 0.34},
  {label: 'day -2', cat: 'event', pos: [-3.0, -0.5, -0.8], r: 0.34},
  {label: 'today', cat: 'event', pos: [-1.2, 0.6, 0.4], r: 0.42},
  {label: 'visit', cat: 'visit', pos: [0.4, -0.9, 0.9], r: 0.38},
  {label: 'heart', cat: 'heart', pos: [1.6, 1.2, -0.6], r: 0.4},
  {label: 'sleep', cat: 'sleep', pos: [2.6, -0.4, 1.4], r: 0.38},
  {label: 'nutrition', cat: 'nutrition', pos: [3.4, 0.8, -1.0], r: 0.38},
  {label: 'lab report', cat: 'visit', pos: [4.4, -1.2, 0.4], r: 0.34, document: true},
  {label: 'medication', cat: 'visit', pos: [-0.6, -1.6, -1.4], r: 0.3},
  {label: 'symptom', cat: 'event', pos: [0.8, 1.8, 1.6], r: 0.28},
  {label: 'measurement', cat: 'heart', pos: [2.2, -1.6, -1.8], r: 0.28},
  {label: 'meal', cat: 'nutrition', pos: [4.8, 1.8, 0.8], r: 0.26},
];

const EDGES: [number, number][] = [
  [0, 2], [1, 2], [0, 3], [1, 3], [2, 3], [2, 4], [2, 5], [2, 8],
  [3, 6], [4, 5], [4, 10], [5, 6], [5, 11], [6, 7], [6, 11],
  [8, 4], [8, 9], [9, 4], [9, 5], [10, 6], [3, 7], [2, 9],
];

// ── camera keyframes ────────────────────────────────────────────────────────
const CAM_START = new THREE.Vector3(-7.2, 1.6, 6.4);
const CAM_MID = new THREE.Vector3(0.6, 0.9, 5.2);
const CAM_END = new THREE.Vector3(4.4, 0.6, 4.2);

export interface GraphNetworkProps {
  start: number;
  /** frames for the camera travel */
  travelF?: number;
  /** how many edges are revealed (0..EDGES.length) */
  edgeCount?: number;
  /** highlight a node index */
  highlight?: number;
  showLabels?: boolean;
  /** subtle idle rotation of the whole graph */
  idle?: boolean;
}

export const GraphNetwork: React.FC<GraphNetworkProps> = ({
  start,
  travelF = 210,
  edgeCount = EDGES.length,
  highlight = -1,
  showLabels = true,
  idle = true,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + travelF], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeInOutCubic,
  });

  const disposables = React.useMemo(() => {
    const group = new THREE.Group();
    const nodes: THREE.Mesh[] = [];
    const geoms: THREE.BufferGeometry[] = [];

    NODES.forEach((n, i) => {
      let mesh: THREE.Mesh;
      if (n.document) {
        const g = new THREE.BoxGeometry(0.72, 0.94, 0.05);
        const m = new THREE.MeshStandardMaterial({
          color: 0xf5f0e1,
          roughness: 0.9,
          metalness: 0,
          emissive: 0x222018,
          emissiveIntensity: 0.25,
        });
        mesh = new THREE.Mesh(g, m);
      } else {
        const g = new THREE.SphereGeometry(n.r, 40, 40);
        const m = new THREE.MeshStandardMaterial({
          color: CAT[n.cat],
          roughness: 0.35,
          metalness: 0.15,
          emissive: CAT[n.cat],
          emissiveIntensity: 0.16,
        });
        mesh = new THREE.Mesh(g, m);
      }
      mesh.position.set(...n.pos);
      group.add(mesh);
      nodes.push(mesh);
      geoms.push(mesh.geometry);
    });

    const edgeLines: THREE.Line[] = [];
    EDGES.forEach(([a, b], i) => {
      const pa = NODES[a].pos;
      const pb = NODES[b].pos;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...pa),
        new THREE.Vector3(...pb),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: 0x2e8b7a,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(geo, mat);
      line.userData.index = i;
      group.add(line);
      edgeLines.push(line);
      geoms.push(geo);
    });

    // soft "data dust"
    const dustCount = 240;
    const dustPos = new Float32Array(dustCount * 3);
    let seed = 7;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0x100000000;
    };
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (rnd() - 0.5) * 16;
      dustPos[i * 3 + 1] = (rnd() - 0.5) * 9;
      dustPos[i * 3 + 2] = (rnd() - 0.5) * 9;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0x7fc48d,
        size: 0.05,
        transparent: true,
        opacity: 0.5,
      })
    );
    group.add(dust);
    geoms.push(dustGeo);

    // labels via sprites
    const labels: THREE.Sprite[] = [];
    if (showLabels) {
      NODES.forEach((n) => {
        const cv = document.createElement('canvas');
        cv.width = 512;
        cv.height = 128;
        const ctx = cv.getContext('2d');
        if (ctx) {
          ctx.font = '500 44px Arial, sans-serif';
          ctx.fillStyle = 'rgba(244,239,230,0.95)';
          ctx.textAlign = 'center';
          ctx.fillText(n.label.toUpperCase(), 256, 78);
        }
        const tex = new THREE.CanvasTexture(cv);
        const sm = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        });
        const sp = new THREE.Sprite(sm);
        sp.scale.set(2.1, 0.52, 1);
        sp.position.set(n.pos[0], n.pos[1] + n.r + 0.52, n.pos[2]);
        group.add(sp);
        labels.push(sp);
      });
    }

    const disposables = {
      group,
      nodes,
      edgeLines,
      dust,
      labels,
      geoms,
    };
    return disposables;
  }, [showLabels]);

  React.useEffect(
    () => () => {
      disposables.geoms.forEach((g) => g.dispose());
      disposables.nodes.forEach((n) => (n.material as THREE.Material).dispose());
      disposables.edgeLines.forEach((l) => (l.material as THREE.Material).dispose());
    },
    [disposables]
  );

  const camera: THREE.PerspectiveCamera = React.useMemo(
    () =>
      new THREE.PerspectiveCamera(42, 1080 / 1920, 0.1, 100),
    []
  );

  const lookAt = new THREE.Vector3(0.6, 0, 0);

  const Scene = () => {
    const f = useCurrentFrame();
    const pos = new THREE.Vector3();
    pos.lerpVectors(CAM_START, CAM_END, t);
    if (t < 0.5) {
      pos.lerp(CAM_MID, Math.sin(Math.PI * t) * 0.55);
    }
    if (idle) {
      pos.x += Math.sin(f * 0.008) * 0.18;
      pos.y += Math.cos(f * 0.006) * 0.12;
    }
    camera.position.copy(pos);
    camera.lookAt(lookAt);

    const {group, nodes, edgeLines, labels, dust} = disposables;
    const appear = interpolate(f, [start, start + 30], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    group.scale.setScalar(0.9 + 0.1 * appear);
    nodes.forEach((n, i) => {
      const s = interpolate(
        f,
        [start + i * 4, start + i * 4 + 22],
        [0, 1],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      );
      n.scale.setScalar(Math.max(0.001, s));
      if (i === highlight) {
        const pulse = 1 + 0.16 * Math.sin((f - start) * 0.18);
        n.scale.setScalar(Math.max(0.001, s * pulse));
      }
    });
    edgeLines.forEach((l, i) => {
      const mat = l.material as THREE.LineBasicMaterial;
      const p = interpolate(
        f,
        [start + 24 + i * 6, start + 24 + i * 6 + 14],
        [0, 1],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      );
      mat.opacity = i < edgeCount ? 0.42 * p : 0;
    });
    labels.forEach((l, i) => {
      const mat = l.material as THREE.SpriteMaterial;
      const p = interpolate(
        f,
        [start + 10 + i * 4, start + 10 + i * 4 + 18],
        [0, 1],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      );
      mat.opacity = 0.85 * p * appear;
    });
    dust.rotation.y = f * 0.0006;
    return null;
  };

  return (
    <AbsoluteFill style={{backgroundColor: theme.bgDeep}}>
      <ThreeCanvas
        width={1080}
        height={1920}
        camera={camera}
        gl={{antialias: true, alpha: false}}
        style={{backgroundColor: theme.bgDeep}}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} color={0xf4efe6} />
        <pointLight position={[-6, -2, 4]} intensity={0.5} color={0x2e8b7a} />
        <fog attach="fog" args={[theme.bgDeep, 8, 22]} />
        {/* The graph itself: nodes, edges, dust and labels all live in one
            deterministic THREE.Group built in the memo above. It MUST be
            attached to the scene, otherwise nothing renders. */}
        <primitive object={disposables.group} />
        <Scene />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

export {CAT as GRAPH_CAT, NODES as GRAPH_NODES, EDGES as GRAPH_EDGES};
