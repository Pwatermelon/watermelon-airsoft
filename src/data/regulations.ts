export type WeaponClassId = string;

export type WeaponClass = {
  id: WeaponClassId;
  title: string;
  shortTitle: string;
  description: string;
  maxJoules: number;
  color: string;
  banned?: boolean;
};

export type RegulationId = 'fsso' | 'leon';

export type Regulation = {
  id: RegulationId;
  title: string;
  note: string;
  classes: WeaponClass[];
};

/** Федерация страйкбола Саратовской области */
const FSSO_CLASSES: WeaponClass[] = [
  {
    id: 'fsso-cqb',
    title: 'Здания',
    shortTitle: 'Здания',
    description: 'Оружие для игры в зданиях, близкий контакт',
    maxJoules: 1.44,
    color: '#3dd68c',
  },
  {
    id: 'fsso-auto',
    title: 'Автомат',
    shortTitle: 'Автомат',
    description: 'Автоматическое оружие на открытой местности',
    maxJoules: 1.96,
    color: '#e8c35a',
  },
  {
    id: 'fsso-mg',
    title: 'Пулемёт',
    shortTitle: 'Пулемёт',
    description: 'Пулемёты',
    maxJoules: 2.56,
    color: '#f08a3a',
  },
  {
    id: 'fsso-sniper',
    title: 'Снайперка',
    shortTitle: 'Снайперка',
    description: 'Снайперское (конструктивно без очередей)',
    maxJoules: 2.98,
    color: '#ff9f43',
  },
  {
    id: 'fsso-banned',
    title: 'Не допуск',
    shortTitle: 'Не допуск',
    description: 'Свыше лимита снайперки',
    maxJoules: Infinity,
    color: '#e84855',
    banned: true,
  },
];

/** Правила ЛЕОН — лимиты в джоулях */
const LEON_CLASSES: WeaponClass[] = [
  {
    id: 'leon-pistol',
    title: 'Пистолет',
    shortTitle: 'Пистолет',
    description: 'Пистолет',
    maxJoules: 1.44,
    color: '#3dd68c',
  },
  {
    id: 'leon-auto',
    title: 'Автомат',
    shortTitle: 'Автомат',
    description: 'Автомат',
    maxJoules: 1.96,
    color: '#e8c35a',
  },
  {
    id: 'leon-lmg',
    title: 'ЛМГ',
    shortTitle: 'ЛМГ',
    description: 'ЛМГ',
    maxJoules: 2.25,
    color: '#f0a35a',
  },
  {
    id: 'leon-mg',
    title: 'Пулемёт',
    shortTitle: 'Пулемёт',
    description: 'Пулемёты',
    maxJoules: 2.56,
    color: '#f08a3a',
  },
  {
    id: 'leon-sniper',
    title: 'Марксман / снайпер',
    shortTitle: 'Снайпер',
    description: 'Марксманки и снайперские винтовки',
    maxJoules: 2.89,
    color: '#ff9f43',
  },
  {
    id: 'leon-banned',
    title: 'Не допуск',
    shortTitle: 'Не допуск',
    description: 'Свыше лимита снайперки',
    maxJoules: Infinity,
    color: '#e84855',
    banned: true,
  },
];

export const REGULATIONS: Record<RegulationId, Regulation> = {
  fsso: {
    id: 'fsso',
    title: 'ФССО',
    note: 'Федерация страйкбола Саратовской области. В лимиты уже входит погрешность прибора.',
    classes: FSSO_CLASSES,
  },
  leon: {
    id: 'leon',
    title: 'ЛЕОН',
    note: 'Правила ЛЕОН. Лимиты в джоулях.',
    classes: LEON_CLASSES,
  },
};

export const REGULATION_ORDER: RegulationId[] = ['fsso', 'leon'];
