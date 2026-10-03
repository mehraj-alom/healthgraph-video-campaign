import React from 'react';
import {registerRoot, Composition} from 'remotion';
import Probe from './src/test/WebGLProbe';
registerRoot(() => (
  <Composition id="Probe" component={Probe} durationInFrames={30} fps={30} width={1080} height={1920} />
));
