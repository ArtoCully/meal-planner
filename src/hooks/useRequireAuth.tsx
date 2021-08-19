import React from 'react';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'src/hooks/useRouter';

function useRequireAuth(redirectUrl = "/signup") {
  const auth = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (auth.currentUser === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);
  return auth;
}

export default useRequireAuth;
