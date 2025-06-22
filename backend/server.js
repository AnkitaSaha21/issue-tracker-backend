const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();
const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Issue Tracker Backend is running');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const issueRoutes = require('./routes/issue')
app.use('/issues', issueRoutes)
const projectRoutes = require('./routes/project')
app.use('/projects', projectRoutes)
app.use('/uploads', express.static('uploads'));




const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
