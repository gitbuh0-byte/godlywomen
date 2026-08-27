import express, { Router, Request, Response } from 'express';
import { authMiddleware } from '@/config/auth';
import { db } from '@/config/database';

const router = Router();

// Get all prayers
router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('prayers')
      .orderBy('createdAt', 'desc')
      .get();

    const prayers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(prayers);
  } catch (error) {
    console.error('Get prayers error:', error);
    res.status(500).json({ error: 'Failed to get prayers' });
  }
});

// Get my prayers
router.get('/mine', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const snapshot = await db.collection('prayers')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const prayers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(prayers);
  } catch (error) {
    console.error('Get my prayers error:', error);
    res.status(500).json({ error: 'Failed to get your prayers' });
  }
});
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = (req as any).user.uid;

    if (!title) {
      return res.status(400).json({ error: 'Title required' });
    }

    const prayerRef = db.collection('prayers').doc();
    await prayerRef.set({
      title,
      description: description || '',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json({
      id: prayerRef.id,
      title,
      description,
      userId,
    });
  } catch (error) {
    console.error('Create prayer error:', error);
    res.status(500).json({ error: 'Failed to create prayer' });
  }
});

// Get my prayers
router.get('/mine', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const snapshot = await db.collection('prayers')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const prayers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(prayers);
  } catch (error) {
    console.error('Get my prayers error:', error);
    res.status(500).json({ error: 'Failed to get your prayers' });
  }
});

export default router;
