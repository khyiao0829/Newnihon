import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBqhrY74o24qC3Z3CGbvKXcyNUVDe_Oo_4",
    authDomain: "newnihon-f89dd.firebaseapp.com",
    databaseURL: "https://newnihon-f89dd-default-rtdb.firebaseio.com",
    projectId: "newnihon-f89dd",
    storageBucket: "newnihon-f89dd.appspot.com",
    messagingSenderId: "739277304129",
    appId: "1:739277304129:web:5f8673c0c1d217e7a0b1c0",
    measurementId: "G-H8J92C6756"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SideMenu({ navigation }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <DrawerContentScrollView style={{ flex: 1, backgroundColor: '#fff'}}>
  <StatusBar hidden={false} />
  <View style={{ backgroundColor: '#990011',  paddingVertical: windowHeight * 0.035, paddingHorizontal: windowWidth * 0.05, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
  <Image source={require('./assets/kawaii.png')} style={{ width: windowWidth * 0.45, height: windowHeight * 0.09 }} />
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: windowWidth * 0.185 }}>
    <Image source={require('./assets/kawaii2.png')} style={{ width: windowWidth * 0.19, height: windowHeight * 0.08, marginRight: windowWidth * 0.03 }} />
    <Image source={require('./assets/kawaii3.png')} style={{ width: windowWidth * 0.22, height: windowHeight * 0.13 }} />
  </View>
</View>
  <View style={{ marginTop: windowHeight * 0.03, paddingHorizontal: windowHeight * 0.02 }}>
    {/* 메뉴 항목 */}
    <DrawerItem
      label="학습하기"
      labelStyle={{ fontSize: windowWidth * 0.05, color: '#282828', fontWeight: 'bold' }}
      onPress={() => navigation.navigate('Learning')}
      style={{ width: windowWidth * 0.8 }}
    />
    <DrawerItem
      label="복습하기"
      labelStyle={{ fontSize: windowWidth * 0.05, color: '#282828', fontWeight: 'bold' }}
      onPress={() => navigation.navigate('Review')}
      style={{ width: windowWidth * 0.8 }}
    />
    <DrawerItem
      label="핵심 단어장"
      labelStyle={{ fontSize: windowWidth * 0.05, color: '#282828', fontWeight: 'bold' }}
      onPress={() => navigation.navigate('Vocabulary')}
      style={{ width: windowWidth * 0.8 }}
    />
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: windowHeight * 0.03, marginLeft: windowWidth * 0.09 }}>
    <Text style={{ color: '#9b9b9b', fontSize: windowWidth * 0.04, fontWeight: 'bold' }} onPress={handleLogout}>로그아웃</Text>
    <View style={{ width: 2, height: windowHeight * 0.025, backgroundColor: '#d3d3d3', marginLeft: windowWidth * 0.025, borderRadius: 100 }}></View>
  </View>
</DrawerContentScrollView>
  );
}
