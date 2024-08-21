import { Link } from '@mui/material';
import styles from './footer.module.css';
import Image from 'next/image';
import { GITHUB_LINKS, RS_REACT_LINK } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.linkContainer}>
        Our team:
        <div>
          <Link
            href={GITHUB_LINKS.MARIA}
            underline="hover"
            className={styles.blockLink}
          >
            Maria G.
          </Link>
          <Link
            href={GITHUB_LINKS.RINA}
            underline="hover"
            className={styles.blockLink}
          >
            Rina K.
          </Link>
          <Link
            href={GITHUB_LINKS.VLADIMIR}
            underline="hover"
            className={styles.blockLink}
          >
            Vladimir B.
          </Link>
        </div>
      </div>
      <div>2024</div>
      <Link href={RS_REACT_LINK}>
        <Image src="/rs.svg" alt="RS school logo" width={24} height={24} />
      </Link>
    </footer>
  );
}
