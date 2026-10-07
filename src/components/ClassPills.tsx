import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  WEAPON_CLASSES,
  colors,
  radius,
  type WeaponClassId,
} from '../theme/tokens';

type Props = {
  activeId: WeaponClassId;
};

export function ClassPills({ activeId }: Props) {
  return (
    <View style={styles.wrap}>
      {WEAPON_CLASSES.map((cls) => {
        const active = cls.id === activeId;
        const distance =
          cls.minDistanceM === null ? '>3 Дж' : `${cls.minDistanceM} м`;

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
            <Text style={[styles.title, active && { color: colors.text }]}>
              {cls.shortTitle}
            </Text>
            <Text style={[styles.meta, active && { color: cls.color }]}>
              {distance}
            </Text>
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
    gap: 6,
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
  title: {
    flex: 1,
    color: colors.muted,
    fontSize: 13,
    fontFamily: 'DMSans_600SemiBold',
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    fontFamily: 'IBMPlexMono_400Regular',
  },
});
