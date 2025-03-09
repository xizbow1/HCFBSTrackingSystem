import { createApplicant } from './applicantController.js';
import { auth, signInWithEmailAndPassword } from '../firebase.js';
import { Admin } from '../models/index.js';

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
      return res.status(400).json({ 
        success: false,
        error: 'Email and password are required' 
      });
    }

    // First, check if this is an admin user
    const adminUser = await Admin.findOne({ email });
    const isAdmin = !!adminUser; // Convert to boolean

    // Attempt to sign in with Firebase
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Generate token for authentication
      const token = await user.getIdToken();
      
      res.json({ 
        success: true,
        email: user.email,
        uid: user.uid,
        token,
        isAdmin // Include admin status in response
      });
    } catch (firebaseError) {
      console.error('Firebase auth error:', firebaseError);
      
      // Handle specific Firebase auth errors
      if (firebaseError.code === 'auth/user-not-found' || 
          firebaseError.code === 'auth/wrong-password') {
        return res.status(401).json({ 
          success: false,
          error: 'Invalid email or password' 
        });
      }
      
      if (firebaseError.code === 'auth/too-many-requests') {
        return res.status(429).json({ 
          success: false,
          error: 'Too many login attempts. Please try again later.' 
        });
      }
      
      return res.status(500).json({ 
        success: false,
        error: 'Authentication failed' 
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};