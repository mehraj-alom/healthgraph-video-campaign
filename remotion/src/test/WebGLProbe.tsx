/** Minimal Three.js probe — temporary diagnostic. */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';

const Probe: React.FC = () => {
  const camera = React.useMemo(() => new THREE.PerspectiveCamera(50, 1080 / 1920, 0.1, 100), []);
  camera.position.set(0, 0, 6);
  camera.lookAt(0, 0, 0);
  return (
    <AbsoluteFill style={{backgroundColor: '#101820'}}>
      <ThreeCanvas
        width={1080}
        height={1920}
        camera={camera}
        gl={{antialias: true, alpha: false}}
        style={{backgroundColor: '#101820'}}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={2} />
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.6, 48, 48]} />
          <meshStandardMaterial color={0x7fc48d} emissive={0x2e8b7a} emissiveIntensity={0.5} />
        </mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

export default Probe;