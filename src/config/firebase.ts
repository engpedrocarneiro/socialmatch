import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPUtpim6OtlbhH4uH6aoFme92JeWjcCC4",
  authDomain: "socialmatch-84787.firebaseapp.com",
  projectId: "socialmatch-84787",
  storageBucket: "socialmatch-84787.firebasestorage.app",
  messagingSenderId: "427415843570",
  appId: "1:427415843570:web:73b4b42a785c052584966b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);