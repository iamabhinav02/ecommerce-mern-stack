const express = require("express");
const { createPage } = require("../../controllers/admin/page");
const { auth, adminRole, upload } = require("../../middlewares");

const router = express.Router();

router.post(
	"/page/create",
	auth,
	adminRole,
	upload.fields([{ name: "products" }, { name: "banners" }]),
	createPage
);

module.exports = router;
