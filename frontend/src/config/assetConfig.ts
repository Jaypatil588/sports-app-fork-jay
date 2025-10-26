// Asset Configuration - Local Assets
// All assets are downloaded and stored in /public/assets/

import bgVideo from '../assets/bg.mp4';
import cricketVideo from '../assets/cricket.mp4';
import footballVideo from '../assets/football.mp4';

export const videoAssets = {
  hero: bgVideo,
  cricket: cricketVideo,
  soccer: footballVideo,
  tennis: '/assets/videos/tennis-bg.mp4',
  f1: '/assets/videos/f1-bg.mp4',
  basketball: '/assets/videos/basketball-bg.mp4',
  baseball: '/assets/videos/baseball-bg.mp4',
  swimming: '/assets/videos/swimming-bg.mp4',
  chess: '/assets/videos/chess-bg.mp4',
};

export const modelAssets = {
  f1Car: '/assets/models/f1-car.glb',
  sampleModel: '/assets/models/sample-model.glb',
  // Add more models as you download them
  // baseballBat: '/assets/models/baseball-bat.glb',
  // cricketBat: '/assets/models/cricket-bat.glb',
  // soccerBall: '/assets/models/soccer-ball.glb',
  // etc.
};

export const textureAssets = {
  grass: '/assets/textures/grass.jpg',
  wood: '/assets/textures/wood.jpg',
  court: '/assets/textures/court.jpg',
  water: '/assets/textures/water.jpg',
};

export const audioAssets = {
  f1Engine: '/assets/audio/f1-engine.mp3',
  baseballHit: '/assets/audio/baseball-hit.mp3',
  cricketHit: '/assets/audio/cricket-hit.mp3',
  soccerKick: '/assets/audio/soccer-kick.mp3',
  tennisBounce: '/assets/audio/tennis-bounce.mp3',
  basketballSwish: '/assets/audio/basketball-swish.mp3',
  swimmingSplash: '/assets/audio/swimming-splash.mp3',
  chessMove: '/assets/audio/chess-move.mp3',
};

// Preload critical assets
export const preloadAssets = [
  videoAssets.hero,
  // Add more critical assets here
];

// Asset validation
export const validateAsset = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

