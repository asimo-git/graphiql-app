'use client';

import { Button } from '@mui/material';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h2>Something went wrong!</h2>
      <Button variant="contained" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  );
}
