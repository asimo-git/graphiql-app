import { Link } from '@mui/material';
import styles from './footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.linkContainer}>
        Our team:
        <div>
          <Link
            href="https://github.com/mgovoru"
            underline="hover"
            className={styles.blockLink}
          >
            Maria G.
          </Link>
          <Link
            href="https://github.com/asimo-git"
            underline="hover"
            className={styles.blockLink}
          >
            {' '}
            Rina K.
          </Link>
          <Link
            href="https://github.com/drbliman"
            underline="hover"
            className={styles.blockLink}
          >
            {' '}
            Vladimir B.
          </Link>
        </div>
      </div>
      <div>2024</div>
      <Link href="https://rs.school/courses/reactjs">
        <Image src="/rs.svg" alt="RS school logo" width={24} height={24} />
      </Link>
    </footer>
  );
}
