import express from 'express';
import * as authController from '../controllers/authController.js';
import { uploadApplicantFiles } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/signup', uploadApplicantFiles, authController.signup);
router.post('/login', authController.login);

export default router;