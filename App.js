import React,{ useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';


import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import Login from './Login';
import Signup from './Signup';
import Learning from './Learning';
import Review from './Review';
import Vocabulary from './Vocabulary';
import SignupComplete from './SignupComplete';
import SideMenu from './SideMenu';
import WordQuiz from './WordQuiz';
import Article from './Article';
import Score from './ScorePage'

import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const auth = getAuth(app);



function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupComplete" component={SignupComplete} />
      <Stack.Screen name="Learning" component={Learning} />
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="WordQuiz" component={WordQuiz} />
      <Stack.Screen name="Score" component={Score} />
    </Stack.Navigator>
  );
}

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
      <Drawer.Navigator
        drawerContent={(props) => <SideMenu {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "front"
        }}
      >
        <Drawer.Screen name="MainStack" component={MainStack} />
        <Drawer.Screen name="Review" component={Review} />
        <Drawer.Screen name="Vocabulary" component={Vocabulary} />
      </Drawer.Navigator>
    </NavigationContainer>
);
}
  