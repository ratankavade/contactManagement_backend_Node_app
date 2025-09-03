const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add password"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User", userModel);