import type { SportConfig } from '../types';

// Sport Configuration with 3D Background Support
export const sportConfig: Record<string, SportConfig> = {
  Cricket: { 
    icon: '🏏', 
    gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
    suggestions: [
      'Virat Kohli stats', 
      'India vs Australia 2023', 
      'IPL 2024 winners', 
      'T20 World Cup records'
    ],
    backgroundId: 'cricket',
    palette: { primary: '#34d399', secondary: '#059669' },
    iconAnimation: 'cricketSixShot'
  },
  Soccer: { 
    icon: '⚽', 
    gradient: 'linear-gradient(135deg, #10b981 0%, #14532d 100%)',
    suggestions: [
      'Messi career goals', 
      'Premier League table', 
      'Champions League 2024', 
      'World Cup winners'
    ],
    backgroundId: 'soccer',
    palette: { primary: '#10b981', secondary: '#14532d' },
    iconAnimation: 'soccerGoal'
  },
  Tennis: { 
    icon: '🎾', 
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    suggestions: [
      'Novak Djokovic Grand Slams', 
      'US Open 2024', 
      'ATP Rankings', 
      'Wimbledon champions'
    ],
    backgroundId: 'tennis',
    palette: { primary: '#fbbf24', secondary: '#f59e0b' },
    iconAnimation: 'tennisAce'
  },
  F1: { 
    icon: '🏎️', 
    gradient: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
    suggestions: [
      'Max Verstappen wins', 
      'Monaco GP results', 
      'F1 2024 standings', 
      'Lewis Hamilton records'
    ],
    backgroundId: 'f1',
    palette: { primary: '#ef4444', secondary: '#991b1b' },
    iconAnimation: 'f1DriveOut'
  },
  Basketball: { 
    icon: '🏀', 
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    suggestions: [
      'LeBron James stats', 
      'NBA Finals 2024', 
      'Stephen Curry 3-pointers', 
      'Lakers standings'
    ],
    backgroundId: 'basketball',
    palette: { primary: '#f97316', secondary: '#ea580c' },
    iconAnimation: 'basketballSlam'
  },
  Baseball: { 
    icon: '⚾', 
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    suggestions: [
      'Shohei Ohtani stats', 
      'World Series 2024', 
      'MLB home run leaders', 
      'Yankees standings'
    ],
    backgroundId: 'baseball',
    palette: { primary: '#3b82f6', secondary: '#1e40af' },
    iconAnimation: 'baseballHomerun'
  },
  Swimming: { 
    icon: '🏊', 
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)',
    suggestions: [
      'Katie Ledecky records', 
      'Olympics 2024 swimming', 
      'Michael Phelps medals', 
      'World Records freestyle'
    ],
    backgroundId: 'swimming',
    palette: { primary: '#06b6d4', secondary: '#0e7490' },
    iconAnimation: 'swimmingDive'
  },
  Chess: { 
    icon: '♟️', 
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    suggestions: [
      'Magnus Carlsen rating', 
      'World Chess Championship', 
      'Candidates Tournament', 
      'Hikaru Nakamura games'
    ],
    backgroundId: 'chess',
    palette: { primary: '#6366f1', secondary: '#4338ca' },
    iconAnimation: 'chessKnightJump'
  },
};

export const sports = ['Cricket', 'Soccer', 'Tennis', 'F1', 'Basketball', 'Baseball', 'Swimming', 'Chess'] as const;

