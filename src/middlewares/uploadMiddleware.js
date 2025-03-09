import multer from 'multer';

// Configure multer for file uploads with proper limits
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images and documents
    if (file.mimetype.startsWith('image/') || 
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Middleware for handling transcript and profile picture uploads
export const uploadApplicantFiles = (req, res, next) => {
  console.log('Processing file upload for applicant');
  upload.fields([
    {name: 'transcripts', maxCount: 1},
    {name: 'pic', maxCount: 1}
  ])(req, res, (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(400).json({ message: `File upload error: ${err.message}` });
    }
    console.log('Files uploaded successfully');
    next();
  });
};

// Add other upload middleware functions as needed
export const uploadSingleFile = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: `File upload error: ${err.message}` });
      }
      next();
    });
  };
};

export const uploadMultipleFiles = (fieldName, maxCount) => {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: `File upload error: ${err.message}` });
      }
      next();
    });
  };
};
