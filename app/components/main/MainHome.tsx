'use client';
import Link from 'next/link';
import Routers from '../../utils/routes';
import styles from './Main.module.scss';
import { auth } from '@/app/services/firebase';
import Info from '../info/Info';
import { useTranslation } from 'react-i18next';

export default function MainHome() {
  const name = auth.currentUser?.displayName;

  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      <h1 className={styles.welcome}>
        {t(`Welcome`)}, {`${name}!`}
      </h1>
      <div className={styles.links}>
        <Link href={Routers.RESTfull} className="link">
          {t('REST Client')}
        </Link>
        <Link href={Routers.GraphiQL} className="link">
          {t('GraphiQL Client')}
        </Link>
        <Link href={Routers.History} className="link">
          {t('History')}
        </Link>
      </div>
      <Info />
    </main>
  );
}
