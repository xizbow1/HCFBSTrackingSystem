import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import applicantRoutes from './routes/applicantRoutes.js';
import connectDB from './config/database.js';
import cors from 'cors';

// Connect to MongoDB
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define the root path handler first (before static middleware)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Then serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/', authRoutes);
app.use('/api/applicants', applicantRoutes);

app.listen(3000, () => console.log('Example app listening on port 3000! Visit http://localhost:3000 to view the login page.'));
