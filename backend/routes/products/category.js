const express = require("express");
const {
	addCategory,
	getCategories,
} = require("../../controllers/products/category");
const {
	authentication,
	adminRoleAuthentication,
} = require("../../middlewares");
const router = express.Router();

router.post(
	"/category/create",
	authentication,
	adminRoleAuthentication,
	addCategory
);
router.get("/category/getcategories", getCategories);

module.exports = router;
