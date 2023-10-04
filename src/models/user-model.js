const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      lowercase: true,
      validator: [isEmail, 'Please enter a valid email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
  },
  { timestamps: true }
);
// firing a function before saving a document
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
};

const User = mongoose.model('User', userSchema);

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  university: String,
  bio: String,
  resume: String,
  instagram: String,
  twitter: String,
  linkedin: String,
  github: String,
  courses: [{ courseID: String, count: Number, score: Number }],
  projects: [{ projectID: String, count: Number, score: Number }],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { User, Profile };
