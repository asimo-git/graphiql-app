'use client';
import './RESTfull.scss';
import RESTfullForm from '../components/RESTfull-form/RESTfullform';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '../utils/Auth';
import Routes from '../utils/routes';

export default function RESTfullPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthenticated();

  return (
    <>
      {isLoading ? (
        user ? (
          <>
            <main className="main">
              <RESTfullForm />
            </main>
          </>
        ) : (
          router.push(Routes.Home)
        )
      ) : null}
    </>
  );
}
