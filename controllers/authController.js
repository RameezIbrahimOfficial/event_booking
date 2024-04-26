const bcrypt = require('bcrypt')
const userModel = require('../model/user')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')



// @desc Register User
// @route POST /api/auth/user/signup
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
        res.status(400)
        throw new Error('Please add all fields!')
    }

    const IsUserExist = await userModel.findOne({ email });
    if (IsUserExist) {
        res.status(400)
        throw new Error("User with this email already Exist!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await userModel.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber
    })

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    if (User) {
        res.status(201).json({
            status: "success",
            data: User,
            token: token
        })
    } else {
        res.status(400)
        throw new Error('Error While Creating User')
    }

})

// @desc Login User
// @route POST /api/auth/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        res.status(200).json({ status: "success", data: user, token: token })
    } else {
        res.status(200)
        throw new Error('Invalid Credentials')
    }
})

module.exports = { loginUser, registerUser }