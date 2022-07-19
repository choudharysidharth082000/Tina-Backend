const express = require("express");
const router = express.Router();
//login controller
const {login} = require("../controllers/Auth");
//login route   
router.put("/login", login);
module.exports = router;