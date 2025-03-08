import Applicant from '../models/Applicant.js';

// Get all applicants, with optional email filter
export const getApplicants = async (req, res) => {
  try {
    // Check if there's an email query parameter
    const filter = {};
    if (req.query.email) {
      filter.email = req.query.email;
    }
    
    const applicants = await Applicant.find(filter);
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single applicant
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

// Create an applicant
export const createApplicant = async (req, res) => {
  try {
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.status(201).json(applicant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an applicant
export const updateApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    res.status(200).json(applicant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an applicant
export const deleteApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    res.status(200).json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
