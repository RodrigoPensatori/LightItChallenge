import Colors from '@/constants/Colors';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

type MainButtonProps = {
  title: string;
  onPress: () => void;
}

export default function MainButton({ title, onPress }: MainButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text  style={styles.text}>{title}</Text>      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      backgroundColor: Colors.colorPrimary,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 5,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });
