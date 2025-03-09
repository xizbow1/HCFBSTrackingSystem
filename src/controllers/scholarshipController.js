import { Scholarship } from '../models/index.js';

// Create a new scholarship
export const createScholarship = async (req, res) => {
  try {
    // Get scholarship data from request body
    const {
      name,
      dueDate,
      funderName,
      description,
      fundsAllocated,
      fundingType,
      numOfApps,
      creationDate,
      endDate,
      requirements
    } = req.body;

    // Validate required fields
    const requiredFields = ['name', 'dueDate', 'funderName', 'description', 
                           'fundsAllocated', 'fundingType', 'endDate', 'requirements'];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Format dates if they're strings
    const formattedDueDate = new Date(dueDate);
    const formattedCreationDate = creationDate ? new Date(creationDate) : new Date(); // Default to now
    const formattedEndDate = new Date(endDate);
    
    // Create scholarship object
    const scholarshipData = {
      name,
      dueDate: formattedDueDate,
      funderName,
      description,
      fundsAllocated: Number(fundsAllocated),
      fundingType,
      numOfApps: Number(numOfApps) || 0, // Default to 0 if not provided
      creationDate: formattedCreationDate,
      endDate: formattedEndDate,
      requirements,
      applications: [] // Start with empty applications array
    };

    // Create and save new scholarship
    const newScholarship = new Scholarship(scholarshipData);
    const savedScholarship = await newScholarship.save();
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Scholarship created successfully',
      data: savedScholarship
    });
    
  } catch (error) {
    console.error('Error creating scholarship:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }
    
    // General error
    res.status(500).json({
      success: false,
      message: 'Error creating scholarship',
      error: error.message
    });
  }
};

// Get all scholarships
export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json({
      success: true,
      count: scholarships.length,
      data: scholarships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scholarships',
      error: error.message
    });
  }
};

// Get a single scholarship by ID
export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: scholarship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scholarship',
      error: error.message
    });
  }
};

// Update a scholarship
export const updateScholarship = async (req, res) => {
  try {
    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.status(200).json(updatedScholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a scholarship
export const deleteScholarship = async (req, res) => {
  try {
    const deletedScholarship = await Scholarship.findByIdAndDelete(req.params.id);
    
    if (!deletedScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.status(200).json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};