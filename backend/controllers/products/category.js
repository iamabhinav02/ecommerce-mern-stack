const db = require("../../models/connection");
const slugify = require("slugify");
const shortid = require("shortid");

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
			type: cat.type,
			children: createCategoryList(categories, cat._id),
		});
	}
	return result;
}

exports.addCategory = async (req, res) => {
	try {
		const categoryObject = {
			name: req.body.name,
			slug: `${slugify(req.body.name)}-${shortid.generate()}`,
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

exports.updateCategories = async (req, res) => {
	try {
		const { _id, name, type, parentId } = req.body;
		if (name instanceof Array) {
			const updatedCategories = [];
			for (let i = 0; i < name.length; i++) {
				const category = {
					name: name[i],
					type: type[i],
				};
				if (parentId[i] !== "") category.parentId = parentId[i];
				const updatedCategory = await db.Category.findOneAndUpdate(
					{ _id: _id[i] },
					category,
					{ new: true }
				);
				updatedCategories.push(updatedCategory);
			}
			res.status(201).json({ updatedCategories });
		} else {
			const category = {
				name,
				type,
			};
			if (parentId !== "") category.parentId = parentId;
			const updatedCategory = await db.Category.findOneAndUpdate(
				{ _id },
				category,
				{ new: true }
			);
			res.status(201).json({ updatedCategory });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.deleteCategories = async (req, res) => {
	try {
		const { ids } = req.body.payload;
		const deletedCategories = [];
		for (let i = 0; i < ids.length; i++) {
			const deletedCategory = await db.Category.findOneAndDelete({
				_id: ids[i]._id,
			});
			deletedCategories.push(deletedCategory);
		}
		if (deletedCategories.length === ids.length) {
			res.status(201).json({
				message: "Deleted Categories successfully",
			});
		} else {
			throw Error("Something went wrong");
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
