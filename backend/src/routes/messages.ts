import express, { Router, Request, Response } from 'express';
import { authMiddleware } from '@/config/auth';
import { db } from '@/config/database';

const router = Router();

// Get user messages
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;

    const snapshot = await db.collection('messages')
      .where('participantIds', 'array-contains', userId)
      .orderBy('updatedAt', 'desc')
      .get();

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
});

// Send message
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = (req as any).user.uid;

    if (!receiverId || !content) {
      return res.status(400).json({ error: 'Receiver and content required' });
    }

    // Create or get conversation
    const participantIds = [senderId, receiverId].sort();
    const conversationId = `${participantIds[0]}_${participantIds[1]}`;

    // Add message to conversation
    const messageRef = db
      .collection('messages')
      .doc(conversationId)
      .collection('messageList')
      .doc();

    await messageRef.set({
      senderId,
      receiverId,
      content,
      read: false,
      createdAt: new Date().toISOString(),
    });

    // Update conversation metadata
    await db.collection('messages').doc(conversationId).set(
      {
        participantIds,
        senderId,
        receiverId,
        lastMessage: content,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    res.status(201).json({
      id: messageRef.id,
      senderId,
      receiverId,
      content,
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
