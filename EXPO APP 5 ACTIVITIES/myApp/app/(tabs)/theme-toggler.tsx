import { createContext, useContext, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

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
  const isDark = theme === 'dark';

  return (
    <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
      <Text style={[styles.cardTitle, isDark ? styles.darkText : styles.lightText]}>
        Current theme: {theme}
      </Text>
      <Text style={isDark ? styles.darkMuted : styles.lightMuted}>
        This is a local theme managed with Context API.
      </Text>

      <View style={styles.row}>
        <Text style={styles.button} onPress={toggleTheme}>
          Toggle theme
        </Text>
      </View>
    </View>
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
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={[styles.header, theme === 'dark' ? styles.headerDark : styles.headerLight]}>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Theme Toggler</Text>
        <Text style={styles.subtitle}>State with Context API</Text>

        <ThemeContext.Provider value={value}>
          <ThemeCard />
        </ThemeContext.Provider>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pageContent: {
    paddingBottom: 28,
  },
  header: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLight: {
    backgroundColor: '#FFF7ED',
  },
  headerDark: {
    backgroundColor: '#431407',
  },
  headerImage: {
    width: 120,
    height: 120,
    opacity: 0.9,
  },
  container: {
    gap: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
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
  lightMuted: {
    color: '#334155',
  },
  darkMuted: {
    color: '#94A3B8',
  },
  lightText: {
    color: '#0F172A',
  },
  darkText: {
    color: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
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
    color: '#FFFFFF',
    fontWeight: '700',
    overflow: 'hidden',
  },
});

