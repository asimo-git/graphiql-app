import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
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
  apiKey: 'AIzaSyCEY3OU2eH090d9qHk_pgPx_AmozY3mhq0',
  authDomain: 'graphiql-app-ff29c.firebaseapp.com',
  projectId: 'graphiql-app-ff29c',
  storageBucket: 'graphiql-app-ff29c.appspot.com',
  messagingSenderId: '270529994675',
  appId: '1:270529994675:web:fb8c718ce7e2eca1f075c6',
  measurementId: 'G-N9NSCJ1X6C',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// все ошибки отлавливаются при сабмите формы

const handleAuthentication = async (email: string, password: string) => {
  const querySet = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(querySet);
  if (!querySnapshot.empty) {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('a', auth.currentUser);
  } else {
    await registerWithEmailAndPassword(email, password);
    console.log('r', auth.currentUser);
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

const logout = () => {
  signOut(auth);
};
export { auth, db, registerWithEmailAndPassword, logout, handleAuthentication };
