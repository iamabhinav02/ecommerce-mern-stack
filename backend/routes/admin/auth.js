const express = require("express");
const router = express.Router();

const { signup, login, signout } = require("../../controllers/admin/auth");
const {
	validateSignupRequest,
	isRequestValidated,
} = require("../../validators/auth");
const { auth } = require("../../middlewares");

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/admin/login", login);

router.post("/admin/signout", auth, signout);

module.exports = router;
