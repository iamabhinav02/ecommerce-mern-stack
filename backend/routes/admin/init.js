const express = require("express");
const { fetchInitData } = require("../../controllers/admin/init");
const { auth, adminRole } = require("../../middlewares");

const router = express.Router();

router.get("/init", auth, adminRole, fetchInitData);

module.exports = router;
