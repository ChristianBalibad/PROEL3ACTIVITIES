import { createContext, useContext, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

type AppTheme = 'light' | 'dark';

type ThemeContextValue = {
  theme: AppTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useTheme must be used inside ThemeContext.Provider');
  }
  return value;
}

function ThemeCard() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemedView
      style={[
        styles.card,
        theme === 'dark' ? styles.darkCard : styles.lightCard,
      ]}>
      <ThemedText type="subtitle" style={theme === 'dark' ? styles.darkText : styles.lightText}>
        Current theme: {theme}
      </ThemedText>
      <ThemedText style={theme === 'dark' ? styles.darkMuted : styles.lightMuted}>
        This is a local theme managed with Context API.
      </ThemedText>

      <View style={styles.row}>
        <Pressable onPress={toggleTheme} style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Toggle theme
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

export default function ThemeTogglerScreen() {
  const [theme, setTheme] = useState<AppTheme>('light');

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFF7ED', dark: '#431407' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#EA580C"
          name="moon.stars.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Theme Toggler</ThemedText>
        <ThemedText type="subtitle">State with Context API</ThemedText>

        <ThemeContext.Provider value={value}>
          <ThemeCard />
        </ThemeContext.Provider>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    opacity: 0.2,
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    gap: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  lightCard: {
    backgroundColor: '#FFFFFF',
  },
  darkCard: {
    backgroundColor: '#0B1220',
    borderColor: '#1F2937',
  },
  lightText: {
    color: '#0F172A',
  },
  darkText: {
    color: '#E5E7EB',
  },
  lightMuted: {
    color: '#334155',
  },
  darkMuted: {
    color: '#94A3B8',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 6,
  },
  button: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#0A7EA4',
    alignSelf: 'flex-start',
  },
  pressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

