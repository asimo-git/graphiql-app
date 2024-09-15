'use client';

import Link from 'next/link';
import Routes from '@/app/utils/routes';
import styles from './Main.module.scss';
import { useTranslation } from 'react-i18next';
import Info from '../info/Info';

export default function MainWelcome() {
  const { t } = useTranslation();
  return (
    <main className={styles.main}>
      <h1 className={styles.welcome}>{t('Welcome')}!</h1>
      <Link href={Routes.Authentication} className="link">
        {t('Sign in')}
      </Link>
      <Link href={Routes.Registration} className="link">
        {t('Sign Up')}
      </Link>
      <Info />
    </main>
  );
}
