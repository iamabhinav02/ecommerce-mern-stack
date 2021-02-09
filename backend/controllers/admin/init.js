const db = require("../../models/connection");

function createCategoryList(categories, parentId = null) {
	const result = [];
	let category;
	if (parentId == null) {
		category = categories.filter(cat => cat.parentId == undefined);
	} else {
		category = categories.filter(cat => cat.parentId == parentId);
	}
	for (let cat of category) {
		result.push({
			_id: cat._id,
			name: cat.name,
			parentId: cat.parentId,
			slug: cat.slug,
			children: createCategoryList(categories, cat._id),
		});
	}
	return result;
}

exports.fetchInitData = async (req, res) => {
	try {
		const categories = await db.Category.find({});
		const products = await db.Product.find({})
			.select("_id name price quantity description category pictures")
			.populate({ path: "category", select: "_id name" });
		return res
			.status(200)
			.json({ categories: createCategoryList(categories), products });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};
