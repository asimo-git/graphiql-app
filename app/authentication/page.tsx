'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '../utils/Auth';
import Routes from '../utils/routes';
import { useTranslation } from 'react-i18next';
import styles from '../components/main/Main.module.scss';

export default function AuthenticationPage() {
  const router = useRouter();
  const user = useAuthenticated();
  const { t } = useTranslation();
  console.log(user);

  return (
    <>
      {user !== undefined ? (
        !user ? (
          <>
            <Header />
            <main className={styles.main}>
              <h2>{t('Sign in')}</h2>
              <AuthenticationForm formType="auth" />
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
