// filepath: /home/blake/HCFBSTrackingSystem/server.js
import express from 'express';
import { auth } from './firebase.js';

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    res.status(200).send({ message: 'Login successful', email: user.email });
  } catch (error) {
    res.status(401).send({ message: 'Login failed', error: error.message });
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));