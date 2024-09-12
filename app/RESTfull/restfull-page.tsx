'use client';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './RESTfull.scss';
import RESTfullForm from '../components/RESTfull-form/RESTfullform';

export default function RESTfullPage() {
  return (
    <>
      <Header />
      <main className="main">
        <RESTfullForm />
      </main>
      <Footer />
    </>
  );
}
