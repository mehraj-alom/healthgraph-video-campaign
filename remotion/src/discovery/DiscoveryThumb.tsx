import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  KineticHeadline,
  Overline,
  HealthGraphLogo,
  PhoneMockup,
  ParticleField,
  theme,
} from '../system';
import {H} from '../system/layout';

const DiscoveryThumb = () => (
  <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: H.leftSafe * 3, boxSizing: 'border-box'}}>
    <ParticleField seed={7} amount={0.4} />
    <div style={{textAlign: 'center', zIndex: 10, maxWidth: '80%'}}>
      <Overline text="DISCOVERY FILM" start={0} />
      <KineticHeadline
        text="Your Health,\nConnected"
        start={20}
        duration={80}
        size={100}
        accentWord={2}
      />
      <HealthGraphLogo start={50} size={80} />
      <Overline text="3 min · 16:9 · English" start={70} />
    </div>
  </AbsoluteFill>
);

export default DiscoveryThumb;