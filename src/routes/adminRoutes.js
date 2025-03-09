import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { uploadadminFiles } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// GET all admins
router.get('/', adminController.getadmins);

// GET a single admin
router.get('/:id', adminController.getadmin);

// POST a new admin - with file upload middleware
router.post('/', uploadadminFiles, adminController.createadmin);

// PUT update an admin
router.put('/:id', adminController.updateadmin);

// DELETE an admin
router.delete('/:id', adminController.deleteadmin);

export default router;
