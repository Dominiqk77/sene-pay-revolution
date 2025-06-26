
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';

export const useAuthRedirect = () => {
  const { user } = useAuth();
  const { isSuperAdmin, loading } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user && isSuperAdmin) {
      // Rediriger automatiquement le super admin vers /super-admin
      if (location.pathname === '/' || location.pathname === '/dashboard') {
        console.log('🚨 Super Admin detected - redirecting to /super-admin');
        navigate('/super-admin', { replace: true });
      }
    }
  }, [user, isSuperAdmin, loading, location.pathname, navigate]);

  return { isSuperAdmin, loading };
};
