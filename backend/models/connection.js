const mongoose = require("mongoose");

const connection = mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Connection to database successful!!");
	})
	.catch(() => {
		console.log("Could not connect to database!!");
	});

module.exports.User = require("./user");
module.exports.Category = require("./category");
