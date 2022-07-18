const express = require("express");
const router = express.Router();
//login controller
const {login} = require("../controllers/Auth");
router.put("/login", login);
module.exports = router;