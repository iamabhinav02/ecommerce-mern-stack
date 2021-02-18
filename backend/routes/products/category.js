const express = require("express");
const {
	addCategory,
	getCategories,
	updateCategories,
	deleteCategories,
} = require("../../controllers/products/category");
const { auth, adminRole, upload } = require("../../middlewares");
const router = express.Router();

router.post(
	"/category/create",
	auth,
	adminRole,
	upload.single("image"),
	addCategory
);
router.get("/category/getcategories", getCategories);

router.post("/category/update", upload.array("image"), updateCategories);
router.post("/category/delete", deleteCategories);

module.exports = router;
