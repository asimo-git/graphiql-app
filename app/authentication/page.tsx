'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '../utils/Auth';
import Routes from '../utils/routes';
import './authentication.scss';

export default function AuthenticationGuard() {
  const router = useRouter();
  const user = useAuthenticated();

  if (user) {
    router.push(Routes.Home);
  }

  return (
    <>
      <Header />
      <main className="main">
        <h2>Sign In / Sign Up</h2>
        <AuthenticationForm />
      </main>
      <Footer />
    </>
  );
}
