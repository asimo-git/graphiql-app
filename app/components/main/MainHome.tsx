'use client';

import { Link } from '@mui/material';
import Routers from '../../utils/routes';
import styles from './Main.module.scss';

interface MainHomeProps {
  user: string | null;
}

export default function MainHome({ user }: MainHomeProps) {
  const name = user?.split('@')[0];

  return (
    <main className={styles.main}>
      <h1 className={styles.welcome}>{`Welcome, ${name}!`}</h1>
      <div className={styles.links}>
        <Link href={Routers.RESTfull} underline="hover" marginRight={'2rem'}>
          REST Client
        </Link>
        <Link href={Routers.GraphiQL} underline="hover" marginRight={'2rem'}>
          GraphiQL Client
        </Link>
        <Link href={Routers.History} underline="hover" marginRight={'2rem'}>
          History
        </Link>
      </div>
    </main>
  );
}
