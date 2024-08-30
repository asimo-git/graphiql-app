'use client';
import { Link } from '@mui/material';
import Routes from './utils/routes';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main>
      <h2>{t('Not Found')}</h2>
      <p>{t('Could not find requested resource')}</p>
      <Link href={Routes.Home}>{t('Return Home')}</Link>
    </main>
  );
}
