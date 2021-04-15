import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBwqgKgPBbqM8xeCfVb8TWvgYuSyylry7w",
  authDomain: "appoint-2021.firebaseapp.com",
  projectId: "appoint-2021",
  storageBucket: "appoint-2021.appspot.com",
  messagingSenderId: "752419215004",
  appId: "1:752419215004:web:c45d2248b9a433e84f7f59",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
