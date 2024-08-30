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
    <main>
      <h2>{t('Something went wrong!')}</h2>
      <Button variant="contained" onClick={reset}>
        {t('Try again')}
      </Button>
    </main>
  );
}
