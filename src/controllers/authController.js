import { auth, signInWithEmailAndPassword } from '../firebase.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).send({ message: 'Login successful', email: user.email });
  } catch (error) {
    console.error('Firebase auth error:', error);
    res.status(401).send({ message: 'Login failed', error: error.message });
  }
};
