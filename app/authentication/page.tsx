'use client';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '../utils/Auth';
import Routes from '../utils/routes';
import { useTranslation } from 'react-i18next';
import styles from '../components/main/Main.module.scss';

export default function AuthenticationPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthenticated();
  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        !user ? (
          <>
            <main className={styles.main}>
              <h2>{t('Sign in')}</h2>
              <AuthenticationForm formType="auth" />
            </main>
          </>
        ) : (
          router.push(Routes.Home)
        )
      ) : null}
    </>
  );
}
