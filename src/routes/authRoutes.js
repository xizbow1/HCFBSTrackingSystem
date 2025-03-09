import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { uploadApplicantFiles } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/signup', uploadApplicantFiles, signup);
router.post('/login', login);

export default router;