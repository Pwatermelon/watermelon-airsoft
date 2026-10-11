import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/tokens';

const TAB_BAR_CONTENT = 56;
/** Запас между иконками табов и системными кнопками Samsung */
const BOTTOM_GAP = 20;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 12) + BOTTOM_GAP;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: TAB_BAR_CONTENT + bottomPad,
          paddingTop: 8,
          paddingBottom: bottomPad,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 2,
          fontFamily: 'DMSans_500Medium',
        },
        tabBarSafeAreaInsets: { bottom: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Калькулятор',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wiki"
        options={{
          title: 'Вики',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
