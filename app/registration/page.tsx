'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';
import Routes from '../utils/routes';
import { useAuthenticated } from '../utils/Auth';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export default function AuthenticationPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthenticated();
  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        !user ? (
          <>
            <Header />
            <main className="main">
              <h2>{t('Sign Up')}</h2>
              <AuthenticationForm formType="reg" />
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
