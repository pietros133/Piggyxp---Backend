import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.KEY_FIREBASE,
  authDomain: process.env.DOMAIN,
  projectId: process.env.ID_PROJECT,
  storageBucket: process.env.STORAGE,
  messagingSenderId: process.env.MESSAGE,
  appId: process.env.APP_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };