import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Inputs";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../store/actions";

const Product = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [productPictures, setProductPictures] = useState([]);
	const [show, setShow] = useState(false);

	const category = useSelector(state => state.category);
	const product = useSelector(state => state.product);
	const dispatch = useDispatch();

	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({ value: category._id, name: category.name });
			if (category.children) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	const renderProducts = () => {
		return (
			<Table responsive="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Category</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{product.products.length > 0 &&
						product.products.map((product, index) => {
							return (
								<tr key={product._id}>
									<td>{index + 1}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.quantity}</td>
									<td>{product.category}</td>
									<td>{product.description}</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		);
	};

	const handleProductImages = e => {
		e.preventDefault();
		setProductPictures([...productPictures, e.target.files[0]]);
	};

	const handleClose = () => {
		setShow(false);
		const form = new FormData();
		form.append("name", name);
		form.append("price", price);
		form.append("quantity", quantity);
		form.append("description", description);
		form.append("category", categoryId);
		for (let pic of productPictures) {
			form.append("pictures", pic);
		}
		dispatch(addProduct(form));
	};

	const handleShow = () => setShow(true);

	return (
		<Layout sidebar>
			<Container>
				<Row>
					<Col md={12}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<h3>Product</h3>
							<Button onClick={handleShow}>Add</Button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={12}>{renderProducts()}</Col>
				</Row>
			</Container>
			<Modal
				show={show}
				handleClose={handleClose}
				title="Add new product"
			>
				<Input
					type="text"
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder="Product Name"
				/>
				<Input
					type="text"
					value={price}
					onChange={e => setPrice(e.target.value)}
					placeholder="Price"
				/>
				<Input
					type="text"
					value={quantity}
					onChange={e => setQuantity(e.target.value)}
					placeholder="Quantity"
				/>
				<Input
					type="text"
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="Description"
				/>
				<select
					className="form-control"
					value={categoryId}
					onChange={e => setCategoryId(e.target.value)}
				>
					<option>Select category</option>
					{createCategoryList(category.categories).map(option => (
						<option key={option.value} value={option.value}>
							{option.name}
						</option>
					))}
				</select>
				{productPictures &&
					productPictures.map((pic, index) => (
						<div key={index}>{pic.name}</div>
					))}
				<input
					type="file"
					name="productImages"
					onChange={handleProductImages}
				/>
			</Modal>
		</Layout>
	);
};

export default Product;
