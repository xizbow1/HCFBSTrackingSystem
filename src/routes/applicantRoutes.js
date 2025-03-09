import express from 'express';
import { createApplicant, getApplicants, getApplicantById, uploadFiles } from '../controllers/applicantController.js';

const router = express.Router();

// Routes for applicants
router.post('/applicants', uploadFiles, createApplicant);
router.get('/applicants', getApplicants);
router.get('/applicants/:id', getApplicantById);

export default router;
