import express from 'express';
import * as scholarshipController from '../controllers/scholarshipController.js';

const router = express.Router();

// GET all scholarships
router.get('/', scholarshipController.getScholarships);

// GET a single scholarship
router.get('/:id', scholarshipController.getScholarship);

// POST a new scholarship
router.post('/', scholarshipController.createScholarship);

// PUT update an scholarship
router.put('/:id', scholarshipController.updateScholarship);

// DELETE an scholarship
router.delete('/:id', scholarshipController.deleteScholarship);

export default router;
