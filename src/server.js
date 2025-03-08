import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve the HTML file
app.use(express.static(path.join(__dirname, '../public')));

// Use auth routes
app.use('/', authRoutes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));