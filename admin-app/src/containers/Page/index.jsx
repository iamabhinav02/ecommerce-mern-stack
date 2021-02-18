import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Inputs";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import linearCategories from "../../helpers/linearCategories";
import { createPage } from "../../store/actions";
import { Row, Col, Button } from "react-bootstrap";

const Page = () => {
	const [title, setTitle] = useState("");
	const [createModal, setCreateModal] = useState(false);
	const [categories, setCategories] = useState([]);
	const [categoryId, setCategoryId] = useState("");
	const [desc, setDesc] = useState("");
	const [type, setType] = useState("");
	const [banners, setBanners] = useState([]);
	const [products, setProducts] = useState([]);

	const category = useSelector(state => state.category);
	const dispatch = useDispatch();

	useEffect(() => {
		setCategories(linearCategories(category.categories));
	}, [category]);

	const handleBannerImages = e => {
		setBanners([...banners, e.target.files[0]]);
	};

	const handleProductImages = e => {
		setProducts([...products, e.target.files[0]]);
	};

	const onCategoryChange = e => {
		const cat = categories.find(
			category => category.value == e.target.value
		);
		setCategoryId(e.target.value);
		setType(cat.type);
	};

	const createPageForm = () => {
		const form = new FormData();
		form.append("title", title);
		form.append("description", desc);
		form.append("category", categoryId);
		form.append("type", type);
		banners.forEach(banner => {
			form.append("banners", banner);
		});
		products.forEach(product => {
			form.append("products", product);
		});
		dispatch(createPage(form));
		setCreateModal(false);
		setTitle("");
		setCategoryId("");
		setBanners([]);
		setProducts([]);
		setDesc("");
		setType("");
	};

	const renderCreatePageModal = () => {
		return (
			<Modal
				show={createModal}
				title="Create New Page"
				handleClose={() => setCreateModal(false)}
				onSubmit={createPageForm}
			>
				<Row>
					<Col>
						<Input
							type="select"
							value={categoryId}
							onChange={onCategoryChange}
							placeholder="Select Category"
							options={categories}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Input
							value={title}
							onChange={e => setTitle(e.target.value)}
							placeholder="Page title"
							className="form-control-sm"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Input
							value={desc}
							onChange={e => setDesc(e.target.value)}
							placeholder="Page Description"
							className="form-control-sm"
						/>
					</Col>
				</Row>
				{banners.length > 0 &&
					banners.map((banner, index) => (
						<Row key={index + 1}>
							<Col>{banner.item}</Col>
						</Row>
					))}
				<Row>
					<Col>
						<Input
							type="file"
							name="banners"
							onChange={handleBannerImages}
						/>
					</Col>
				</Row>
				{products.length > 0 &&
					products.map((product, index) => (
						<Row key={index + 1}>
							<Col>{product.item}</Col>
						</Row>
					))}
				<Row>
					<Col>
						<Input
							type="file"
							name="products"
							onChange={handleProductImages}
						/>
					</Col>
				</Row>
			</Modal>
		);
	};

	return (
		<Layout sidebar>
			{renderCreatePageModal()}
			<Button onClick={() => setCreateModal(true)}>
				Create New Page
			</Button>
		</Layout>
	);
};

export default Page;
