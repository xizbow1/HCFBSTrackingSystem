import { Applicant } from '../../backend/hcfbDB.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create unique filename
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware to handle file uploads
export const uploadFiles = upload.fields([
  { name: 'transcripts', maxCount: 1 },
  { name: 'pic', maxCount: 1 }
]);

// Create a new applicant
export const createApplicant = async (req, res) => {
  try {
    // Get data from request body
    const applicantData = req.body;
    
    // Handle file paths if files were uploaded
    if (req.files) {
      if (req.files.transcripts) {
        applicantData.transcripts = fs.readFileSync(req.files.transcripts[0].path);
      }
      
      if (req.files.pic) {
        applicantData.pic = fs.readFileSync(req.files.pic[0].path);
      }
    }
    
    // Parse numeric values
    if (applicantData.gpa) {
      applicantData.gpa = parseFloat(applicantData.gpa);
    }
    
    // Format date values
    if (applicantData.gradYear) {
      applicantData.gradYear = new Date(applicantData.gradYear);
    }
    
    // Set empty application array (will be populated later when they apply)
    applicantData.application = [];
    
    // Create a new applicant instance
    const newApplicant = new Applicant(applicantData);
    
    // Save the applicant to the database
    const savedApplicant = await newApplicant.save();
    
    // Clean up uploaded files after storing them in the database
    if (req.files) {
      if (req.files.transcripts) {
        fs.unlinkSync(req.files.transcripts[0].path);
      }
      if (req.files.pic) {
        fs.unlinkSync(req.files.pic[0].path);
      }
    }
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Applicant created successfully',
      data: savedApplicant
    });
  } catch (error) {
    console.error('Error creating applicant:', error);
    
    // Handle duplicate key error (e.g., email already exists)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An applicant with this email already exists'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    // General error
    res.status(500).json({
      success: false,
      message: 'Error creating applicant',
      error: error.message
    });
  }
};

// Get all applicants
export const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json({
      success: true,
      count: applicants.length,
      data: applicants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching applicants',
      error: error.message
    });
  }
};

// Get a single applicant by ID
export const getApplicantById = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: applicant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching applicant',
      error: error.message
    });
  }
};
