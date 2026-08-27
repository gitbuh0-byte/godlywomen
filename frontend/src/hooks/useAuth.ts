import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

/**
 * Hook to initialize auth on app load
 * This should be called in your root layout or a top-level component
 */
export function useInitializeAuth() {
  useEffect(() => {
    const initAuth = async () => {
      await useAuthStore.getState().initializeAuth();
    };

    initAuth();
  }, []);
}

/**
 * Hook to get auth state
 */
export function useAuth() {
  const { user, accessToken, isLoading, logout } = useAuthStore();

  return {
    user,
    accessToken,
    isLoading,
    isAuthenticated: !!user,
    logout,
  };
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { user } = useAuthStore();
  return !!user;
}
