const db = require("../../models/connection");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
	try {
		const { firstName, lastName, email, password, contact } = req.body;
		let user = await db.User.findOne({ email });
		if (user) throw Error("User already exists with this email");
		user = new db.User({
			firstName,
			lastName,
			email,
			password,
			contact,
			username: Math.random().toString(),
		});
		const result = await user.save();
		if (result)
			return res.status(201).json({ message: "User signup successful" });
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
		if (result && user.role === "user") {
			const token = jwt.sign(
				{ _id: user._id, role: user.role },
				process.env.SECRET,
				{
					expiresIn: "1d",
				}
			);
			const { role, email, firstName, lastName } = user;
			return res
				.status(200)
				.json({ token, user: { role, email, firstName, lastName } });
		} else throw Error("Invalid email/password combination");
	} catch (err) {
		return res.status(422).json({ error: err.message });
	}
};
