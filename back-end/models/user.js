const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(uniqueValidator);
//UserSchema.plugin(mongooseBcrypt);

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login');
    }
    console.log("bbbb")
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    
    return user;
}



const User = mongoose.model('User', UserSchema);

module.exports = User;