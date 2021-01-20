const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 20,
		},
		lastName: {
			type: String,
			trim: true,
			minlength: 3,
			maxlength: 20,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
			trim: true,
		},
		profilePicture: {
			type: String,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) {
			next();
		}
		const hashed = await bcrypt.hash(this.password, 10);
		this.password = hashed;
		next();
	} catch (err) {
		return next(err);
	}
});

userSchema.methods.comparePassword = async function (attempt) {
	try {
		return await bcrypt.compare(attempt, this.password);
	} catch (err) {
		return err;
	}
};

module.exports = mongoose.model("User", userSchema);
