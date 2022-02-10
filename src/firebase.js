import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// const db = app.firestore();

export {app, auth, db};