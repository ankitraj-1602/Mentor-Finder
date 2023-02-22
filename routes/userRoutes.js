const express = require("express");
const router = express.Router();
const { register, login, getAllUser, deleteUser } = require("../controller/userController");

router.post("/register", register)
router.post("/login", login)
router.get("/getallusers", getAllUser)
router.post("/deleteuser", deleteUser)


module.exports = router