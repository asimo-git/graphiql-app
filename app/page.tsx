'use client';
import MainWelcome from './components/main/MainWelcome';
import MainHome from './components/main/MainHome';
import { useAuthenticated } from './utils/Auth';
import styles from './components/main/Main.module.scss';

export default function Welcome() {
  const { user, isLoading } = useAuthenticated();
  return (
    <>
      {isLoading ? (
        user ? (
          <MainHome />
        ) : (
          <MainWelcome />
        )
      ) : (
        <main className={styles.main}></main>
      )}
    </>
  );
}
