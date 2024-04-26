const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const authRouter = express.Router();


authRouter.post('/login', loginUser)
authRouter.post('/signup', registerUser)

module.exports = authRouter