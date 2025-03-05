const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().trim(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  AuthController.register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  AuthController.login
);

module.exports = router;