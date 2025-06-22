const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    const existingUser = await User.findOne({email});
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role, email: user.email, userType:user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// authController.js
exports.makeAdmin = async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ message: 'userId is required' });
  
      const user = await User.findByIdAndUpdate(
        userId,
        { role: 'admin' },
        { new: true }
      );
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: `User ${user.username} is now an admin`, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// authController.js
exports.getUsers = async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const filter = {};
  
      if (search) {
        // Match username or email (case-insensitive)
        filter.$or = [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      const [users, total] = await Promise.all([
        User.find(filter)
          .select('username email role')
          .skip(skip)
          .limit(parseInt(limit))
          .sort('username'),
        User.countDocuments(filter)
      ]);
  
      res.status(200).json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
        users
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  