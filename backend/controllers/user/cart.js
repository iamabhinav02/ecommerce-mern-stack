const db = require("../../models/connection");

exports.addToCart = async (req, res) => {
	try {
		const cart = await db.Cart.findOne({ user: req.user._id });
		if (cart) {
			const itemExists = cart.cartItems.find(
				item => item.product == req.body.cartItems.product
			);
			let condition, action;
			if (itemExists) {
				condition = {
					user: req.user._id,
					"cartItems.product": req.body.cartItems.product,
				};
				action = {
					$set: {
						"cartItems.$": {
							...req.body.cartItems,
							quantity:
								itemExists.quantity +
								req.body.cartItems.quantity,
						},
					},
				};
			} else {
				condition = { user: req.user._id };
				action = { $push: { cartItems: req.body.cartItems } };
			}
			const updatedCart = await db.Cart.findOneAndUpdate(
				condition,
				action
			);
			const result = await updatedCart.save();
			if (!result) throw Error("Item could not be added to cart");
			return res.status(201).json({ result });
		} else {
			const newcart = new db.Cart({
				user: req.user._id,
				cartItems: [req.body.cartItems],
			});
			const result = await newcart.save();
			if (!result) throw Error("Item could not be added to cart");
			return res.status(201).json({ result });
		}
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};
