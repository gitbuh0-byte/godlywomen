import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuthStore } from '@/store/auth';

export async function loginWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const { user } = result;

    const idToken = await user.getIdToken();

    useAuthStore.setState({
      user: {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
      },
      accessToken: idToken,
    });

    return { success: true, data: { user, idToken } };
  } catch (error: any) {
    console.error('Login error:', error);
    const errorMessage = error.code === 'auth/invalid-credential'
      ? 'Invalid email or password'
      : error.message;
    return { success: false, error: errorMessage };
  }
}

export async function registerWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = result;

    // Update profile
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    // Create user profile document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      firstName: firstName,
      lastName: lastName,
      displayName: `${firstName} ${lastName}`,
      photoURL: '',
      bio: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const idToken = await user.getIdToken();

    useAuthStore.setState({
      user: {
        id: user.uid,
        email: user.email || '',
        displayName: `${firstName} ${lastName}`,
        photoURL: user.photoURL || '',
      },
      accessToken: idToken,
    });

    return { success: true, data: { user, idToken } };
  } catch (error: any) {
    console.error('Registration error:', error);
    const errorMessage = error.code === 'auth/email-already-in-use'
      ? 'Email already in use'
      : error.message;
    return { success: false, error: errorMessage };
  }
}

export async function logout() {
  try {
    await signOut(auth);

    useAuthStore.setState({
      user: null,
      accessToken: null,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    console.error('Password reset error:', error);
    const errorMessage = error.code === 'auth/user-not-found'
      ? 'User not found'
      : error.message;
    return { success: false, error: errorMessage };
  }
}

export async function updatePasswordForUser(newPassword: string) {
  try {
    if (!auth.currentUser) {
      throw new Error('No user logged in');
    }
    await updatePassword(auth.currentUser, newPassword);
    return { success: true };
  } catch (error: any) {
    console.error('Update password error:', error);
    return { success: false, error: error.message };
  }
}
