import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  Auth,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

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

const handleAuthentication = async (email: string, password: string) => {
  const querySet = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(querySet);
  if (!querySnapshot.empty) {
    await signInWithEmailAndPassword(auth, email, password);
    createNameInLocalStorage(
      String(auth.currentUser?.email?.split('@')[0] || '')
    );
  } else {
    await registerWithEmailAndPassword(email, password);
    createNameInLocalStorage(
      String(auth.currentUser?.email?.split('@')[0] || '')
    );
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const name = email.split('@')[0];
  const user = res.user;
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    authProvider: 'local',
    email,
  });
};

const logout = (auth: Auth) => {
  signOut(auth);
};

function createNameInLocalStorage(name: string) {
  localStorage.setItem('name', name);
}
export { auth, db, registerWithEmailAndPassword, logout, handleAuthentication };
