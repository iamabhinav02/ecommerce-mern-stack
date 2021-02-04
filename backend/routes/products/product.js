const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const {
	addProduct,
	getProducts,
} = require("../../controllers/products/product");

const { auth, adminRole } = require("../../middlewares");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(path.dirname(path.dirname(__dirname)), "uploads"));
	},
	filename: (req, file, cb) => {
		cb(null, shortid.generate() + "-" + file.originalname);
	},
});
const upload = multer({ storage });

const router = express.Router();

router.post(
	"/product/addproduct",
	auth,
	adminRole,
	upload.array("image"),
	addProduct
);

// router.get("/product/getproducts", getProducts);

module.exports = router;
