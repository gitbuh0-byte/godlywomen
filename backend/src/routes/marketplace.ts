import express, { Router, Request, Response } from 'express';
import { authMiddleware } from '@/config/auth';
import { db } from '@/config/database';

const router = Router();

// Get all marketplace items
router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('marketplace')
      .orderBy('createdAt', 'desc')
      .get();

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(items);
  } catch (error) {
    console.error('Get marketplace error:', error);
    res.status(500).json({ error: 'Failed to get marketplace items' });
  }
});

// Get my marketplace items
router.get('/mine', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const snapshot = await db.collection('marketplace')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(items);
  } catch (error) {
    console.error('Get my marketplace error:', error);
    res.status(500).json({ error: 'Failed to get your items' });
  }
});
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, price, image } = req.body;
    const userId = (req as any).user.uid;

    if (!title || !price) {
      return res.status(400).json({ error: 'Title and price required' });
    }

    const itemRef = db.collection('marketplace').doc();
    await itemRef.set({
      title,
      description: description || '',
      price: parseFloat(price),
      image: image || '',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json({
      id: itemRef.id,
      title,
      description,
      price,
      image,
      userId,
    });
  } catch (error) {
    console.error('Create marketplace item error:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Get my marketplace items
router.get('/mine', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const snapshot = await db.collection('marketplace')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(items);
  } catch (error) {
    console.error('Get my marketplace error:', error);
    res.status(500).json({ error: 'Failed to get your items' });
  }
});

export default router;
