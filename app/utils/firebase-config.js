import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:  import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

var app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth, GoogleAuthProvider, signInWithPopup, signOut };