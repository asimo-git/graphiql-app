'use client';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MainWelcome from './components/main/MainWelcome';
import MainHome from './components/main/MainHome';
import { useAuthenticated } from './utils/Auth';
import styles from './components/main/Main.module.scss';

export default function Welcome() {
  const user = useAuthenticated();
  return (
    <>
      <Header />
      {user !== undefined ? (
        user ? (
          <MainHome />
        ) : (
          <MainWelcome />
        )
      ) : (
        <main className={styles.main}></main>
      )}
      <Footer />
    </>
  );
}
