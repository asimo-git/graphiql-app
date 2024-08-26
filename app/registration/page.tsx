import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AuthenticationForm from '../components/authentication-form/AuthenticationForm';
import './authentication.scss';

export default function AuthenticationPage() {
  return (
    <>
      <Header />
      <main>
        <h2>Sign Up</h2>
        <AuthenticationForm formType="reg" />
      </main>
      <Footer />
    </>
  );
}
