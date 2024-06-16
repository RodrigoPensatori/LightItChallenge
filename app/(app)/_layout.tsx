import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Linking, Pressable, Text } from 'react-native';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {


  return (
    <>
    
    
    <Tabs
      screenOptions={{       
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Patients',
          title: 'Patients',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
    </Tabs>
    
    </>
  );
}
