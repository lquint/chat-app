require('dotenv').config();
const mongoose = require('mongoose');


const uri = process.env.MONGODB_URI
console.log(uri)

mongoose.set('strictQuery', true);

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;