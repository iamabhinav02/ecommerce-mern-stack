const db = require("../../models/connection");
const slugify = require("slugify");

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
			slug: cat.slug,
			children: createCategoryList(categories, cat._id),
		});
	}
	return result;
}

exports.addCategory = async (req, res) => {
	try {
		const categoryObject = {
			name: req.body.name,
			slug: slugify(req.body.name),
		};
		if (req.file)
			categoryObject.image =
				process.env.HOST + "/public/" + req.file.filename;
		if (req.body.parentId) categoryObject.parentId = req.body.parentId;
		const category = new db.Category(categoryObject);
		const result = await category.save();
		if (!result) throw Error("Category could not be saved");
		else return res.status(201).json({ result });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

exports.getCategories = async (req, res) => {
	try {
		const categories = await db.Category.find({});
		if (!categories) throw Error("Could not fetch all the categories");
		else {
			const categoryList = createCategoryList(categories);
			return res.status(200).json({ categoryList });
		}
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};
