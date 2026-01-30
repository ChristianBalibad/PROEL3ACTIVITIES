import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';

type CounterState = {
  count: number;
};

type CounterAction = { type: 'increment' } | { type: 'decrement' };

function counterReducer(state: CounterState = { count: 0 }, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

function ReduxCounterInner() {
  const count = useSelector((state: CounterState) => state.count);
  const dispatch = useDispatch();

  const actions = useMemo(
    () => ({
      increment: () => dispatch({ type: 'increment' }),
      decrement: () => dispatch({ type: 'decrement' }),
    }),
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <Text style={styles.subtitle}>State with Redux</Text>

      <View style={styles.card}>
        <Text style={styles.count}>{count}</Text>
        <View style={styles.row}>
          <Text style={styles.button} onPress={actions.decrement}>
            Decrement
          </Text>
          <Text style={styles.button} onPress={actions.increment}>
            Increment
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ReduxCounterScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <Provider store={store}>
        <ReduxCounterInner />
      </Provider>
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
    backgroundColor: '#EEF2FF',
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

