'use client';
import { useRouter } from 'next/navigation';
import GraphiQLForm from '../components/GraphQLForm/GraphQLForm';
import styles from '../components/main/Main.module.scss';
import { useAuthenticated } from '../utils/Auth';
import Routes from '../utils/routes';

export default function GraphQLPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthenticated();
  return (
    <>
      {isLoading ? (
        user ? (
          <>
            <main className={styles.main}>
              <GraphiQLForm />
            </main>
          </>
        ) : (
          router.push(Routes.Home)
        )
      ) : null}
    </>
  );
}
