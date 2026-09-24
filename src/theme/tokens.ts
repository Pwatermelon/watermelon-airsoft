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

export type WeaponClassId = 'secondary' | 'primary' | 'sniper' | 'banned';

export type WeaponClass = {
  id: WeaponClassId;
  title: string;
  shortTitle: string;
  description: string;
  maxJoules: number;
  minDistanceM: number | null;
  color: string;
};

export const WEAPON_CLASSES: WeaponClass[] = [
  {
    id: 'secondary',
    title: 'Вторичка',
    shortTitle: 'Вторичка',
    description: 'Пистолеты, автоматы в здании',
    maxJoules: 1.5,
    minDistanceM: 0,
    color: colors.green,
  },
  {
    id: 'primary',
    title: 'Основное',
    shortTitle: 'Основное',
    description: 'Автомат на открытой местности',
    maxJoules: 2.4,
    minDistanceM: 10,
    color: colors.accent,
  },
  {
    id: 'sniper',
    title: 'Снайперка',
    shortTitle: 'Снайперка',
    description: 'Только одиночный огонь (болтовка, полуавтомат)',
    maxJoules: 3.0,
    minDistanceM: 30,
    color: colors.warn,
  },
  {
    id: 'banned',
    title: 'Не допуск',
    shortTitle: 'Не допуск',
    description: 'К игре не допускается',
    maxJoules: Infinity,
    minDistanceM: null,
    color: colors.danger,
  },
];

export const BB_WEIGHTS = [
  0.2, 0.23, 0.25, 0.28, 0.3, 0.32, 0.36, 0.4, 0.43, 0.45,
] as const;

export const VELOCITY_MIN = 80;
export const VELOCITY_MAX = 180;
