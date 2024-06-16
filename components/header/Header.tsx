import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

export default function Header(){
  return (
    
    <View style={styles.container}>
      
        <Image
            source={require('../../images/lightit_logo.png')} 
            style={styles.logo}
        /> 
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5EEF3', 
    paddingHorizontal: 20, 
    width: '100%',
    height:100,
    borderWidth:1,
    borderBottomRightRadius:60,  
  },
  logo: {
    width: 50, 
    height: 50, 
    marginRight: 20, 
    marginTop: 40,
  },
  content: {
    flex: 1, 
    justifyContent: 'center', 
  },
});

