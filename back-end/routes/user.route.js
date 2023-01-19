const express = require('express');
const router = express.Router();
const bcrypt = require('mongoose-bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'Successfully created a new user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)
        const user = await User.findByCredentials(email, password);
        // creating jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
        token,
        user: {
            id: user._id,
            email: user.email,
        },
        });
    } catch (error) {
        res.status(400).send(error);
    }
  });
  

module.exports = router;