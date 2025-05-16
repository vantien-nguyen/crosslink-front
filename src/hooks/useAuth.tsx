import { useContext, useDebugValue } from 'react';

import { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
  const { authenticated } = useContext(AuthContext);

  useDebugValue(authenticated, authenticated =>
    authenticated ? 'Signed In' : 'Signed Out',
  );
  return useContext(AuthContext);
};

export default useAuth;
