import express from 'express';
import { 
  getAllApplications, 
  getUserApplications, 
  createApplication 
} from '../controllers/applicationController.js';
import { uploadSingleFile } from '../middlewares/uploadMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all applications (admin only - you might want to add admin check middleware)
router.get('/', getAllApplications);

// Get current user's applications
router.get('/user', getUserApplications);

// Submit a new application
router.post('/', uploadSingleFile('cv'), createApplication);

export default router;
