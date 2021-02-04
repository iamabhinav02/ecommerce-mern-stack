require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const userAuth = require("./routes/user/auth");
const cart = require("./routes/user/cart");
const adminAuth = require("./routes/admin/auth");
const initData = require("./routes/admin/init");
const category = require("./routes/products/category");
const product = require("./routes/products/product");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userAuth);
app.use("/api", cart);
app.use("/api", adminAuth);
app.use("/api", initData);
app.use("/api", category);
app.use("/api", product);

app.listen(process.env.PORT, () => {
	console.log(`Server running on PORT ${process.env.PORT}...`);
});
