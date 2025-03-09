import { auth } from '../firebase.js';
import { Admin } from '../models/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // Verify the token with Firebase
      const decodedToken = await auth.verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email
      };
      next();
    } catch (error) {
      console.error('Error verifying auth token:', error);
      return res.status(403).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

// New middleware for admin-only routes
export const adminMiddleware = async (req, res, next) => {
  try {
    // First, verify the user is authenticated
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // Verify the token with Firebase
      const decodedToken = await auth.verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email
      };
      
      // Now check if this user is an admin
      const adminUser = await Admin.findOne({ email: req.user.email });
      
      if (!adminUser) {
        return res.status(403).json({ 
          success: false,
          message: 'Admin access required' 
        });
      }
      
      // Add admin info to request
      req.user.isAdmin = true;
      req.user.adminRights = {
        super: adminUser.super,
        read: adminUser.read,
        write: adminUser.write
      };
      
      next();
    } catch (error) {
      console.error('Error verifying auth token:', error);
      return res.status(403).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};
