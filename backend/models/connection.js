const mongoose = require("mongoose");

const connection = mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Connection to database successful!!");
	})
	.catch(() => {
		console.log("Could not connect to database!!");
	});

module.exports.User = require("./user");
module.exports.Category = require("./category");
module.exports.Product = require("./product");
module.exports.Cart = require("./cart");
module.exports.Page = require("./page");
