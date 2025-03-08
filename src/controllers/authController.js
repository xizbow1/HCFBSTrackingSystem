import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase.js';

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).send({ 
      message: 'Login successful', 
      email: user.email,
      uid: user.uid,
      token: await user.getIdToken()
    });
  } catch (error) {
    console.error('Firebase auth error:', error);
    res.status(401).send({ message: 'Login failed', error: error.message });
  }
};

// Signup function
export const signup = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Here you could store additional user information in Firebase Firestore
    // This is a placeholder for that functionality
    
    res.status(201).send({ 
      message: 'User created successfully',
      email: user.email,
      uid: user.uid
    });
  } catch (error) {
    console.error('Firebase signup error:', error);
    res.status(400).send({ message: 'Signup failed', error: error.message });
  }
};
