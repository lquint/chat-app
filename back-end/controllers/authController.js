const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService')

const signup = async (req,res) => {
    try {
        //TODO entries validation
        const response = await authService.signupUser(req.body)
        console.log(response)
        res.json({ message: 'Successfully created a new user', response });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

const login = async (req,res) => {
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
}

module.exports = {
    signup,
    login
};