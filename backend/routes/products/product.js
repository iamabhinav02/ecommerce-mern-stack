const express = require("express");
const {
	addProduct,
	getProducts,
	getProductsBySlug,
} = require("../../controllers/products/product");

const { auth, adminRole, upload } = require("../../middlewares");
const router = express.Router();

router.post(
	"/product/addproduct",
	auth,
	adminRole,
	upload.array("image"),
	addProduct
);

router.get("/product/getproducts", getProducts);

router.get("/products/:slug", getProductsBySlug);

module.exports = router;
