'use client';
import GraphQLForm from '../components/GraphQLForm/GraphQLForm';
import styles from '../components/main/Main.module.scss';

export default function GraphQLPage() {
  return (
    <>
      <main className={styles.main}>
        <GraphQLForm />
      </main>
    </>
  );
}
