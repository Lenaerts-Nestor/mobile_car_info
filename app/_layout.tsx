import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#1a202c',
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerShadowVisible: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: "Car Brands",
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen 
        name="brand/[id]" 
        options={{
          headerShown: false, // This removes the header space completely
        }}
      />
    </Stack>
  );
}

export default RootLayout;