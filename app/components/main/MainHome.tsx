'use client';

import { useEffect, useState } from 'react';
import { Link } from '@mui/material';
import styles from './Main.module.scss';

export default function MainHome() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    setName(storedName);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.welcome}>{`Welcome${name ? `, ${name}` : ''}!`}</h1>
      <div className={styles.links}>
        <Link href={'/rest'} underline="hover" marginRight={'2rem'}>
          REST Client
        </Link>
        <Link href={'/GraphiQL'} underline="hover" marginRight={'2rem'}>
          GraphiQL Client
        </Link>
        <Link href={'/history'} underline="hover" marginRight={'2rem'}>
          History
        </Link>
      </div>
    </main>
  );
}
