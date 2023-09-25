import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

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
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  export default {app,auth};
  /*const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);*/