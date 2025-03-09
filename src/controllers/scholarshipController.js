import Scholarship from '../models/Scholarship.js';

// Get all Scholarships
export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(Scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Scholarship by id
export const getScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.status(200).json(Scholarship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new Scholarship
export const createScholarship = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files ? Object.keys(req.files) : 'No files');

    // Create Scholarship data with explicit file handling
    const scholarshipData = {
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
        funderName: req.body.funderName,
        fundsAllocated: req.body.fundsAllocated,
        fundingType: req.body.fundingType,
        numOfApps: req.body.numOfApps,
        creationDate: req.body.creationDate,
        endDate: req.body.endDate,
        requirements: req.body.requirements,
        applications: []
    };

    console.log("Processing new scholarship:", {
        scholarshipData,
    });

    const newScholarship = new Scholarship(ScholarshipData);
    const savedScholarship = await newScholarship.save();
    res.status(201).json(savedScholarship);
  } catch (error) {
    console.error('Error creating Scholarship:', error);
    
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

// Update an Scholarship
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

// Delete an Scholarship
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