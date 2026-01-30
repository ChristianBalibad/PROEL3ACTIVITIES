import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="todo-list"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="todo-list"
        options={{
          title: 'Todo',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checklist" color={color} />,
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: 'Counter',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plusminus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="theme-toggler"
        options={{
          title: 'Theme',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="moon.stars.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="redux-counter"
        options={{
          title: 'Redux',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="arrow.triangle.2.circlepath" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fetch-user-data-react-query"
        options={{
          title: 'Query',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cloud.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="zustand-counter"
        options={{
          title: 'Zustand',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bolt.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
