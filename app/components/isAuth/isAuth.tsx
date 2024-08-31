'use client';
import { useAuthenticated } from '../../utils/Auth';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
interface WithAuthProps {
  value: object;
}

export default function withAuth<P extends WithAuthProps>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const auth = useAuthenticated();

    useEffect(() => {
      if (!auth) {
        return redirect('/');
      }
    }, [auth]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
