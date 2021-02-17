import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Inputs";
import Modal from "../../components/UI/Modal";
import { useSelector } from "react-redux";
import linearCategories from "../../helpers/linearCategories";
import { Row, Col, Button } from "react-bootstrap";

const Page = props => {
	const [title, setTitle] = useState("");
	const [createModal, setCreateModal] = useState(false);
	const [categories, setCategories] = useState([]);
	const [categoryId, setCategoryId] = useState("");
	const [desc, setDesc] = useState("");
	const [banners, setBanners] = useState([]);
	const [products, setProducts] = useState([]);
	const category = useSelector(state => state.category);

	useEffect(() => {
		setCategories(linearCategories(category.categories));
	}, [category]);

	const handleBannerImages = e => {
		console.log(e);
	};

	const handleProductImages = e => {
		console.log(e);
	};

	const renderCreatePageModal = () => {
		return (
			<Modal
				show={createModal}
				title="Create New Page"
				handleClose={() => setCreateModal(false)}
			>
				<Row>
					<Col>
						<select
							className="form-control form-control-sm"
							value={categoryId}
							onChange={e => setCategoryId(e.target.value)}
						>
							<option value="">Select Category</option>
							{categories.map((item, index) => {
								return (
									<option key={index + 1} value={item._id}>
										{item.name}
									</option>
								);
							})}
						</select>
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
				<Row>
					<Col>
						<Input
							type="file"
							name="banners"
							onChange={handleBannerImages}
						/>
					</Col>
				</Row>
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
