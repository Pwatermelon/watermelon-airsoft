#!/usr/bin/env node
function calculateEnergyJoules(weightGrams, velocityMs) {
  const massKg = weightGrams / 1000;
  return 0.5 * massKg * velocityMs * velocityMs;
}
function equivalentVelocity(energyJoules, targetWeightGrams) {
  const massKg = targetWeightGrams / 1000;
  return Math.sqrt((2 * energyJoules) / massKg);
}
function getWeaponClass(energyJoules, classes) {
  for (const cls of classes) {
    if (energyJoules <= cls.maxJoules) return cls.id;
  }
  return classes[classes.length - 1].id;
}

const FSSO = [
  { id: 'fsso-cqb', maxJoules: 1.44 },
  { id: 'fsso-auto', maxJoules: 1.96 },
  { id: 'fsso-mg', maxJoules: 2.56 },
  { id: 'fsso-sniper', maxJoules: 2.98 },
  { id: 'fsso-banned', maxJoules: Infinity },
];
const LEON = [
  { id: 'leon-pistol', maxJoules: 1.44 },
  { id: 'leon-auto', maxJoules: 1.96 },
  { id: 'leon-lmg', maxJoules: 2.25 },
  { id: 'leon-mg', maxJoules: 2.56 },
  { id: 'leon-sniper', maxJoules: 2.89 },
  { id: 'leon-banned', maxJoules: Infinity },
];

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const e = calculateEnergyJoules(0.25, 120);
assert(Math.abs(e - 1.8) < 0.01, `expected ~1.80 J, got ${e}`);
assert(Math.round(equivalentVelocity(e, 0.2)) === 134, '0.20g equiv should be 134');

assert(getWeaponClass(1.44, FSSO) === 'fsso-cqb', '1.44 FSSO cqb');
assert(getWeaponClass(1.45, FSSO) === 'fsso-auto', '1.45 FSSO auto');
assert(getWeaponClass(2.56, FSSO) === 'fsso-mg', '2.56 FSSO mg');
assert(getWeaponClass(2.98, FSSO) === 'fsso-sniper', '2.98 FSSO sniper');
assert(getWeaponClass(2.99, FSSO) === 'fsso-banned', '2.99 FSSO banned');

assert(getWeaponClass(1.44, LEON) === 'leon-pistol', '1.44 LEON pistol');
assert(getWeaponClass(2.25, LEON) === 'leon-lmg', '2.25 LEON lmg');
assert(getWeaponClass(2.89, LEON) === 'leon-sniper', '2.89 LEON sniper');
assert(getWeaponClass(2.9, LEON) === 'leon-banned', '2.9 LEON banned');

// weight 0.20 and 0.50 must be in allowed numeric range used by UI
const WEIGHT_MIN = 0.12;
const WEIGHT_MAX = 0.5;
assert(0.2 >= WEIGHT_MIN && 0.2 <= WEIGHT_MAX, '0.2 in weight range');
assert(0.48 >= WEIGHT_MIN && 0.48 <= WEIGHT_MAX, '0.48 in weight range');
assert(0.5 >= WEIGHT_MIN && 0.5 <= WEIGHT_MAX, '0.5 in weight range');

console.log('calculator checks passed');
