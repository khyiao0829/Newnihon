import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';

import Login from './Login'; // Login.js 파일 경로에 따라 수정
import Signup from './Signup'; // Signup.js 파일 경로에 따라 수정
import Learning from './Learning'; // Learning.js 파일 경로에 따라 수정
import SignupComplete from './SignupComplete'; // SignupComplete.js 파일 경로에 따라 수정
import { onAuthStateChanged, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
//import { initializeApp } from "firebase/app";
import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

const Stack = createStackNavigator();

export default function App(){

  /*useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //const navigation = useNavigation();
        //navigation.replace('Learning');
        <Stack.Screen name="Learning" component={App} />
      }
    });
  
    return unsubscribe;
  }, []);*/

return (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // 헤더 비활성화
      }}
      >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Learning" component={Learning} />
      <Stack.Screen name="SignupComplete" component={SignupComplete} />
    </Stack.Navigator>
  </NavigationContainer>
);
}
  