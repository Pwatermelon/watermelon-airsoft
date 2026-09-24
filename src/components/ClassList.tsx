import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  WEAPON_CLASSES,
  colors,
  radius,
  spacing,
  type WeaponClassId,
} from '@/src/theme/tokens';

type Props = {
  activeId: WeaponClassId;
};

export function ClassList({ activeId }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Регламент</Text>
      <View style={styles.list}>
        {WEAPON_CLASSES.map((cls) => {
          const active = cls.id === activeId;
          const distance =
            cls.minDistanceM === null
              ? 'свыше 3.0 Дж'
              : `до ${cls.maxJoules.toFixed(1)} Дж · ${cls.minDistanceM} м`;

          return (
            <View
              key={cls.id}
              style={[
                styles.item,
                active && {
                  borderColor: cls.color,
                  backgroundColor: `${cls.color}22`,
                },
              ]}
            >
              <View style={[styles.dot, { backgroundColor: cls.color }]} />
              <View style={styles.body}>
                <View style={styles.titleRow}>
                  <Text style={[styles.title, active && { color: colors.text }]}>
                    {cls.title}
                  </Text>
                  <Text style={[styles.meta, active && { color: cls.color }]}>
                    {distance}
                  </Text>
                </View>
                <Text style={styles.desc}>{cls.description}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  heading: {
    color: colors.muted,
    fontSize: 13,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontFamily: 'DMSans_500Medium',
  },
  list: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  title: {
    color: colors.muted,
    fontSize: 16,
    fontFamily: 'DMSans_600SemiBold',
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  desc: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.85,
    fontFamily: 'DMSans_400Regular',
  },
});
