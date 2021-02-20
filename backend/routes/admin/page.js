const express = require("express");
const { createPage, getPage } = require("../../controllers/admin/page");
const { auth, adminRole, upload } = require("../../middlewares");

const router = express.Router();

router.post(
	"/page/create",
	auth,
	adminRole,
	upload.fields([{ name: "products" }, { name: "banners" }]),
	createPage
);

router.get("/page/:category/:type", getPage);

module.exports = router;
