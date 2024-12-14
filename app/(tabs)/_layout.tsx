import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleAlign: "center",
        
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 30,
        },
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'black',
          borderTopWidth: 1,
          
        },
        tabBarAllowFontScaling: true,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#718096',
        
      }}
    >
      <Tabs.Screen
        
        name="index"
        options={{
          href: '/',
          title: "Home",
          tabBarLabel: "Brands",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="car" size={size} color={color} />
          ),
        }}
      />
     <Tabs.Screen
        name="liked"
        options={{
          title: "Liked List",
          tabBarLabel: "Liked",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="heart" size={size} color={color}  />
          ),
        }}
      />
    </Tabs>
  );
}