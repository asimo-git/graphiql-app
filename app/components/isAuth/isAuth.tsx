'use client';
import { IsAuthenticated } from '../../utils/Auth';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
interface WithAuthProps {
  value: object;
}

export default function withAuth<P extends WithAuthProps>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const auth = IsAuthenticated;

    useEffect(() => {
      if (!auth) {
        return redirect('/');
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
