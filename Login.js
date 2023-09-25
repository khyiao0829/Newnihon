import React,{ useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
const firesotre = getFirestore(app);

/*const firebaseConfig = {
    apiKey: "AIzaSyBqhrY74o24qC3Z3CGbvKXcyNUVDe_Oo_4",
    authDomain: "newnihon-f89dd.firebaseapp.com",
    databaseURL: "https://newnihon-f89dd-default-rtdb.firebaseio.com",
    projectId: "newnihon-f89dd",
    storageBucket: "newnihon-f89dd.appspot.com",
    messagingSenderId: "739277304129",
    appId: "1:739277304129:web:5f8673c0c1d217e7a0b1c0",
    measurementId: "G-H8J92C6756"
  };*/

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/*const auth1 = initializeAuth(firebaseApp1, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});*/

export default goLogin=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
  
    const navigation = useNavigation()
  
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Learning');
      }
    });
  
    return unsubscribe;
  }, []);
  
  
  const handleLogin = () =>{
      signInWithEmailAndPassword(auth,email,password)
      //.firestore()
      //.collection("users")
      //.doc(firebase.auth().currentUser.uid)
      .then(userCredentials =>{
        const user = userCredentials.user;
        console.log("Logged in with",user.email);

        const userCollection = collection(firesotre, 'users');
        const userDoc = doc(userCollection, user.uid);

        setDoc(userDoc, { name: ' '})
          .then(() =>{
            console.log('Firestore에 데이터 설정 완료');
          })
          .catch((error)=>{
            console.error('Firesotre 데이터 설정 오류:', error);
          })
       })
       .catch(error => alert(error.message))
    }
  
    const handleSignUp = () =>{
      navigation.replace('Signup')
    }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: windowWidth * 0.1,
          paddingTop: windowHeight * 0.2,
        },
        logo: {
          width: windowWidth * 0.73,
          height: windowHeight * 0.05,
        },
        customText: {
          color: '#990011b2',
          fontSize: windowWidth * 0.035,
          fontWeight: '400',
          textAlign: 'center',
          marginTop: windowHeight * 0.02,
        },
        additionalText: {
          color: '#6e686c',
          fontSize: windowWidth * 0.035,
          fontWeight: '600',
          marginTop: windowHeight * 0.02,
        },
        textInput: {
          width: windowWidth * 0.85,
          height: windowHeight * 0.065,
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#d9d9d9',
          borderRadius: 7,
          marginTop: windowHeight * 0.01,
          paddingHorizontal: windowWidth * 0.02,
          fontSize: windowWidth * 0.04,
          marginBottom: windowHeight * 0.005,
        },
        loginButton: {
          width: windowWidth * 0.85,
          height: windowHeight * 0.065,
          backgroundColor: '#fcf6f5',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: windowHeight * 0.025,
          borderRadius: 20,
        },
        loginButtonText: {
          color: '#990011',
          fontSize: windowWidth * 0.04,
          fontWeight: 'bold',
        },
        space1: {
          height: windowHeight * 0.05,
        },
        space2: {
          height: windowHeight * 0.2,
        },
      });

return (
    <View style={styles.container}>
      <Image source={require('./assets/newnihon_logo.png')} style={styles.logo} />
      <Text style={styles.customText}>언어 학습과 현지 사회에 대한 이해를 한 번에!</Text>
      <View style={styles.space1}></View> 
      <TextInput
        style={styles.textInput}
        placeholder="이메일을 입력하세요."
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="비밀번호를 입력하세요."
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.space2}></View> 
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.additionalText}>계정을 잊으셨나요?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.additionalText}>회원가입이 필요한가요?</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );

  function handleForgotPassword() {
    // "계정을 잊으셨나요?" 클릭 시 수행할 동작
  }

}
