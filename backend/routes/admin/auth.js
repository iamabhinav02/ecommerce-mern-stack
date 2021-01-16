const express = require("express");
const router = express.Router();

const { signup, login } = require("../../controllers/admin/auth");

router.post("/admin/signup", signup);

router.post("/admin/login", login);

module.exports = router;
