import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

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
    <View style={styles.card}>
      {userQuery.isLoading ? (
        <Text style={styles.muted}>Loading user...</Text>
      ) : userQuery.isError ? (
        <Text style={styles.muted}>Something went wrong. Try again.</Text>
      ) : !userQuery.data ? (
        <Text style={styles.muted}>No user data.</Text>
      ) : (
        <>
          <Text style={styles.userName}>{userQuery.data.name}</Text>
          <Text style={styles.userLine}>@{userQuery.data.username}</Text>
          <Text style={styles.userLine}>{userQuery.data.email}</Text>
        </>
      )}

      <View style={styles.row}>
        <Text style={styles.button} onPress={() => userQuery.refetch()}>
          Refetch
        </Text>
      </View>
    </View>
  );
}

export default function FetchUserDataReactQueryScreen() {
  const client = useMemo(() => queryClient, []);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <QueryClientProvider client={client}>
        <View style={styles.container}>
          <Text style={styles.title}>Fetch User Data</Text>
          <Text style={styles.subtitle}>State with React Query (Server State)</Text>

          <UserCard />
        </View>
      </QueryClientProvider>
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
    backgroundColor: '#F0FDFA',
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
    gap: 8,
  },
  muted: {
    color: '#475569',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  userLine: {
    color: '#0F172A',
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
    color: '#FFFFFF',
    fontWeight: '700',
    overflow: 'hidden',
  },
});

