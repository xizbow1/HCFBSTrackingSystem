import express from 'express';
import * as applicantController from '../controllers/applicantController.js';
import { uploadApplicantFiles } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// GET all applicants
router.get('/', applicantController.getApplicants);

// GET a single applicant
router.get('/:id', applicantController.getApplicant);

// POST a new applicant - with file upload middleware
router.post('/', uploadApplicantFiles, applicantController.createApplicant);

// PUT update an applicant
router.put('/:id', applicantController.updateApplicant);

// DELETE an applicant
router.delete('/:id', applicantController.deleteApplicant);

export default router;
