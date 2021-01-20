const express = require("express");
const { addToCart } = require("../../controllers/user/cart");
const { auth, userRole } = require("../../middlewares");
const router = express.Router();

router.post("/user/addtocart", auth, userRole, addToCart);
// router.get("/category/getcategories", getCategories);

module.exports = router;
