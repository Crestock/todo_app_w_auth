import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDXP8Lp2DgbWn-BI9xTZBsGMx4jvO3-lmw",
  authDomain: "foundry-e2f73.firebaseapp.com",
  databaseURL: "https://foundry-e2f73.firebaseio.com",
  projectId: "foundry-e2f73",
  storageBucket: "foundry-e2f73.appspot.com",
  messagingSenderId: "751589421042",
  appId: "1:751589421042:web:1a6dd4423bdabd3b96056b",
  measurementId: "G-G887KB0HKS"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
