const express = require('express');
const app = express();
const mongoose = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/user.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use Routes

app.use('/api/user', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});