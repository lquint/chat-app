const express = require('express');
const router = express.Router();
const bcrypt = require('mongoose-bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cookies = require("cookies");

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
        const user = await User.findByCredentials(email, password);
        console.log(email, password)
        // creating jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // setting jwt in a cookie
        //cookie.set('jwt', token, { expires: 15 });
        res.cookie("jwt", token, {
          expires  : new Date(Date.now() + 9999999),
          httpOnly: true,
          sameSite: 'none'
        })
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        console.log(token)
        res.status(200).send({
        token,
        user: {
            id: user._id,
            email: user.email,
        },
        })
    } catch (error) {
        res.status(400).send(error);
    }
  });
  

module.exports = router;