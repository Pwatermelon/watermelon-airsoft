import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BB_WEIGHTS, colors, radius, spacing } from '@/src/theme/tokens';
import { formatWeight } from '@/src/lib/calculator';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function WeightChips({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Пресеты</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {BB_WEIGHTS.map((w) => {
          const active = Math.abs(w - value) < 0.001;
          return (
            <Pressable
              key={w}
              onPress={() => onChange(w)}
              style={[styles.chip, active && styles.chipActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {formatWeight(w)} г
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontFamily: 'DMSans_500Medium',
  },
  row: {
    gap: 8,
    paddingRight: spacing.md,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  chipText: {
    color: colors.muted,
    fontSize: 14,
    fontFamily: 'IBMPlexMono_500Medium',
  },
  chipTextActive: {
    color: colors.text,
  },
});
