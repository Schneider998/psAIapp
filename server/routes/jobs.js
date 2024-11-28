import express from 'express';
import { jobs } from '../data/mockData.js';

export const router = express.Router();

// Get all jobs
router.get('/', (req, res) => {
  res.json(jobs);
});

// Get job by ID
router.get('/:id', (req, res) => {
  const job = jobs[req.params.id];
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

// Create new job
router.post('/', (req, res) => {
  const jobId = `${Date.now()}`;
  const newJob = {
    id: jobId,
    ...req.body,
    applicants: 0,
    views: 0,
    status: 'active'
  };
  
  jobs[jobId] = newJob;
  res.status(201).json(newJob);
});

// Update job
router.put('/:id', (req, res) => {
  const job = jobs[req.params.id];
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  jobs[req.params.id] = {
    ...job,
    ...req.body
  };
  
  res.json(jobs[req.params.id]);
});

// Delete job
router.delete('/:id', (req, res) => {
  const job = jobs[req.params.id];
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  delete jobs[req.params.id];
  res.status(204).send();
});