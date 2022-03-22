const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')


// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = async(req,res) => {

    // destructuring the rquest body 
    const {name, email, password } = req.body;

    // Error handling
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists =  await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }

    // hash the password

    // create a salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        passwor:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name:user.email,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data');
    }
}

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = async(req,res) => {
    const {email, password} = req.body;

    // check for user in database by user's email
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name:user.email,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credenials');
    }

    res.json({message: 'Login User'});
}

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = async(req,res) => {
    // destructuring user's data by accessing user object in req.
    const {_id, name, email} = await User.findById(req.user.id);
    res.status(200).json({
        id:_id,
        name,
        email,
    })
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}