import express from 'express';
import * as applicationController from '../controllers/applicationController.js';

const router = express.Router();

// GET all applicants
router.get('/', applicationController.getApplications);

// GET a single applicant
router.get('/:id', applicationController.getApplication);

// POST a new applicant
router.post('/', applicationController.createApplication);

// PUT update an applicant
router.put('/:id', applicationController.updateApplication);

// DELETE an applicant
router.delete('/:id', applicationController.deleteApplication);

export default router;
