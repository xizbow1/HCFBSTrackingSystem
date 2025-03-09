import Application from '../models/Application.js';

// Get all applicants
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Create a new applicant
export const createApplication = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files ? Object.keys(req.files) : 'No files');
    
    // Better file existence check with detailed error message
    if (!req.files) {
      return res.status(400).json({ message: 'No files were uploaded' });
    }
    
    if (!req.files.transcripts) {
      return res.status(400).json({ message: 'Transcripts file is required' });
    }
    
    if (!req.files.pic) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }
    
    // Process GPA to ensure it's a number
    let gpa = parseFloat(req.body.gpa);
    if (isNaN(gpa)) {
      return res.status(400).json({ message: 'GPA must be a valid number' });
    }

    // Create applicant data with explicit file handling
    const applicationData = {
      applicant: req.body.applicant,
      scholarship: req.body.scholarship,
      cv: req.files.cv[0].buffer,
      personalStatement: req.body.personalStatement,
      fundsDisbursed: req.body.fundsDisbursed,
      dateSubmission: req.body.dateSubmission,
      rank: req.body.rank
    };

    console.log("Processing new applicant:", {
        applicant: applicationData.applicant,
        scholarship: applicationData.scholarship,
        cv: applicantData.cv ? "Buffer exists" : "No Buffer",
        personalStatement: req.body.personalStatement,
        fundsDisbursed: req.body.fundsDisbursed,
        dateSubmission: req.body.dateSubmission,
        rank: req.body.rank,
      fileTypes: {
        cv: req.files.cv[0].mimetype
      }
    });

    const newApplication = new Application(applicationData);
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error creating application:', error);
    
    // Provide more detailed validation error information
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      
      // Extract specific validation error messages
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: validationErrors 
      });
    }
    
    res.status(400).json({ message: error.message });
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