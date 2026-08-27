'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize auth on mount
    useAuthStore.getState().initializeAuth();
  }, []);

  return <>{children}</>;
}
