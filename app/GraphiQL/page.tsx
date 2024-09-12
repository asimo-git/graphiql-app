'use client';
import GraphiQLForm from '../components/GraphQLForm/GraphQLForm';
import styles from '../components/main/Main.module.scss';

export default function GraphQLPage() {
  return (
    <>
      <main className={styles.main}>
        <GraphiQLForm />
      </main>
    </>
  );
}
