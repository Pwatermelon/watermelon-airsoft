import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/tokens';

const TAB_BAR_CONTENT = 52;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  // Samsung / Android 3-button + gesture bar — не даём системе наехать на табы
  const bottomInset = Math.max(insets.bottom, 8);

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
          height: TAB_BAR_CONTENT + bottomInset,
          paddingTop: 6,
          paddingBottom: bottomInset,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'DMSans_500Medium',
        },
        // Не дублируем safe-area: мы уже заложили insets.bottom в style
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
