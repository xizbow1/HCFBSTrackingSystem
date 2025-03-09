import Applicant from '../models/Applicant.js';

// Get all applicants
export const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single applicant by id
export const getApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    res.status(200).json(applicant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new applicant
export const createApplicant = async (req, res) => {
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
    const applicantData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      street: req.body.street,
      aptNum: req.body.aptNum || '',
      city: req.body.city,
      zip: req.body.zip,
      state: req.body.state,
      gpa: gpa,
      college: req.body.college,
      major: req.body.major,
      highschool: req.body.highschool,
      hsGradYear: req.body.hsGradYear,
      gradYear: req.body.gradYear,
      studentType: req.body.studentType,
      enrollmentStatus: req.body.enrollmentStatus,
      transcripts: req.files.transcripts[0].buffer,
      pic: req.files.pic[0].buffer
    };

    console.log("Processing new applicant:", {
      firstName: applicantData.firstName,
      email: applicantData.email,
      transcripts: applicantData.transcripts ? "Buffer exists" : "No Buffer",
      pic: applicantData.pic ? "Buffer exists" : "No buffer",
      fileTypes: {
        transcripts: req.files.transcripts[0].mimetype,
        pic: req.files.pic[0].mimetype
      }
    });

    const newApplicant = new Applicant(applicantData);
    const savedApplicant = await newApplicant.save();
    res.status(201).json(savedApplicant);
  } catch (error) {
    console.error('Error creating applicant:', error);
    
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

// Update an applicant
export const updateApplicant = async (req, res) => {
  try {
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedApplicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    res.status(200).json(updatedApplicant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an applicant
export const deleteApplicant = async (req, res) => {
  try {
    const deletedApplicant = await Applicant.findByIdAndDelete(req.params.id);
    
    if (!deletedApplicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    res.status(200).json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};