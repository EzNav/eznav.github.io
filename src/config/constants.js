import firebase from "firebase";
const config = {apiKey: "AIzaSyA8dKseb2A6mj3Dyuinu-Olq3oCfCWwqdg",
    authDomain: "wac-registration.firebaseapp.com",
    databaseURL: "https://wac-registration.firebaseio.com",
    projectId: "wac-registration",
    storageBucket: "wac-registration.appspot.com",
    messagingSenderId: "681293987498",
    appId: "1:681293987498:web:662784e0e36b326b55dad3"};firebase.initializeApp(config);export const ref = firebase.database().ref();export const firebaseAuth = firebase.auth
