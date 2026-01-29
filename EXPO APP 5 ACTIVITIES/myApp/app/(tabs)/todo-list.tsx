import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

type TodoItem = {
  id: string;
  text: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function TodoListScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<TodoItem[]>([]);

  const canAdd = useMemo(() => taskText.trim().length > 0, [taskText]);

  function addTask() {
    const trimmed = taskText.trim();
    if (!trimmed) return;

    setTasks((current) => [{ id: createId(), text: trimmed }, ...current]);
    setTaskText('');
  }

  function removeTask(id: string) {
    setTasks((current) => current.filter((t) => t.id !== id));
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F0FE', dark: '#0F172A' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#2563EB"
          name="checklist"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Todo List</ThemedText>
        <ThemedText type="subtitle">Local State with useState</ThemedText>

        <View style={styles.row}>
          <TextInput
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Enter a task..."
            placeholderTextColor="#7A7A7A"
            style={styles.input}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <Pressable
            onPress={addTask}
            disabled={!canAdd}
            style={({ pressed }) => [
              styles.addButton,
              !canAdd ? styles.addButtonDisabled : null,
              pressed && canAdd ? styles.addButtonPressed : null,
            ]}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Add
            </ThemedText>
          </Pressable>
        </View>

        <ThemedView style={styles.list}>
          {tasks.length === 0 ? (
            <ThemedText>Nothing yet. Add your first task above.</ThemedText>
          ) : (
            tasks.map((task) => (
              <ThemedView key={task.id} style={styles.taskRow}>
                <ThemedText style={styles.taskText}>{task.text}</ThemedText>
                <Pressable
                  onPress={() => removeTask(task.id)}
                  style={({ pressed }) => [styles.removeButton, pressed ? styles.removePressed : null]}>
                  <ThemedText type="defaultSemiBold" style={styles.removeText}>
                    Remove
                  </ThemedText>
                </Pressable>
              </ThemedView>
            ))
          )}
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
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#0A7EA4',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  list: {
    gap: 10,
    paddingTop: 6,
  },
  taskRow: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  taskText: {
    flex: 1,
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#EF4444',
  },
  removePressed: {
    opacity: 0.85,
  },
  removeText: {
    color: '#FFFFFF',
  },
});

