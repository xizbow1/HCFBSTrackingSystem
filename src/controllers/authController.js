import { createApplicant } from './applicantController.js';
import { auth, signInWithEmailAndPassword } from '../firebase.js';
import { Applicant, Admin } from '../models/index.js';

// Signup controller - delegates to applicant controller after upload middleware
export const signup = (req, res) => {
  // The file upload middleware has already been processed at this point
  console.log('Signup controller called - delegating to createApplicant');
  return createApplicant(req, res);
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Authenticate with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // First check if user is an admin
    const adminUser = await Admin.findOne({ email: email });
    
    if (adminUser) {
      // User is an admin
      return res.status(200).json({
        _id: adminUser._id, // MongoDB ID
        email: adminUser.email,
        isAdmin: true,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        token: await firebaseUser.getIdToken() // Firebase auth token
      });
    }
    
    // If not admin, check if user is an applicant
    const applicantUser = await Applicant.findOne({ firebaseUID: firebaseUser.uid });
    
    if (!applicantUser) {
      return res.status(404).json({ error: 'User record not found in database' });
    }
    
    // User is an applicant/student
    return res.status(200).json({
      _id: applicantUser._id, // MongoDB ID
      email: applicantUser.email,
      isAdmin: false,
      firstName: applicantUser.firstName,
      lastName: applicantUser.lastName,
      token: await firebaseUser.getIdToken() // Firebase auth token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    return res.status(500).json({ error: 'Authentication failed' });
  }
};