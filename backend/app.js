require("dotenv").config();
const express = require("express");
const db = require("./models/connection");
const userAuth = require("./routes/user/auth");
const adminAuth = require("./routes/admin/auth");

const app = express();

app.use(express.json());
app.use("/api", userAuth);
app.use("/api", adminAuth);

app.listen(process.env.PORT, () => {
	console.log(`Server running on PORT ${process.env.PORT}...`);
});
