import express from 'express';
import { 
  createScholarship,
  getScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship
} from '../controllers/scholarshipController.js';

const router = express.Router();

// Scholarship routes
router.post('/', createScholarship);
router.get('/', getScholarships);
router.get('/:id', getScholarshipById);
router.put('/:id', updateScholarship);
router.delete('/:id', deleteScholarship);

export default router;
