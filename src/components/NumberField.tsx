import React from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

type Props = {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  decimals?: number;
  onChange: (value: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function snap(n: number, step: number, decimals: number) {
  const snapped = Math.round(n / step) * step;
  return Number(snapped.toFixed(decimals));
}

function formatDisplay(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

export function NumberField({
  label,
  unit,
  value,
  min,
  max,
  step,
  decimals = 0,
  onChange,
}: Props) {
  const [text, setText] = React.useState(formatDisplay(value, decimals));
  const [focused, setFocused] = React.useState(false);
  const trackWidthRef = React.useRef(1);

  React.useEffect(() => {
    if (!focused) {
      setText(formatDisplay(value, decimals));
    }
  }, [value, decimals, focused]);

  const commitText = (raw: string) => {
    const normalized = raw.replace(',', '.').trim();
    if (normalized === '' || normalized === '.' || normalized === '-') {
      setText(formatDisplay(value, decimals));
      return;
    }
    const parsed = Number(normalized);
    if (!Number.isFinite(parsed)) {
      setText(formatDisplay(value, decimals));
      return;
    }
    onChange(clamp(snap(parsed, step, decimals), min, max));
  };

  const nudge = (dir: -1 | 1) => {
    onChange(clamp(snap(value + dir * step, step, decimals), min, max));
  };

  const ratio = (value - min) / (max - min || 1);

  const updateFromX = React.useCallback(
    (locationX: number) => {
      const width = trackWidthRef.current || 1;
      const r = clamp(locationX / width, 0, 1);
      const raw = min + r * (max - min);
      onChange(clamp(snap(raw, step, decimals), min, max));
    },
    [decimals, max, min, onChange, step],
  );

  const pan = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e: GestureResponderEvent) => {
          updateFromX(e.nativeEvent.locationX);
        },
        onPanResponderMove: (e: GestureResponderEvent) => {
          updateFromX(e.nativeEvent.locationX);
        },
      }),
    [updateFromX],
  );

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <Pressable
          onPress={() => nudge(-1)}
          style={({ pressed }) => [styles.stepBtn, pressed && styles.stepPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Уменьшить ${label}`}
        >
          <Text style={styles.stepText}>−</Text>
        </Pressable>

        <View style={[styles.inputWrap, focused && styles.inputWrapFocused]}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              commitText(text);
            }}
            onSubmitEditing={() => commitText(text)}
            keyboardType={decimals > 0 ? 'decimal-pad' : 'number-pad'}
            inputMode={decimals > 0 ? 'decimal' : 'numeric'}
            returnKeyType="done"
            selectTextOnFocus
            accessibilityLabel={label}
          />
          <Text style={styles.unit}>{unit}</Text>
        </View>

        <Pressable
          onPress={() => nudge(1)}
          style={({ pressed }) => [styles.stepBtn, pressed && styles.stepPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Увеличить ${label}`}
        >
          <Text style={styles.stepText}>+</Text>
        </Pressable>
      </View>

      <View
        style={styles.trackHit}
        onLayout={(e: LayoutChangeEvent) => {
          trackWidthRef.current = e.nativeEvent.layout.width;
        }}
        {...pan.panHandlers}
        accessibilityRole="adjustable"
        accessibilityLabel={`${label}, ползунок`}
      >
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
          <View style={[styles.thumb, { left: `${ratio * 100}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontFamily: 'DMSans_500Medium',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPressed: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  stepText: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 26,
    fontFamily: 'DMSans_600SemiBold',
  },
  inputWrap: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    gap: 6,
  },
  inputWrapFocused: {
    borderColor: colors.accent,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    paddingVertical: 0,
    fontFamily: 'IBMPlexMono_600SemiBold',
  },
  unit: {
    color: colors.muted,
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  trackHit: {
    paddingVertical: 8,
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
    backgroundColor: colors.text,
    borderWidth: 2,
    borderColor: colors.accentHover,
  },
});
