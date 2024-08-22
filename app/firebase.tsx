import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD1NesFEUCPL26D9n0a8w8C9ozvAla4t40',
  authDomain: 'rest-graphiql-client-e43eb.firebaseapp.com',
  projectId: 'rest-graphiql-client-e43eb',
  storageBucket: 'rest-graphiql-client-e43eb.appspot.com',
  messagingSenderId: '515454689474',
  appId: '1:515454689474:web:0be2040f895b17afce1b5b',
  measurementId: 'G-0FXDW4QGC4',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
