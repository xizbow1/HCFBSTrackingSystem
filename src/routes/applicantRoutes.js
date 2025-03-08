import express from 'express';
import * as applicantController from '../controllers/applicantController.js';

const router = express.Router();

// GET all applicants
router.get('/', applicantController.getApplicants);

// GET a single applicant
router.get('/:id', applicantController.getApplicant);

// POST a new applicant
router.post('/', applicantController.createApplicant);

// PUT update an applicant
router.put('/:id', applicantController.updateApplicant);

// DELETE an applicant
router.delete('/:id', applicantController.deleteApplicant);

export default router;
