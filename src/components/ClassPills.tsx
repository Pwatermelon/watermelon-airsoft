import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { WeaponClass } from '../data/regulations';
import { colors, radius } from '../theme/tokens';

type Props = {
  classes: WeaponClass[];
  activeId: string;
};

export function ClassPills({ classes, activeId }: Props) {
  return (
    <View style={styles.wrap}>
      {classes.map((cls) => {
        const active = cls.id === activeId;
        const limit =
          cls.banned || !Number.isFinite(cls.maxJoules)
            ? '> лимит'
            : `≤ ${cls.maxJoules.toFixed(2)} Дж`;

        return (
          <View
            key={cls.id}
            style={[
              styles.pill,
              active && {
                borderColor: cls.color,
                backgroundColor: `${cls.color}22`,
              },
            ]}
          >
            <View style={[styles.dot, { backgroundColor: cls.color }]} />
            <View style={styles.body}>
              <Text style={[styles.title, active && { color: colors.text }]}>
                {cls.shortTitle}
              </Text>
              <Text style={[styles.meta, active && { color: cls.color }]}>
                {limit}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pill: {
    flexGrow: 1,
    flexBasis: '47%',
    minWidth: 140,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.muted,
    fontSize: 13,
    fontFamily: 'DMSans_600SemiBold',
  },
  meta: {
    color: colors.muted,
    fontSize: 11,
    fontFamily: 'IBMPlexMono_400Regular',
  },
});
