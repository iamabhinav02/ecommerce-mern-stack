const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(400).json({ error: "Authorization required" });
	}
	const token = req.headers.authorization.split(" ")[1];
	const payload = jwt.verify(token, process.env.SECRET);
	req.user = payload;
	next();
};

exports.adminRole = (req, res, next) => {
	if (req.user.role !== "admin")
		return res.status(400).json({ error: "Admin access denied" });
	next();
};

exports.userRole = (req, res, next) => {
	if (req.user.role !== "user")
		return res.status(400).json({ error: "User access denied" });
	next();
};
