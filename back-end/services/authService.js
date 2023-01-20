const User = require('../models/user');

const signupUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user.email;
}

module.exports = {
    signupUser
}