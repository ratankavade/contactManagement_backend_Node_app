const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/contacts", require("./routes/contactRouter"));
app.use("/api/user", require("./routes/userRouter"))
app.use(errorHandler);

connectDB().then(()=>{
    console.log("DB connection sucessfull!")
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
}).catch(()=>{
    console.log("DB connection faild");
    process.exit(1);
})


