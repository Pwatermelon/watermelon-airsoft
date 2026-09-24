import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, type WeaponClass } from '@/src/theme/tokens';

type Props = {
  energy: string;
  equivSpeed: string;
  weaponClass: WeaponClass;
  compact?: boolean;
};

export function EnergyHero({ energy, equivSpeed, weaponClass, compact }: Props) {
  const distanceLabel =
    weaponClass.minDistanceM === null
      ? 'Не допускается'
      : `Мин. дистанция ${weaponClass.minDistanceM} м`;

  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]}>
      <View style={styles.energyBlock}>
        <Text style={styles.caption}>Дульная энергия</Text>
        <View style={styles.energyRow}>
          <Text style={styles.energy}>{energy}</Text>
          <Text style={styles.unit}>Дж</Text>
        </View>
      </View>

      <View style={[styles.divider, compact && styles.dividerH]} />

      <View style={styles.side}>
        <View style={styles.metaBlock}>
          <Text style={styles.caption}>Скорость на 0.20 г</Text>
          <Text style={styles.metaValue}>
            {equivSpeed}
            <Text style={styles.metaUnit}> м/с</Text>
          </Text>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.caption}>{weaponClass.title}</Text>
          <Text style={[styles.classValue, { color: weaponClass.color }]}>
            {distanceLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  wrapCompact: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.lg,
  },
  energyBlock: {
    gap: 6,
  },
  caption: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontFamily: 'DMSans_500Medium',
  },
  energyRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  energy: {
    color: colors.text,
    fontSize: 56,
    lineHeight: 60,
    fontFamily: 'IBMPlexMono_600SemiBold',
  },
  unit: {
    color: colors.accent,
    fontSize: 22,
    marginBottom: 8,
    fontFamily: 'DMSans_600SemiBold',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  dividerH: {
    width: 1,
    height: undefined,
    alignSelf: 'stretch',
  },
  side: {
    gap: spacing.md,
    flex: 1,
  },
  metaBlock: {
    gap: 4,
  },
  metaValue: {
    color: colors.text,
    fontSize: 28,
    fontFamily: 'IBMPlexMono_600SemiBold',
  },
  metaUnit: {
    color: colors.muted,
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
  },
  classValue: {
    fontSize: 18,
    fontFamily: 'DMSans_600SemiBold',
  },
});
