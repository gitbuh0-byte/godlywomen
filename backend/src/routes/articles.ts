import express, { Router, Request, Response } from 'express';
import { authMiddleware } from '@/config/auth';
import { db } from '@/config/database';
import * as admin from 'firebase-admin';

const router = Router();

// Get all articles
router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('articles')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const articles = snapshot.docs.map((doc: admin.firestore.DocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(articles);
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Failed to get articles' });
  }
});

// Get my articles
router.get('/mine', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const snapshot = await db.collection('articles')
      .where('authorId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const articles = snapshot.docs.map((doc: admin.firestore.DocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(articles);
  } catch (error) {
    console.error('Get my articles error:', error);
    res.status(500).json({ error: 'Failed to get your articles' });
  }
});

// Get article by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('articles').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Increment views
    await doc.ref.update({ views: (doc.data()?.views || 0) + 1 });

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Failed to get article' });
  }
});
// Create article
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, slug, excerpt, content, featuredImage, category } = req.body;
    const userId = (req as any).user.uid;

    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const articleRef = db.collection('articles').doc();
    await articleRef.set({
      title,
      slug,
      excerpt: excerpt || '',
      content,
      featuredImage: featuredImage || '',
      category: category || '',
      authorId: userId,
      status: 'published',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json({
      id: articleRef.id,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      authorId: userId,
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Update article
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, featuredImage, category, status } = req.body;
    const userId = (req as any).user.uid;

    const doc = await db.collection('articles').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Check ownership
    if (doc.data()?.authorId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await doc.ref.update({
      title: title || doc.data()?.title,
      content: content || doc.data()?.content,
      excerpt: excerpt || doc.data()?.excerpt,
      featuredImage: featuredImage || doc.data()?.featuredImage,
      category: category || doc.data()?.category,
      status: status || doc.data()?.status,
      updatedAt: new Date().toISOString(),
    });

    res.json({ id, ...doc.data() });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.uid;

    const doc = await db.collection('articles').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Check ownership
    if (doc.data()?.authorId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await doc.ref.delete();
    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;
