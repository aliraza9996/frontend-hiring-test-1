// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBNdeXflcgFlaWHXoRj5IdfwG7tDiW9M5s',
  authDomain: 'proptech-1d817.firebaseapp.com',
  projectId: 'proptech-1d817',
  storageBucket: 'proptech-1d817.appspot.com',
  messagingSenderId: '26175189162',
  appId: '1:26175189162:web:b8acec285ab31da25fe0d3',
  measurementId: 'G-DPGFNJ673B',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
