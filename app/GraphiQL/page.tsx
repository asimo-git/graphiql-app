'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import GraphiQLForm from '../components/GraphQLForm/GraphQLForm';
import styles from '../components/main/Main.module.scss';

export default function GraphQLPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <GraphiQLForm />
      </main>
      <Footer />
    </>
  );
}
