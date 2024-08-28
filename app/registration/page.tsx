import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';

export default function AuthenticationPage() {
  return (
    <>
      <Header />
      <main className="main">
        <h2>Sign Up</h2>
        <AuthenticationForm formType="reg" />
      </main>
      <Footer />
    </>
  );
}
