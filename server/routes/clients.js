import express from 'express';
import { clients } from '../data/mockData.js';

export const router = express.Router();

// Get all clients
router.get('/', (req, res) => {
  res.json(clients);
});

// Get client by ID
router.get('/:id', (req, res) => {
  const client = clients[req.params.id];
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }
  res.json(client);
});

// Update client subscription
router.patch('/:id/subscription', (req, res) => {
  const { tier } = req.body;
  const client = clients[req.params.id];
  
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }
  
  const subscriptionTiers = {
    free: { credits: 3, maxCredits: 3 },
    starter: { credits: 10, maxCredits: 10 },
    professional: { credits: 50, maxCredits: 50 },
    enterprise: { credits: Infinity, maxCredits: Infinity }
  };
  
  clients[req.params.id] = {
    ...client,
    subscription: {
      tier,
      ...subscriptionTiers[tier]
    }
  };
  
  res.json(clients[req.params.id]);
});