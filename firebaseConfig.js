// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJa5-Nu5r-izN80fjBfzhgKmck2NuD9_4',
  authDomain: 'marketplace-f65c0.firebaseapp.com',
  databaseURL:
    'https://marketplace-f65c0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'marketplace-f65c0',
  storageBucket: 'marketplace-f65c0.appspot.com',
  messagingSenderId: '33038217968',
  appId: '1:33038217968:web:4bcdb54c208b93cb5c4835',
  measurementId: 'G-LZZXTCJH2M',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const auth = getAuth(app);
const db = getFirestore(app)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export { auth, db }

//android client id
//33038217968-n3sj03vqfmqacvatp7op14nvgej1em7p.apps.googleusercontent.com
