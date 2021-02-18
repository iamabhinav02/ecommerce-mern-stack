const db = require("../../models/connection");

exports.createPage = async (req, res) => {
	try {
		if (req.files) {
			const { banners, products } = req.files;
			if (banners.length) {
				req.body.banners = banners.map((banner, index) => ({
					img: `${process.env.HOST}/public/${banner.filename}`,
					navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
				}));
			}
			if (products.length) {
				req.body.products = products.map((product, index) => ({
					img: `${process.env.HOST}/public/${product.filename}`,
					navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
				}));
			}
		}
		req.body.createdBy = req.user._id;
		const page = new db.Page(req.body);
		const result = await page.save();
		if (!result) throw Error("Error while creating page");
		return res.status(201).json({ page });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};
