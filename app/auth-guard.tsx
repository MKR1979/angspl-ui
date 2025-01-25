'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from './store';

const AuthGuard = ({ children }: any) => {
  const router = useRouter();
  const { token } = useSelector((state) => state.globalState);

  useEffect(() => {
    if (token.trim() === '') {
      router.push('/login');
    }
  }, [token, router]);

  return <>{children}</>;
};

export default AuthGuard;
