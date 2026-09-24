import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WIKI_INTRO, WIKI_SECTIONS } from '@/src/data/wiki';
import { colors, radius, spacing } from '@/src/theme/tokens';

export default function WikiScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const landscape = width > height;
  const columns = landscape && width >= 900 ? 2 : 1;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Text style={styles.brand}>Вики</Text>
        <Text style={styles.subtitle}>Джоули, классы, хрон</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 24) + 72,
            flexDirection: columns === 2 ? 'row' : 'column',
            flexWrap: columns === 2 ? 'wrap' : 'nowrap',
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.intro, columns === 2 && styles.fullWidth]}>
          <Text style={styles.introText}>{WIKI_INTRO}</Text>
        </View>

        {WIKI_SECTIONS.map((section) => (
          <View
            key={section.id}
            style={[styles.card, columns === 2 && { width: '48%' }]}
          >
            <Text style={styles.cardTitle}>{section.title}</Text>
            {section.body.map((p) => (
              <Text key={p} style={styles.paragraph}>
                {p}
              </Text>
            ))}
            {section.formula ? (
              <View style={styles.formulaBox}>
                <Text style={styles.formula}>{section.formula}</Text>
              </View>
            ) : null}
            {section.example ? (
              <Text style={styles.example}>{section.example}</Text>
            ) : null}
            {section.bullets?.map((b) => (
              <View key={b} style={styles.bulletRow}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={[styles.footer, columns === 2 && styles.fullWidth]}>
          Всё считается на устройстве, без интернета. Лимиты — по правилам ФССО.
        </Text>
      </ScrollView>
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
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  intro: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    backgroundColor: colors.surface,
  },
  fullWidth: {
    width: '100%',
  },
  introText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'DMSans_400Regular',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 10,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontFamily: 'DMSans_600SemiBold',
  },
  paragraph: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'DMSans_400Regular',
  },
  formulaBox: {
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formula: {
    color: colors.accent,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'IBMPlexMono_600SemiBold',
  },
  example: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'DMSans_400Regular',
  },
  footer: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.sm,
    opacity: 0.7,
    fontFamily: 'DMSans_400Regular',
  },
});
