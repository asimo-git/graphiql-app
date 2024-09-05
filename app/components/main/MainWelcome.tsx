'use client';

import { Link } from '@mui/material';
import Routes from '@/app/utils/routes';
import styles from './Main.module.scss';
import { useTranslation } from 'react-i18next';
import Info from '../info/Info';

export default function MainWelcome() {
  const { t } = useTranslation();
  return (
    <main className={styles.main}>
      <h1 className={styles.welcome}>Welcome!</h1>
      <Link href={Routes.Authentication} underline="hover">
        {t('Sign In')}
      </Link>
      <Link href={Routes.Registration} underline="hover">
        {t('Sign Up')}
      </Link>
      <Info />
    </main>
  );
}
