import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClassList } from '@/src/components/ClassList';
import { EnergyHero } from '@/src/components/EnergyHero';
import { ValueSlider } from '@/src/components/ValueSlider';
import { WeightChips } from '@/src/components/WeightChips';
import {
  calculateEnergyJoules,
  equivalentVelocity,
  formatEnergy,
  formatVelocity,
  formatWeight,
  getWeaponClass,
} from '@/src/lib/calculator';
import {
  VELOCITY_MAX,
  VELOCITY_MIN,
  colors,
  spacing,
} from '@/src/theme/tokens';

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const landscape = width > height;

  const [weight, setWeight] = React.useState(0.25);
  const [velocity, setVelocity] = React.useState(120);

  const energy = calculateEnergyJoules(weight, velocity);
  const equiv = equivalentVelocity(energy, 0.2);
  const weaponClass = getWeaponClass(energy);

  const controls = (
    <View style={styles.controls}>
      <WeightChips value={weight} onChange={setWeight} />
      <ValueSlider
        label="Вес шара"
        valueLabel={`${formatWeight(weight)} г`}
        value={weight}
        min={0.2}
        max={0.45}
        step={0.01}
        onChange={setWeight}
      />
      <ValueSlider
        label="Скорость"
        valueLabel={`${formatVelocity(velocity)} м/с`}
        value={velocity}
        min={VELOCITY_MIN}
        max={VELOCITY_MAX}
        step={1}
        onChange={setVelocity}
      />
      <Text style={styles.hint}>
        Подвинь ползунки — активный класс в регламенте подсветится. Удобно перед
        хроном: сразу видно лимит и дистанцию.
      </Text>
    </View>
  );

  const results = (
    <View style={styles.results}>
      <EnergyHero
        energy={formatEnergy(energy)}
        equivSpeed={formatVelocity(equiv)}
        weaponClass={weaponClass}
        compact={landscape}
      />
      <ClassList activeId={weaponClass.id} />
    </View>
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Text style={styles.brand}>Watermelon</Text>
        <Text style={styles.subtitle}>Airsoft · калькулятор Дж</Text>
      </View>

      {landscape ? (
        <View
          style={[
            styles.landscape,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <ScrollView
            style={styles.col}
            contentContainerStyle={styles.colContent}
            showsVerticalScrollIndicator={false}
          >
            {controls}
          </ScrollView>
          <ScrollView
            style={styles.col}
            contentContainerStyle={styles.colContent}
            showsVerticalScrollIndicator={false}
          >
            {results}
          </ScrollView>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.portrait,
            { paddingBottom: Math.max(insets.bottom, 24) + 72 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {results}
          {controls}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: 4,
  },
  brand: {
    color: colors.text,
    fontSize: 28,
    letterSpacing: -0.5,
    fontFamily: 'DMSans_700Bold',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
  },
  portrait: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  landscape: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  col: {
    flex: 1,
  },
  colContent: {
    gap: spacing.lg,
    paddingBottom: spacing.lg,
  },
  controls: {
    gap: spacing.lg,
  },
  results: {
    gap: spacing.lg,
  },
  hint: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'DMSans_400Regular',
  },
});
