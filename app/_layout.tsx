import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import { FontAwesome } from "@expo/vector-icons";
import "../global.css";
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './utils/notifications';

const RootLayout = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="brand/[id]" 
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}

export default RootLayout;