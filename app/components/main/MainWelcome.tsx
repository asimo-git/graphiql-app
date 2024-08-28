'use client';

import { Link } from '@mui/material';
import Routes from '@/app/utils/routes';
import styles from './Main.module.scss';

export default function MainWelcome() {
  return (
    <main className={styles.main}>
      <h1 className={styles.welcome}>Welcome!</h1>
      <Link href={Routes.Authentication} underline="hover">
        Sign In / Sign Up
      </Link>
    </main>
  );
}
