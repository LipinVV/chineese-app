import firebase from "firebase/compat";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCc65LEKEp4zI6OBLBgcsV7-OH0b8rp1rs",
    authDomain: "chineseapp-59f8f.firebaseapp.com",
    projectId: "chineseapp-59f8f",
    storageBucket: "chineseapp-59f8f.appspot.com",
    messagingSenderId: "785832551842",
    appId: "1:785832551842:web:cf747f711ed2e8e2b2fefb",
    measurementId: "G-DN5CRLS2WV"
};

const app = firebase.initializeApp(firebaseConfig);
export const fireBaseData = app.firestore();
export const fireBaseStorage = app.storage().ref();
