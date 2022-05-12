const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/users");
const { estimatedDocumentCount } = require('../models/users');

const getAllUsers = asyncHandler(async (req, res)=>{
    const users = await User.find();
    if(users){
        res.status(201).json({users});
    }
    else{
        res.status(400)
        throw new Error('no users')
    }
})

const login = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('Please add all fields');
    }
    const user = await User.findOne({email : email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id : user._id,
            firstname : user.firstname,
            lastname : user.lastname,
            username : user.username,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        });
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials');
    }
})
const register = asyncHandler(async (req, res)=>{
    const {firstname, lastname, username, password, email} = req.body;
    if(!firstname || !lastname || !username || !email || !password){
        res.status(400);
        throw new Error('Please add all fields');
    }
    const userExists = await User.findOne({$or : [{email : email}, {username : username}]});
    if(userExists){
        res.status(400)
        throw new Error('User exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 
    const user = await User.create({
        firstname : firstname,
        lastname : lastname,
        username : username,
        email : email,
        password : hashedPassword
    })

    if(user){

        res.status(201).json({
            _id : user.id,
            firstname : user.firstname,
            lastname : user.lastname,
            username : user.username,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        });
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})
const profile = asyncHandler(async (req, res)=>{
    res.status(200).json(req.user)
})

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}
module.exports ={
    login,
    register,
    profile,
    getAllUsers
}