import { Track } from './types';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Drift',
    artist: 'AI Synthwave',
    url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73456.mp3', // Placeholder synthwave-like track
    duration: 145,
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'Digital Echo',
    url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3',
    duration: 180,
  },
  {
    id: '3',
    title: 'Midnight Grid',
    artist: 'Neural Beats',
    url: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3',
    duration: 160,
  },
];

export const GRID_SIZE = 20;
export const CANVAS_SIZE = 400;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION = 'UP';
