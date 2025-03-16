const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect DB
require('./config/db')();

// Routes
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
