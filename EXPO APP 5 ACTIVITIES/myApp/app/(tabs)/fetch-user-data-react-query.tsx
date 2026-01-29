import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

async function fetchUser(): Promise<User> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  if (!response.ok) throw new Error('Failed to fetch user.');
  return (await response.json()) as User;
}

const queryClient = new QueryClient();

function UserCard() {
  const userQuery = useQuery({
    queryKey: ['user', 1],
    queryFn: fetchUser,
  });

  return (
    <ThemedView style={styles.card}>
      {userQuery.isLoading ? (
        <ThemedText>Loading user...</ThemedText>
      ) : userQuery.isError ? (
        <ThemedText>Something went wrong. Try again.</ThemedText>
      ) : !userQuery.data ? (
        <ThemedText>No user data.</ThemedText>
      ) : (
        <>
          <ThemedText type="subtitle">{userQuery.data.name}</ThemedText>
          <ThemedText>@{userQuery.data.username}</ThemedText>
          <ThemedText>{userQuery.data.email}</ThemedText>
        </>
      )}

      <View style={styles.row}>
        <Pressable
          onPress={() => userQuery.refetch()}
          style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Refetch
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

export default function FetchUserDataReactQueryScreen() {
  const client = useMemo(() => queryClient, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0FDFA', dark: '#042F2E' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#0F766E"
          name="cloud.fill"
          style={styles.headerImage}
        />
      }>
      <QueryClientProvider client={client}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Fetch User Data</ThemedText>
          <ThemedText type="subtitle">State with React Query (Server State)</ThemedText>

          <UserCard />
        </ThemedView>
      </QueryClientProvider>
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
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 8,
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

