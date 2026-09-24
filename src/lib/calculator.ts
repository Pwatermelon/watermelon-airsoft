import { WEAPON_CLASSES, type WeaponClass } from '@/src/theme/tokens';

/** E = ½ × m × v², mass in grams → kilograms */
export function calculateEnergyJoules(weightGrams: number, velocityMs: number): number {
  const massKg = weightGrams / 1000;
  return 0.5 * massKg * velocityMs * velocityMs;
}

/** Equivalent muzzle velocity for a reference BB weight at the same energy */
export function equivalentVelocity(energyJoules: number, targetWeightGrams: number): number {
  const massKg = targetWeightGrams / 1000;
  if (massKg <= 0 || energyJoules <= 0) return 0;
  return Math.sqrt((2 * energyJoules) / massKg);
}

export function getWeaponClass(energyJoules: number): WeaponClass {
  for (const cls of WEAPON_CLASSES) {
    if (energyJoules <= cls.maxJoules) return cls;
  }
  return WEAPON_CLASSES[WEAPON_CLASSES.length - 1];
}

export function formatEnergy(joules: number): string {
  return joules.toFixed(2);
}

export function formatVelocity(ms: number): string {
  return Math.round(ms).toString();
}

export function formatWeight(grams: number): string {
  return (Math.round(grams * 100) / 100).toFixed(2);
}
