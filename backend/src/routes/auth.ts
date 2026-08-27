import express, { Router, Request, Response } from 'express';
import { db } from '@/config/firebase';
import { authMiddleware } from '@/config/auth';

const router = Router();

// Get current user profile
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;

    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: userId,
      ...userDoc.data(),
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});
// Update current user profile
router.put('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const { firstName, lastName, displayName, photoURL, bio } = req.body;

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    await userRef.update({
      firstName: firstName !== undefined ? firstName : userDoc.data()?.firstName,
      lastName: lastName !== undefined ? lastName : userDoc.data()?.lastName,
      displayName: displayName !== undefined ? displayName : userDoc.data()?.displayName,
      photoURL: photoURL !== undefined ? photoURL : userDoc.data()?.photoURL,
      bio: bio !== undefined ? bio : userDoc.data()?.bio,
      updatedAt: new Date().toISOString(),
    });

    const updatedDoc = await userRef.get();
    res.json({ id: userId, ...updatedDoc.data() });
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// List all users (for chat)
router.get('/users', authMiddleware, async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});
// Logout
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
