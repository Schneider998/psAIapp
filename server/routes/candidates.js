import express from 'express';
import { candidates } from '../data/mockData.js';

export const router = express.Router();

// Get all candidates
router.get('/', (req, res) => {
  res.json(candidates);
});

// Get candidate by ID
router.get('/:id', (req, res) => {
  const candidate = candidates.find(c => c.id === req.params.id);
  if (!candidate) {
    return res.status(404).json({ error: 'Candidate not found' });
  }
  res.json(candidate);
});

// Update candidate status
router.patch('/:id/status', (req, res) => {
  const { status, jobId } = req.body;
  const candidateIndex = candidates.findIndex(c => c.id === req.params.id);
  
  if (candidateIndex === -1) {
    return res.status(404).json({ error: 'Candidate not found' });
  }
  
  candidates[candidateIndex] = {
    ...candidates[candidateIndex],
    status,
    appliedJobs: jobId 
      ? [...(candidates[candidateIndex].appliedJobs || []), jobId]
      : candidates[candidateIndex].appliedJobs
  };
  
  res.json(candidates[candidateIndex]);
});

// Add payment method
router.post('/:id/payment-method', (req, res) => {
  const candidateIndex = candidates.findIndex(c => c.id === req.params.id);
  
  if (candidateIndex === -1) {
    return res.status(404).json({ error: 'Candidate not found' });
  }
  
  candidates[candidateIndex] = {
    ...candidates[candidateIndex],
    hasPaymentMethod: true
  };
  
  res.json(candidates[candidateIndex]);
});