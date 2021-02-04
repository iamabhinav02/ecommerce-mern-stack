const express = require("express");
const { fetchInitData } = require("../../controllers/admin/init");

const router = express.Router();

router.get("/init", fetchInitData);

module.exports = router;
