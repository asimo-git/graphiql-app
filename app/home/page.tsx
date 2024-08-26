'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MainHome from '../components/main/MainHome';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('isLogined') === 'true') {
      router.push('/home');
    }
  }
  return (
    <>
      <Header />
      <MainHome />
      <Footer />
    </>
  );
}
