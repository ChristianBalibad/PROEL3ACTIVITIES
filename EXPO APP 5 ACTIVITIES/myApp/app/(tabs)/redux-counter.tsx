import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

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
    <ThemedView style={styles.container}>
      <ThemedText type="title">Counter</ThemedText>
      <ThemedText type="subtitle">State with Redux</ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText type="title">{count}</ThemedText>
        <View style={styles.row}>
          <ActionButton label="Decrement" onPress={actions.decrement} />
          <ActionButton label="Increment" onPress={actions.increment} />
        </View>
      </ThemedView>
    </ThemedView>
  );
}

export default function ReduxCounterScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#EEF2FF', dark: '#111827' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#4F46E5"
          name="arrow.triangle.2.circlepath"
          style={styles.headerImage}
        />
      }>
      <Provider store={store}>
        <ReduxCounterInner />
      </Provider>
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

