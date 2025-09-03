const mongoose = require("mongoose");

const contactModel = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required: [true, "Please add contact name"]
    }, 
    email:{
        type: String,
        required: [true, "Please add contact email"],
        unique: true
    }, 
    phone: {
        type: String,
        required: [true, "Please add contact number"]
    }
})

module.exports = mongoose.model("Contact", contactModel);