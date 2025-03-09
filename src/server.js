import 'dotenv/config'; // Add this at the very top
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import applicantRoutes from './routes/applicantRoutes.js';
import connectDB from './connectDB.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Define the root path handler first (before static middleware)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Then serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../public')));

// Use routes
app.use('/', authRoutes);
app.use('/api', applicantRoutes); // Mount applicant routes under /api

app.listen(3000, () => console.log('Example app listening on port 3000! Visit http://localhost:3000 to view the login page.'));