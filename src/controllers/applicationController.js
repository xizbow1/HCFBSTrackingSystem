import { Application, Applicant } from '../models/index.js';

// Get all applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('scholarship').populate('applicant');
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};

// Get applications for the current user
export const getUserApplications = async (req, res) => {
  try {
    // Get user ID from authenticated request
    const firebaseUID = req.user.uid; // Assuming you have authentication middleware

    if (!firebaseUID) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Find the applicant by Firebase UID
    const applicant = await Applicant.findOne({ firebaseUID });
    
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }

    // Find all applications submitted by this applicant and populate the scholarship details
    const applications = await Application.find({ applicant: applicant._id })
      .populate('scholarship')
      .sort({ dateSubmission: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your applications',
      error: error.message
    });
  }
};

// Create a new application
export const createApplication = async (req, res) => {
  try {
    // Get the current authenticated user
    const firebaseUID = req.user.uid;

    if (!firebaseUID) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Find the applicant
    const applicant = await Applicant.findOne({ firebaseUID });
    
    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found'
      });
    }

    // Extract data from request
    const { scholarshipId, personalStatement } = req.body;
    
    // Validate cover letter file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Cover letter file is required'
      });
    }

    // Create new application
    const newApplication = new Application({
      applicant: applicant._id,
      scholarship: scholarshipId,
      cv: req.file.buffer, // From multer middleware
      personalStatement,
      dateSubmission: new Date(),
      fundsDispursed: false,
      rank: 0 // Default rank, to be updated by admins
    });

    const savedApplication = await newApplication.save();

    // Update the applicant's applications array
    applicant.application.push(savedApplication._id);
    await applicant.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: savedApplication
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

// Get a single applicant by id
export const getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an applications
export const updateApplications = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an applicant
export const deleteApplications = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    res.status(200).json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};