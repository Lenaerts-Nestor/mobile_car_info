import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#1a202c',
        headerTitleStyle: {
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#edf2f7',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#718096',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: '/',
          title: "Car Brands",
          tabBarLabel: "Brands",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="car" size={size} color={color} />
          ),
        }}
      />
     <Tabs.Screen
        name="liked"
        options={{
          title: "Liked Models",
          tabBarLabel: "Liked",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}