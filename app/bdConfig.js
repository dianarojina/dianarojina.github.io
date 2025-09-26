
// import { initializeApp, getApps } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY_DB,
//   databaseURL: process.env.NEXT_PUBLIC_DB_URL,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJ_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STOR_BUCKET,
//   messagingSenderId: "764142243987",
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: "G-XGXB7RDJR2",
// };

// // Initialize Firebase only once
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// export const database = getDatabase(app);
// export const auth = getAuth(app);

'use client';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // <- добавили
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);

console.log("Database URL:", process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL);

