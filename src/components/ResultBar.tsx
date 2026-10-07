import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, type WeaponClass } from '../theme/tokens';

type Props = {
  energy: string;
  equivSpeed: string;
  weaponClass: WeaponClass;
};

export function ResultBar({ energy, equivSpeed, weaponClass }: Props) {
  const distanceLabel =
    weaponClass.minDistanceM === null
      ? 'не допуск'
      : `от ${weaponClass.minDistanceM} м`;

  return (
    <View style={[styles.wrap, { borderColor: weaponClass.color }]}>
      <View style={styles.energyCol}>
        <Text style={styles.caption}>Энергия</Text>
        <View style={styles.energyRow}>
          <Text style={styles.energy}>{energy}</Text>
          <Text style={styles.unit}>Дж</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.metaCol}>
        <Text style={[styles.classTitle, { color: weaponClass.color }]}>
          {weaponClass.title}
        </Text>
        <Text style={styles.meta}>{distanceLabel}</Text>
        <Text style={styles.equiv}>
          0.20 г → {equivSpeed} м/с
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  energyCol: {
    minWidth: 110,
    gap: 2,
  },
  caption: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontFamily: 'DMSans_500Medium',
  },
  energyRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  energy: {
    color: colors.text,
    fontSize: 36,
    lineHeight: 40,
    fontFamily: 'IBMPlexMono_600SemiBold',
  },
  unit: {
    color: colors.accent,
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'DMSans_600SemiBold',
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
  },
  metaCol: {
    flex: 1,
    gap: 2,
  },
  classTitle: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
  },
  meta: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  equiv: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'IBMPlexMono_400Regular',
  },
});
