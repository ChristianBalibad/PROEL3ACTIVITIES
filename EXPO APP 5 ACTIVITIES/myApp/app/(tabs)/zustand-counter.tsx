import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { create } from 'zustand';

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

export default function ZustandCounterScreen() {
  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);
  const decrement = useCounterStore((s) => s.decrement);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Counter</Text>
        <Text style={styles.subtitle}>State with Zustand</Text>

        <View style={styles.card}>
          <Text style={styles.count}>{count}</Text>
          <View style={styles.row}>
            <Text style={styles.button} onPress={decrement}>
              Decrement
            </Text>
            <Text style={styles.button} onPress={increment}>
              Increment
            </Text>
          </View>
        </View>
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
    backgroundColor: '#FDF2F8',
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: 14,
    alignItems: 'center',
  },
  count: {
    fontSize: 40,
    fontWeight: '800',
    color: '#0F172A',
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
    color: '#FFFFFF',
    fontWeight: '700',
    overflow: 'hidden',
  },
});

