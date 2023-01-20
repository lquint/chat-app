const express = require('express');
const app = express();
const mongoose = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const corsOptions = {
  credentials: true,
  origin:'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use Routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/api/user', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});