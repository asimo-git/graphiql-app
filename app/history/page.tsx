'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '../utils/Auth';
import Routes from '../utils/routes';
// import { useTranslation } from 'react-i18next';
import HistoryList from '../components/History-list/HistoryList';
import './History.scss';

export default function HistoryPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthenticated();
  // const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        user ? (
          <>
            <Header />
            <main className="main">
              <HistoryList />
            </main>
            <Footer />
          </>
        ) : (
          router.push(Routes.Home)
        )
      ) : null}
    </>
  );
}
