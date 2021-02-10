const db = require("../../models/connection");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

exports.signup = async (req, res) => {
	try {
		const { firstName, lastName, email, password, contact } = req.body;
		let user = await db.User.findOne({ email });
		if (user) throw Error("Admin already exists with this email");
		user = new db.User({
			firstName,
			lastName,
			email,
			password,
			contact,
			username: shortid.generate(),
			role: "admin",
		});
		const result = await user.save();
		if (result)
			return res.status(201).json({ message: "Admin signup successful" });
		throw Error("Something went wrong");
	} catch (err) {
		return res.status(422).json({ error: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await db.User.findOne({ email });
		if (!user) throw Error("Invalid email/password combination");
		const result = await user.comparePassword(password);
		if (result && user.role === "admin") {
			const token = jwt.sign(
				{ _id: user._id, role: user.role },
				process.env.SECRET,
				{
					expiresIn: "1d",
				}
			);
			const { role, email, firstName, lastName } = user;
			res.cookie("token", token, { expiresIn: "1d" });
			return res
				.status(200)
				.json({ token, user: { role, email, firstName, lastName } });
		} else throw Error("Invalid email/password combination");
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

exports.signout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Signout successful!" });
};
