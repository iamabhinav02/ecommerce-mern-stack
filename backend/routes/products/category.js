const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
	addCategory,
	getCategories,
	updateCategories,
} = require("../../controllers/products/category");
const { auth, adminRole } = require("../../middlewares");

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(path.dirname(path.dirname(__dirname)), "uploads"));
	},
	filename: (req, file, cb) => {
		cb(null, shortid.generate() + "-" + file.originalname);
	},
});

const upload = multer({ storage });

router.post(
	"/category/create",
	auth,
	adminRole,
	upload.single("image"),
	addCategory
);
router.get("/category/getcategories", getCategories);

router.post("/category/update", upload.array("image"), updateCategories);

module.exports = router;
