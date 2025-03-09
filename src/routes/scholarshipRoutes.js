import express from 'express';
import { 
    getScholarships, 
    getScholarshipById, 
    createScholarship,
    updateScholarship, 
    deleteScholarship 
} from '../controllers/scholarshipController.js';

const router = express.Router();

// Public routes
router.get('/', getScholarships); // Get all scholarships
router.get('/:id', getScholarshipById); // Get single scholarship

// Protected routes (require authentication)
router.post('/', createScholarship);
router.put('/:id', updateScholarship);
router.delete('/:id', deleteScholarship);

export default router;
