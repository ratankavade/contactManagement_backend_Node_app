const express = require("express");
const { getAllContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController");
const authHandler = require("../middlewares/authHandler");
const router = express.Router();

// router.route("/").get(getAllContacts)
// router.route("/").post(createContact)
// router.route("/:id").get(getContact)
// router.route("/:id").put(updateContact)
// router.route("/:id").delete(deleteContact)

// OR you can chain the controllers like below

router.use(authHandler)     // use middleware to give access to only authorised user
router.route("/").get(getAllContacts).post(createContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;