'use client';

import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  return (
    <main className="main">
      <div className="main__container">
        <h2 className="title">{t('Something went wrong!')}</h2>
        <Button variant="contained" onClick={reset}>
          {t('Try again')}
        </Button>
      </div>
    </main>
  );
}
