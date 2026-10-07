import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { BB_WEIGHTS, colors, radius } from '../theme/tokens';
import { formatWeight } from '../lib/calculator';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function WeightChips({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      keyboardShouldPersistTaps="handled"
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
              {formatWeight(w)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 6,
    paddingRight: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    fontSize: 13,
    fontFamily: 'IBMPlexMono_500Medium',
  },
  chipTextActive: {
    color: colors.text,
  },
});
