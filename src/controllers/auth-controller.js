const { User } = require('../models/user-model');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = { name: '', email: '', password: '' };

  // Unique email error
  if (err.code === 11000) {
    error.email = 'That email is already registered';
    return error;
  }

  // Incorrect email
  if (err.message === 'Incorrect email') {
    error.email = 'That email is not registered';
  }

  // validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const createToken = (id) => {
  return jwt.sign({ id }, 'vbhjwi763892euiyvb9087rfvecbioi20989e13!@', {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports.signup_get = (req, res) => {
  res.render('login');
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).redirect('/nptel');
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).redirect('/nptel');
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
