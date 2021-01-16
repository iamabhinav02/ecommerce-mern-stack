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
		const result = user.comparePassword(password);
		if (result && user.role === "user") {
			const token = jwt.sign({ _id: user._id }, process.env.JWT, {
				expiresIn: "1h",
			});
			return res.status(200).json({ message: "User login successful" });
		} else throw Error("Invalid email/password combination");
	} catch (err) {
		return res.status(422).json({ error: err.message });
	}
};

exports.authentication = (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const payload = jwt.verify(token, process.env.SECRET);
	req.user = payload;
	next();
};
