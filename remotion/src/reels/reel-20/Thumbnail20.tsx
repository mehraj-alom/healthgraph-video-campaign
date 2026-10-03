import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  KineticHeadline,
  Overline,
  HealthGraphLogo,
  PhoneMockup,
  ParticleField,
  theme,
} from '../../system';
import {H} from '../../system/layout';

const Thumbnail20 = () => (
  <AbsoluteFill style={{backgroundColor: theme.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: H.leftSafe * 2, boxSizing: 'border-box'}}>
    <ParticleField seed={7} amount={0.5} />
    <div style={{textAlign: 'center', zIndex: 10, maxWidth: '90%'}}>
      <Overline text="Meet HealthGraph" start={0} />
      <KineticHeadline
        text={"Your Health\nConnected"}
        start={15}
        duration={60}
        size={72}
        accentWord={1}
      />
      <HealthGraphLogo start={40} size={64} />
    </div>
  </AbsoluteFill>
);

export default Thumbnail20;
