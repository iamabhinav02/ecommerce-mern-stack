import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import { createCategory } from "../../store/actions";
import Input from "../../components/UI/Inputs";
import Modal from "../../components/UI/Modal";

const Category = () => {
	const [show, setShow] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [parentID, setParentID] = useState("");
	const [categoryImage, setCategoryImage] = useState("");
	const category = useSelector(state => state.category);
	const dispatch = useDispatch();

	const renderCategories = categories => {
		let categoryList = [];
		for (let category of categories) {
			categoryList.push(
				<li key={category._id}>
					{category.name}
					{category.children && (
						<ul>{renderCategories(category.children)}</ul>
					)}
				</li>
			);
		}
		return categoryList;
	};

	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({ value: category._id, name: category.name });
			if (category.children) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	const handleClose = () => {
		setShow(false);
		const form = new FormData();
		form.append("name", categoryName);
		form.append("parentId", parentID);
		form.append("image", categoryImage);
		dispatch(createCategory(form));
		setCategoryImage("");
		setCategoryName("");
		setParentID("");
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
							<h3>Category</h3>
							<Button onClick={handleShow}>Add</Button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<ul>{renderCategories(category.categories)}</ul>
					</Col>
				</Row>
			</Container>
			<Modal
				show={show}
				handleClose={handleClose}
				title="Add new category"
			>
				<Input
					type="text"
					value={categoryName}
					onChange={e => setCategoryName(e.target.value)}
					placeholder="Category Name"
				/>
				<select
					className="form-control"
					value={parentID}
					onChange={e => setParentID(e.target.value)}
				>
					<option>Select category</option>
					{createCategoryList(category.categories).map(option => (
						<option key={option.value} value={option.value}>
							{option.name}
						</option>
					))}
				</select>
				<input
					type="file"
					name="categoryImage"
					onChange={e => setCategoryImage(e.target.files[0])}
				/>
			</Modal>
		</Layout>
	);
};

export default Category;
