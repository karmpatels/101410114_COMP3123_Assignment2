const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Received signup data:', { username, email, password });

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user_id: newUser._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ status: false, message: 'Invalid Username or password' });
    }
    // Optional JWT Implementation
    const token = jwt.sign({ user_id: user._id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', jwt_token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};