import { useReducer } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

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

export default function UseReducerCounterScreen() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ECFDF5', dark: '#052E16' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#16A34A"
          name="plusminus"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Counter</ThemedText>
        <ThemedText type="subtitle">State with useReducer</ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText type="title">{count}</ThemedText>
          <View style={styles.row}>
            <ActionButton label="Decrement" onPress={() => dispatch({ type: 'decrement' })} />
            <ActionButton label="Increment" onPress={() => dispatch({ type: 'increment' })} />
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

