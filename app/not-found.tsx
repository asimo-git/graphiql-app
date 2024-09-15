'use client';
import Link from 'next/link';
import Routes from './utils/routes';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="main">
      <div className="main__container">
        <h2 className="title">{t('Not Found')}</h2>
        <p>{t('Could not find requested resource')}</p>
        <Link href={Routes.Home} className="link">
          {t('Return Home')}
        </Link>
      </div>
    </main>
  );
}
