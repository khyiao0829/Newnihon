import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignUp({ navigation }) {
  function handleBackPress() {
    navigation.goBack(); // 뒤로 가기
  }
  function handleLoginButton() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>회원가입이 완료되었습니다</Text>
        <Image source={require('./assets/smile.png')} style={styles.smile} resizeMode="contain"/>
      </View>
      <Text style={styles.text2}>뉴니혼과 함께 일본어 학습의 여정을 시작해보아요!</Text>
      <View style={styles.space}></View> 
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginButton}>
        <Text style={styles.loginButtonText}>로그인하러 가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.1,
    paddingTop: windowHeight * 0.15,
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: windowHeight * 0.025,
  },
  text1: {
    color: '#990011',
    fontSize: windowWidth * 0.05,
    fontWeight: '900',
  },
  smile: {
    width: windowWidth*0.06,
    height: windowHeight*0.03,
    marginLeft: 6,
  },
  text2: {
    color: '#6E696D',
    fontSize: windowWidth * 0.035,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: windowHeight * 0.05,
  },
  space: {
    height: windowHeight * 0.527,
  },
  loginButton: {
    width: '100%',
    height: windowHeight * 0.065,
    backgroundColor: '#fcf6f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  loginButtonText: {
    color: '#990011',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
});