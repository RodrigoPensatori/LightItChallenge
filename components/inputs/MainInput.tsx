import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type MainInputProps = {
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
};

const MainInput = ({ placeholder, value, onChangeText }: MainInputProps) => {
  


  return (
    
    <TextInput
      multiline={true}
      numberOfLines={3} 
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={'#949090'}
      value={value}
      onChangeText={(text)=>{
        onChangeText(text);
      } } 
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.colorPrimary,
    textAlign: 'center',
    margin: 5,
    padding: 2,
    fontSize: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
});

export default MainInput;
