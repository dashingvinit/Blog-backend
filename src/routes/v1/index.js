const express = require('express');
const router = express.Router();

const authRoutes = require('./auth-routes');
const blogRoutes = require('./blog-routes');

router.use('./auth', authRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
