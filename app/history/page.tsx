'use client';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '../utils/Auth';
import Routes from '../utils/routes';
import HistoryList from '../components/History-list/HistoryList';

export default function HistoryPage() {
  const router = useRouter();

  const { user, isLoading } = useAuthenticated();

  return (
    <>
      {isLoading ? (
        user ? (
          <>
            <main className="main">
              <HistoryList />
            </main>
          </>
        ) : (
          router.push(Routes.Home)
        )
      ) : null}
    </>
  );
}
