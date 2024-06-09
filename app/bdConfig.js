import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { getAuth } from 'firebase/auth';

const API_KEY_DB = process.env.API_KEY_DB;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const PROJ_ID = process.env.PROJ_ID;
const STOR_BUCKET = process.env.STOR_BUCKET;
const APP_ID = process.env.APP_ID;
const DB_URL = process.env.DB_URL;

const firebaseConfig = {
  apiKey: `${API_KEY_DB}`,
  databaseURL: `${DB_URL}`,
  authDomain: `${AUTH_DOMAIN}`,
  projectId: `${PROJ_ID}`,
  storageBucket: `${STOR_BUCKET}`,
  messagingSenderId: '764142243987',
  appId: `${APP_ID}`,
  measurementId: 'G-XGXB7RDJR2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
