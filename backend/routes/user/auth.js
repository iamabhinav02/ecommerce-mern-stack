const express = require("express");
const { signup, login } = require("../../controllers/user/auth");
const {
	validateSignupRequest,
	isRequestValidated,
} = require("../../validators/auth");

const router = express.Router();

router.post("/user/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/user/login", login);

module.exports = router;
