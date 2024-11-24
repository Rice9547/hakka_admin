import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import {useApi} from "./useApi";

export const useAuth = () => {
  const { data, error } = useApi('/admin/auth');
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isAuthenticated && !isLoading) {
        if (data && data.data) {
          setIsAdmin(data.data.isAdmin);
        } else if (error) {
          console.error('API Error:', error);
          setIsAdmin(false);
        } else if (!data && isAdmin) {
          setIsAdmin(false);
        }
      }
      setAuthLoading(false);
    };

    checkAdminStatus();
  }, [data, error, isAuthenticated, isLoading, isAdmin]);

  return {
    isAuthenticated,
    isAdmin,
    user,
    logout,
    isLoading: isLoading || authLoading
  };
};