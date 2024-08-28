'use client';

import { Link } from '@mui/material';
import styles from './Main.module.scss';

export default function MainWelcome() {
  const path = '/authentication';
  return (
    <main className={styles.main}>
      <h1 className={styles.welcome}>Welcome!</h1>
      <Link href={path} underline="hover">
        Sign In / Sign Up
      </Link>
    </main>
  );
}
