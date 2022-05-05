import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAL6OjhcqUOWNyOm3Vomf6OHDktBXGt_OI",
  authDomain: "theline-e8b86.firebaseapp.com",
  projectId: "theline-e8b86",
  storageBucket: "theline-e8b86.appspot.com",
  messagingSenderId: "112026775227",
  appId: "1:112026775227:web:248026301b8c355d1c839e",
  measurementId: "G-GMK4XYCQY4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ experimentalForceLongPolling: true });
}

export const db = firebase.firestore()
export const auth = firebase.auth();
export const storage = firebase.storage()
export const facebookProvider = firebase.auth.FacebookAuthProvider;
export const googleProvider = firebase.auth.GoogleAuthProvider;
