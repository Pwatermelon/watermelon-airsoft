import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClassPills } from '../../src/components/ClassPills';
import { NumberField } from '../../src/components/NumberField';
import { ResultBar } from '../../src/components/ResultBar';
import { WeightChips } from '../../src/components/WeightChips';
import {
  calculateEnergyJoules,
  equivalentVelocity,
  formatEnergy,
  formatVelocity,
  getWeaponClass,
} from '../../src/lib/calculator';
import {
  VELOCITY_MAX,
  VELOCITY_MIN,
  colors,
  spacing,
} from '../../src/theme/tokens';

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const landscape = width > height;

  const [weight, setWeight] = React.useState(0.25);
  const [velocity, setVelocity] = React.useState(120);

  const energy = calculateEnergyJoules(weight, velocity);
  const equiv = equivalentVelocity(energy, 0.2);
  const weaponClass = getWeaponClass(energy);

  const result = (
    <ResultBar
      energy={formatEnergy(energy)}
      equivSpeed={formatVelocity(equiv)}
      weaponClass={weaponClass}
    />
  );

  const inputs = (
    <View style={styles.inputs}>
      <View style={styles.fieldBlock}>
        <NumberField
          label="Вес шара"
          unit="г"
          value={weight}
          min={0.2}
          max={0.45}
          step={0.01}
          decimals={2}
          onChange={setWeight}
        />
        <WeightChips value={weight} onChange={setWeight} />
      </View>

      <NumberField
        label="Скорость"
        unit="м/с"
        value={velocity}
        min={VELOCITY_MIN}
        max={VELOCITY_MAX}
        step={1}
        decimals={0}
        onChange={setVelocity}
      />

      <ClassPills activeId={weaponClass.id} />
    </View>
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <View style={styles.header}>
        <Text style={styles.brand}>Watermelon</Text>
        <Text style={styles.subtitle}>Airsoft · Дж</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        {landscape ? (
          <View
            style={[
              styles.landscape,
              { paddingBottom: Math.max(insets.bottom, 8) },
            ]}
          >
            <ScrollView
              style={styles.col}
              contentContainerStyle={styles.colContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {inputs}
            </ScrollView>
            <View style={styles.col}>{result}</View>
          </View>
        ) : (
          <View style={styles.portrait}>
            {/* Результат всегда сверху — не надо скроллить к нему */}
            <View style={styles.stickyResult}>{result}</View>

            <ScrollView
              style={styles.flex}
              contentContainerStyle={[
                styles.scrollBody,
                { paddingBottom: Math.max(insets.bottom, 16) + 72 },
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {inputs}
            </ScrollView>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  brand: {
    color: colors.text,
    fontSize: 22,
    letterSpacing: -0.4,
    fontFamily: 'DMSans_700Bold',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
  },
  portrait: {
    flex: 1,
  },
  stickyResult: {
    paddingHorizontal: spacing.md,
    paddingBottom: 10,
  },
  scrollBody: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  landscape: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  col: {
    flex: 1,
  },
  colContent: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  inputs: {
    gap: spacing.md,
  },
  fieldBlock: {
    gap: 8,
  },
});
