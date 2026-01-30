import { useReducer } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

type CounterAction = { type: 'increment' } | { type: 'decrement' };

function counterReducer(state: number, action: CounterAction) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

export default function UseReducerCounterScreen() {
  const [count, dispatch] = useReducer(counterReducer, 0);

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
        <Text style={styles.subtitle}>State with useReducer</Text>

        <View style={styles.card}>
          <Text style={styles.count}>{count}</Text>
          <View style={styles.row}>
            <Text style={styles.button} onPress={() => dispatch({ type: 'decrement' })}>
              Decrement
            </Text>
            <Text style={styles.button} onPress={() => dispatch({ type: 'increment' })}>
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
    backgroundColor: '#ECFDF5',
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

