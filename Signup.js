import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, Image, SafeAreaView, View,Text, StyleSheet,TextInput,Pressable,Keyboard,Alert,} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore';
//import firebaseConfig from './firebaseConfig';
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

//const firebaseApp = initializeApp(firebaseConfig);
//const firestore = getFirestore(firebaseApp);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Signup=()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Login');
      }
  });
  
    return unsubscribe;
}, []);

const handleBackPress = () => {
  navigation.goBack(); // 뒤로 가기
}
const handleSignUpButton = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials =>{
      const user = userCredentials.user;
      console.log("Signed in with",user.email);
     })
     .catch(error => alert(error.message))
    navigation.navigate('SignupComplete');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>회원가입</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
      <Image source={require('./assets/back.png')} style={styles.back} resizeMode="contain" />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이메일</Text>
          <TextInput
            style={styles.textInput}
            placeholder="이메일을 입력하세요."
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이름</Text>
          <TextInput
            style={styles.textInput}
            placeholder="이름을 입력하세요."
            secureTextEntry={false}
          />
        </View>
      </View>
      <Text style={styles.inputLabel}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
            placeholder="비밀번호를 입력하세요."
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
      <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 다시 한번 입력하세요."
          secureTextEntry={true}
      />
      <View style={styles.space}></View> 
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUpButton}>
        <Text style={styles.signupButtonText}>가입하기</Text>
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
  header: {
    color: '#990011',
    fontSize: windowWidth * 0.06,
    fontWeight: '800',
    alignSelf: 'flex-start',
    marginBottom: windowHeight * 0.05,
  },
  backButton: {
    position: 'absolute',
    right: windowWidth * 0.1,
    top: windowHeight * 0.142,
  },
  back: {
    width: windowWidth*0.09,
    height: windowHeight*0.05,
  },
  formContainer: {
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: windowHeight * 0.02,
  },
  inputLabel: {
    color: '#6e686c',
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: windowWidth * 0.01,
    marginTop: windowHeight * 0.01,
  },
  textInput: {
    width: '100%',
    height: windowHeight * 0.065,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 7,
    marginTop: windowHeight * 0.007,
    paddingHorizontal: windowWidth * 0.02,
    fontSize: windowWidth * 0.04,
  },
  space: {
    height: windowHeight * 0.15,
  },
  signupButton: {
    width: '100%',
    height: windowHeight * 0.065,
    backgroundColor: '#fcf6f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  signupButtonText: {
    color: '#990011',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
});

export default Signup;