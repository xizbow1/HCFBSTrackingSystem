import express from 'express';
import * as applicantionController from '../controllers/applicantionController.js';

const router = express.Router();

// GET all applicants
router.get('/', applicantionController.getApplicantions);

// GET a single applicant
router.get('/:id', applicantionController.getApplicantion);

// POST a new applicant
router.post('/', applicantionController.createApplicantion);

// PUT update an applicant
router.put('/:id', applicantionController.updateApplicantion);

// DELETE an applicant
router.delete('/:id', applicantionController.deleteApplicantion);

export default router;
