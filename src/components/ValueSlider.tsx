import React from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { colors, spacing } from '@/src/theme/tokens';

type Props = {
  label: string;
  valueLabel: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function snap(n: number, step: number) {
  const decimals = String(step).includes('.')
    ? String(step).split('.')[1].length
    : 0;
  const snapped = Math.round(n / step) * step;
  return Number(snapped.toFixed(decimals));
}

export function ValueSlider({
  label,
  valueLabel,
  value,
  min,
  max,
  step = 1,
  onChange,
}: Props) {
  const trackWidthRef = React.useRef(1);

  const ratio = (value - min) / (max - min || 1);

  const updateFromX = React.useCallback(
    (locationX: number) => {
      const width = trackWidthRef.current || 1;
      const r = clamp(locationX / width, 0, 1);
      const raw = min + r * (max - min);
      onChange(clamp(snap(raw, step), min, max));
    },
    [max, min, onChange, step],
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

  const onLayout = (e: LayoutChangeEvent) => {
    trackWidthRef.current = e.nativeEvent.layout.width;
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{valueLabel}</Text>
      </View>
      <View
        style={styles.trackHit}
        onLayout={onLayout}
        {...pan.panHandlers}
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min, max, now: value, text: valueLabel }}
      >
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
          <View style={[styles.thumb, { left: `${ratio * 100}%` }]} />
        </View>
        <View style={styles.ends}>
          <Text style={styles.end}>{min}</Text>
          <Text style={styles.end}>{max}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontFamily: 'DMSans_500Medium',
  },
  value: {
    color: colors.text,
    fontSize: 22,
    fontFamily: 'IBMPlexMono_600SemiBold',
  },
  trackHit: {
    paddingVertical: 12,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.inputBg,
    overflow: 'visible',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    marginLeft: -11,
    backgroundColor: colors.text,
    borderWidth: 3,
    borderColor: colors.accentHover,
  },
  ends: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  end: {
    color: colors.muted,
    fontSize: 12,
    fontFamily: 'IBMPlexMono_400Regular',
  },
});
