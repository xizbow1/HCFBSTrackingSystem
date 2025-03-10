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
router.get('/', getScholarships); 
router.get('/:id', getScholarshipById); 

// Protected routes (require authentication)
router.post('/', createScholarship);
router.put('/:id', updateScholarship);
router.delete('/:id', deleteScholarship);

export default router;
