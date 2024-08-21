import Header from './components/header/Header';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>main page</main>
      {/* <Footer/> */}
    </>
  );
}
