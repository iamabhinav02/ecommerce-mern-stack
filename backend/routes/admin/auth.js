const express = require("express");
const router = express.Router();

const { signup, login } = require("../../controllers/admin/auth");
const {
	validateSignupRequest,
	isRequestValidated,
} = require("../../validators/auth");

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/admin/login", login);

module.exports = router;
