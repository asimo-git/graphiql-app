'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '../utils/Auth';
import Routes from '../utils/routes';
import { useTranslation } from 'react-i18next';

export default function AuthenticationPage() {
  const router = useRouter();
  const user = useAuthenticated();
  const { t } = useTranslation();

  if (user) {
    router.push(Routes.Home);
  }

  return (
    <>
      <Header />
      <main className="main">
        <h2>{t('Sign in')}</h2>
        <AuthenticationForm formType="auth" />
      </main>
      <Footer />
    </>
  );
}
