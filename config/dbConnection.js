const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rakavade32_db_user:admin@ratan-mycontacts-db.1cgjnk7.mongodb.net/myContacts')
}

module.exports = connectDB;