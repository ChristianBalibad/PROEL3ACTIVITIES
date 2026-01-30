import { useMemo, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

type TodoItem = {
  id: string;
  text: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const fallbackDrafts = ['Buy groceries', 'Finish activity', 'Read docs', 'Practice hooks'];

export default function TodoListScreen() {
  const [taskText, setTaskText] = useState('Buy groceries');
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

  function editDraft() {
    if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
      const next = window.prompt('Enter a task', taskText);
      if (next !== null) setTaskText(next);
      return;
    }

    const currentIndex = Math.max(0, fallbackDrafts.indexOf(taskText));
    const next = (currentIndex + 1) % fallbackDrafts.length;
    setTaskText(fallbackDrafts[next]);
  }

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
        <Text style={styles.title}>Todo List</Text>
        <Text style={styles.subtitle}>Local State with useState</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Draft</Text>
          <Text style={styles.draftText}>{taskText || 'Tap “Edit draft” to pick a task'}</Text>

          <View style={styles.row}>
            <Text style={styles.button} onPress={editDraft}>
              Edit draft
            </Text>
            <Text
              style={[styles.button, !canAdd ? styles.buttonDisabled : null]}
              onPress={canAdd ? addTask : undefined}>
              Add
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tasks</Text>

        {tasks.length === 0 ? (
          <Text style={styles.muted}>Nothing yet. Add your first task above.</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.taskRow}>
                <Text style={styles.taskText}>{item.text}</Text>
                <Text style={[styles.button, styles.removeButton]} onPress={() => removeTask(item.id)}>
                  Remove
                </Text>
              </View>
            )}
          />
        )}
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
    backgroundColor: '#E8F0FE',
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
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  draftText: {
    fontSize: 16,
    color: '#0F172A',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#0A7EA4',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 4,
  },
  muted: {
    color: '#475569',
  },
  list: {
    gap: 10,
  },
  taskRow: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  taskText: {
    flex: 1,
    color: '#0F172A',
  },
  removeButton: {
    backgroundColor: '#EF4444',
  },
});

