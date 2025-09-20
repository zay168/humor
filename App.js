import React, { useMemo, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { House, BookOpen, ChartLine, GearSix } from 'phosphor-react-native';

import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ThemeContext, useThemeColors } from './src/contexts/ThemeContext';
import { THEMES } from './src/theme/colors';

const Tab = createBottomTabNavigator();

function RootNavigator() {
  const colors = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingVertical: 6,
          height: 72,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subtext,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 6,
        },
        tabBarIcon: ({ color, focused, size }) => {
          const iconProps = { color, size: size ?? 26, weight: focused ? 'fill' : 'regular' };

          switch (route.name) {
            case 'Accueil':
              return <House {...iconProps} />;
            case 'Journal':
              return <BookOpen {...iconProps} />;
            case 'Statistiques':
              return <ChartLine {...iconProps} />;
            case 'Paramètres':
              return <GearSix {...iconProps} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Statistiques" component={StatsScreen} />
      <Tab.Screen name="Paramètres" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [theme, setTheme] = useState('dark');

  const navigationTheme = useMemo(() => {
    const palette = THEMES[theme] ?? THEMES.dark;
    return {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        background: palette.background,
        card: palette.card,
        text: palette.text,
        border: palette.border,
        primary: palette.accent,
      },
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}
