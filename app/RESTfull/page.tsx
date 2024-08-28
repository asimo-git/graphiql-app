'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './RESTfull.scss';
import { useAuthenticated } from '@/app/utils/Auth';
import { useRouter } from 'next/navigation';

export default function RESTfullPage() {
  console.log('рендер страницы');
  const router = useRouter();
  const user = useAuthenticated();
  console.log(user);
  if (!user) {
    console.log('сработал переход');
    router.push('/');
  }

  return (
    <>
      <Header />
      <main>{'доступно зарегестированным'}</main>
      <Footer />
    </>
  );
}
