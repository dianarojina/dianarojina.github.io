import { initializeApp } from 'firebase/app';

const API_KEY_DB = process.env.API_KEY_DB;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const PROJ_ID = process.env.PROJ_ID;
const STOR_BUCKET = process.env.STOR_BUCKET;
const APP_ID = process.env.APP_ID;

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

const app = initializeApp(firebaseConfig);
