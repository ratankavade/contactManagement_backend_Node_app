const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register user
//@routes POST - /api/user/register
//access public
const userRegistration = expressAsyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;
    // check if all required fields have values
    if(!username || !email || !password){
        res.status(400)
        throw new Error("Please add required fileds");
    }

    // check for duplicate entry
    const userAvailable = await User.findOne({email});
    // console.log("userAvailable", userAvailable);
    if(userAvailable){
        res.status(400)
        throw new Error("User is already registered");
    }

    // hash password so that user password will not disclose
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    // if user is created then send only id and email instead sending all information in response
    if(user){
        await res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400)
        throw new Error("User data is not valid!");
    }

    await res.status(200).json("User registed successfully!")
})

//@desc Login user
//@routes POST - /api/user/login
//access public
const userLogin = expressAsyncHandler(async(req, res)=> {
    // get email and password from request body
    const {email, password} = req.body;
    // check if email and password is not an empty field
    if(!email || !password){
        res.status(400);
        throw new Error("Please provide email and password")
    }
    // check if loggedin user is present in database
    const user = await User.findOne({email});
    // check if current provided password and user stored password (at time of registration) is same or not
    const passwordMatch = await bcrypt.compare(password, user.password);

    // if user and password match is true then create access token
    if(user && passwordMatch){
        // create jwt token
        const accessToken = await jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                _id: user._id
            }
        },
        process.env.SECRET_TOKEN,   // provide a secret token
        {
            expiresIn: "10m"        // provide expiration limit         
        })

        // store the token in cookie
        res.cookie("token", accessToken);

        // if everything is ok then send access token as a response
        await res.status(200).json({accessToken});

    }else{
        res.status(401)
        throw new Error("Email or password is not valid");
    }
})

//@desc Get current user info
//@routes GET - /api/user/profile
//access private
const getProfile = expressAsyncHandler(async(req, res)=> {
    const user = req.user;
    console.log("user", user)
    await res.status(200).json(user);
})

module.exports = {userLogin, userRegistration, getProfile}