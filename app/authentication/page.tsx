'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';
import { useRouter } from 'next/navigation';
import './authentication.scss';

export default function AuthenticationPage() {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('isLogined') === 'true') {
      router.push('/home');
    }
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
