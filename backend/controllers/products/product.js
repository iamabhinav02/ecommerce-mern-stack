const db = require("../../models/connection");
const slugify = require("slugify");

exports.addProduct = async (req, res) => {
	try {
		const { name, price, description, category, quantity } = req.body;
		let pictures = [];
		if (req.files.length) {
			pictures = req.files.map(file => {
				return { img: file.filename };
			});
		}
		const product = new db.Product({
			name,
			price,
			quantity,
			description,
			pictures,
			category,
			createdBy: req.user._id,
			slug: slugify(name),
		});
		const result = await product.save();
		if (!result) throw Error("Error creating the product");
		return res.status(201).json({ result });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

exports.getProducts = async (req, res) => {
	try {
		const products = await db.Product.find({});
		if (!products) throw Error("Could not fetch all the products");
		else {
			return res.status(200).json({ products });
		}
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

exports.getProductsBySlug = async (req, res) => {
	try {
		const { slug } = req.params;
		const category = await db.Category.findOne({ slug }).select("_id");
		if (!category)
			return res
				.status(400)
				.json({ error: "Could not find the category" });
		else {
			const products = await db.Product.find({ category: category._id });
			if (!products)
				return res
					.status(400)
					.json({ error: "Could not find any products" });
			else {
				return res.status(200).json({
					products,
					productsByPrice: {
						under5k: products.filter(
							product => product.price <= 5000
						),
						under10k: products.filter(
							product =>
								product.price > 5000 && product.price <= 10000
						),
						under15k: products.filter(
							product =>
								product.price > 10000 && product.price <= 15000
						),
						under20k: products.filter(
							product =>
								product.price > 15000 && product.price <= 20000
						),
					},
				});
			}
		}
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};
