const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/users'); 

const auth = asyncHandler( async (req, res, next) =>{
    let token;
    console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        catch(error){
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})
module.exports = {auth};