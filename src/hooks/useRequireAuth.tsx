import React from 'react';
import useUserContext from 'src/hooks/useUserContext';
import { useRouter } from 'src/hooks/useRouter';

function useRequireAuth(redirectUrl = "/signup") {
  const auth = useUserContext();
  const router = useRouter();

  React.useEffect(() => {
    if (auth.currentUser === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);
  return auth;
}

export default useRequireAuth;
