const express = require("express");
const {userLogin, userRegistration, getProfile} = require("../controllers/userController");
const authHandler = require("../middlewares/authHandler");
const router = express.Router();

router.post("/login", userLogin)
router.post("/register", userRegistration)
router.get("/profile", authHandler, getProfile)

module.exports = router;