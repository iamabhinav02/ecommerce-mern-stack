const express = require("express");
const router = express.Router();

const { signup, login } = require("../../controllers/user/auth");

router.post("/user/signup", signup);

router.post("/user/login", login);

module.exports = router;
