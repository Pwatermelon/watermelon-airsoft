import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  REGULATION_ORDER,
  REGULATIONS,
  type RegulationId,
} from '../data/regulations';
import { colors, radius } from '../theme/tokens';

type Props = {
  value: RegulationId;
  onChange: (id: RegulationId) => void;
};

export function RegulationToggle({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      {REGULATION_ORDER.map((id) => {
        const active = id === value;
        const reg = REGULATIONS[id];
        return (
          <Pressable
            key={id}
            onPress={() => onChange(id)}
            style={[styles.btn, active && styles.btnActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {reg.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnActive: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  text: {
    color: colors.muted,
    fontSize: 15,
    letterSpacing: 0.5,
    fontFamily: 'DMSans_700Bold',
  },
  textActive: {
    color: colors.text,
  },
});
