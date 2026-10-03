import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(70);
Config.setOverwriteOutput(true);
Config.setEntryPoint('src/index.ts');
Config.setPixelFormat('yuv420p');
