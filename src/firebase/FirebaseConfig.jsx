import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAey8FX2ERmVBxt_3vhCX6dxUzE3S_7u-E",
  authDomain: "myfirstapp-eac4d.firebaseapp.com",
  projectId: "myfirstapp-eac4d",
  storageBucket: "myfirstapp-eac4d.appspot.com",
  messagingSenderId: "200932361471",
  appId: "1:200932361471:web:65cd017d2520fe9b17b8ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FireDB = getFirestore(app);
const auth = getAuth(app);
export {FireDB, auth};
