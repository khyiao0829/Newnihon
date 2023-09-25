import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

export default function Learning({navigation}) {
  return (
    <View style={styles.container}>
    <TouchableOpacity>
      <Image source={require('./assets/menu.png')} style={styles.logo} />
      </TouchableOpacity>
      <Image source={require('./assets/human.png')} style={styles.img} />
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.ButtonText}>오늘의 단어 퀴즈 GO!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor:"#FCF6F5"
  },
  logo: {
    width: 35,
    height: 35,
    top: 35,
  },
  img:{
     justifyContent:'flex-end'
  },
  Button: {
    width: 140,
    height: 35,
    backgroundColor: '#fef65b',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 20,
    top: 1,
  },
  ButtonText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  AdditionalText: {
    color: '#b30101',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 10,
    textAlign:'center',
  },
  Contents:{
    width: 330,
    height: 44,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 5,
    marginTop: 8,
    borderRadius: 8,
    top: 100,

  }
});