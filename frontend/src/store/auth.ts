import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setLoading: (loading) => set({ isLoading: loading }),

  logout: async () => {
    set({ user: null, accessToken: null });
  },

  initializeAuth: async () => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();
          set({
            user: {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
            },
            accessToken: idToken,
            isLoading: false,
          });
        } else {
          set({ user: null, accessToken: null, isLoading: false });
        }
      });
    } catch (error) {
      console.error('Initialize auth error:', error);
      set({ isLoading: false });
    }
  },
}));

// Set up Firebase auth state listener
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const idToken = await firebaseUser.getIdToken();
      useAuthStore.setState({
        user: {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
        },
        accessToken: idToken,
      });
    } else {
      useAuthStore.setState({
        user: null,
        accessToken: null,
      });
    }
  });
}
