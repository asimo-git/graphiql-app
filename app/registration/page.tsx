'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';
import { useTranslation } from 'react-i18next';

export default function AuthenticationPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="main">
        <h2>{t('Sign Up')}</h2>
        <AuthenticationForm formType="reg" />
      </main>
      <Footer />
    </>
  );
}
