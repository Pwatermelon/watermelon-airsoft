export const colors = {
  bg: '#0c0c0f',
  surface: '#15151a',
  surfaceElevated: '#1c1c24',
  border: '#2a2a35',
  text: '#f0f0f5',
  muted: '#8b8b9a',
  accent: '#e84855',
  accentHover: '#ff5c6a',
  accentSoft: 'rgba(232, 72, 85, 0.15)',
  platinum: '#c9b896',
  platinumGlow: 'rgba(201, 184, 150, 0.25)',
  green: '#3dd68c',
  danger: '#ef4444',
  warn: '#e8c35a',
  inputBg: '#101014',
  white: '#FFFFFF',
} as const;

export const radius = {
  md: 12,
  lg: 18,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/** Re-export regulation types for convenience */
export type { WeaponClass, WeaponClassId, RegulationId } from '../data/regulations';

export const BB_WEIGHTS = [
  0.12, 0.2, 0.23, 0.25, 0.28, 0.3, 0.32, 0.36, 0.4, 0.43, 0.45, 0.48, 0.5,
] as const;

export const WEIGHT_MIN = 0.12;
export const WEIGHT_MAX = 0.5;

export const VELOCITY_MIN = 60;
export const VELOCITY_MAX = 200;
