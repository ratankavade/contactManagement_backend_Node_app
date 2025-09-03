const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

const authHandler = expressAsyncHandler(async(req, res, next) => {
    // get token from stored cookies
    const {token} = req.cookies;

    if(!token){
        res.status(401);
        throw new Error("Token is not valid");
    }

    // decode the object which we have passed while creating jwt token
    const decodedObj = jwt.verify(token, process.env.SECRET_TOKEN);

    // extract id from the decoded object
    const { _id } = decodedObj.user;
    // get user details from id
    const user = await User.findById({_id}).select("-password"); ;

    if(!user){
        res.status(401);
        throw new Error("User is not authorised");
    }

    // send user to request
    req.user = user;

    // call next handler
    next();
})

module.exports = authHandler;