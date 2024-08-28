'use client';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MainWelcome from './components/main/MainWelcome';
import MainHome from './components/main/MainHome';
import { useAuthenticated } from './utils/Auth';

export default function Welcome() {
  const user = useAuthenticated();
  return (
    <>
      <Header />
      {user ? <MainHome user={user.email} /> : <MainWelcome />}
      <Footer />
    </>
  );
}
