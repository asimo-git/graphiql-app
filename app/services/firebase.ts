import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  Auth,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    authProvider: 'local',
    email,
  });
  await updateProfile(user, {
    displayName: name,
  });
};

const logout = (auth: Auth) => {
  signOut(auth);
};

export { auth, db, registerWithEmailAndPassword, logout };
