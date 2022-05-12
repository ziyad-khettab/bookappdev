const asyncHandler = require('express-async-handler');
const User = require('../models/users');

const isAdmin = asyncHandler( async (req, res, next) =>{
    try{
        if(req.user.id){
            const user = await User.findById(req.user.id);
            if(user.isAdmin){
                next();
            }
            else{
                res.status(401)
                throw new Error('not the admin');
            }
        }
    }
    catch(error){
        res.status(401)
        throw new Error('not authorized')
    };
})
module.exports = {isAdmin}