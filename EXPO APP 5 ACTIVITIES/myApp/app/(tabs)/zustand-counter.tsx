import { Pressable, StyleSheet, View } from 'react-native';
import { create } from 'zustand';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
}));

function ActionButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}>
      <ThemedText type="defaultSemiBold" style={styles.buttonText}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export default function ZustandCounterScreen() {
  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);
  const decrement = useCounterStore((s) => s.decrement);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FDF2F8', dark: '#3B0764' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#BE185D"
          name="bolt.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Counter</ThemedText>
        <ThemedText type="subtitle">State with Zustand</ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText type="title">{count}</ThemedText>
          <View style={styles.row}>
            <ActionButton label="Decrement" onPress={decrement} />
            <ActionButton label="Increment" onPress={increment} />
          </View>
        </ThemedView>
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
    gap: 14,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#0A7EA4',
  },
  pressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

