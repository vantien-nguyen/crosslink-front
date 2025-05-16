import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { refreshToken } from '../../api/Auth';
import { accessToken } from '../../api/axios';
import Loading from '../../components/ui/Loading';
import useAuth from '../../hooks/useAuth';

const PersistSignIn = () => {
  const { authenticated, setAuthenticated } = useAuth();

  if (authenticated)
    return window.location.href.slice(process.env.REACT_APP_API_URL?.length) ===
      '/' ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Outlet />
    );

  const {
    data: refresh,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['refresh'],
    queryFn: () => refreshToken(),
  });

  if (isError) return <Navigate to="/signin" replace />;
  if (isLoading) return <Loading />;
  if (!refresh?.data?.access) return <Navigate to="/signin" replace />;
  if (isSuccess) {
    setAuthenticated(true);
    accessToken.value = refresh.data.access;
    if (
      window.location.href.slice(process.env.REACT_APP_API_URL?.length) === '/'
    ) {
      return <Navigate to="/dashboard" replace />;
    }
  }
  return <Outlet />;
};

export default PersistSignIn;
