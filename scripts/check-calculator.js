#!/usr/bin/env node
function calculateEnergyJoules(weightGrams, velocityMs) {
  const massKg = weightGrams / 1000;
  return 0.5 * massKg * velocityMs * velocityMs;
}
function equivalentVelocity(energyJoules, targetWeightGrams) {
  const massKg = targetWeightGrams / 1000;
  return Math.sqrt((2 * energyJoules) / massKg);
}
function getWeaponClass(energyJoules) {
  if (energyJoules <= 1.5) return 'secondary';
  if (energyJoules <= 2.4) return 'primary';
  if (energyJoules <= 3.0) return 'sniper';
  return 'banned';
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}
const e = calculateEnergyJoules(0.25, 120);
assert(Math.abs(e - 1.8) < 0.01, `expected ~1.80 J, got ${e}`);
assert(Math.round(equivalentVelocity(e, 0.2)) === 134, '0.20g equiv should be 134');
assert(getWeaponClass(e) === 'primary', '1.8 J should be primary');
assert(getWeaponClass(1.4) === 'secondary', '1.4 J secondary');
assert(getWeaponClass(2.8) === 'sniper', '2.8 J sniper');
assert(getWeaponClass(3.1) === 'banned', '3.1 J banned');
console.log('calculator checks passed');
