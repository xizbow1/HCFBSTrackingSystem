import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { auth, signInWithEmailAndPassword } from './firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve the HTML file
app.use(express.static(path.join(__dirname, '../public')));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).send({ message: 'Login successful', email: user.email });
  } catch (error) {
    console.error('Firebase auth error:', error);
    res.status(401).send({ message: 'Login failed', error: error.message });
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));