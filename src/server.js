import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import applicantRoutes from './routes/applicantRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import connectDB from './connectDB.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Define the root path handler (before static middleware)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../public')));

// Mount API routes
app.use('/', authRoutes); // For login/signup
app.use('/api/applicants', applicantRoutes);
app.use('/api/scholarships', scholarshipRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('Visit http://localhost:3000 to view the application');
});