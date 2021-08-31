import firebase from "firebase/compat";
import 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
export const fireBaseData = app.firestore();
export const fireBaseStorage = app.storage().ref();

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
