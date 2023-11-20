const mongoose = require('mongoose');
const { isEmail } = require('validator');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

module.exports = mongoose.model('Profile', profileSchema);
