import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import {
	createCategory,
	getAllCategory,
	updateCategories,
} from "../../store/actions";
import Input from "../../components/UI/Inputs";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
	IoCheckboxOutline,
	IoCheckbox,
	IoChevronDown,
	IoChevronForward,
} from "react-icons/io5";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const Category = () => {
	const [show, setShow] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [parentID, setParentID] = useState("");
	const [categoryImage, setCategoryImage] = useState("");
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	const category = useSelector(state => state.category);
	const dispatch = useDispatch();

	const renderCategories = categories => {
		let categoryList = [];
		for (let category of categories) {
			categoryList.push({
				label: category.name,
				value: category._id,
				children:
					category.children &&
					category.children.length > 0 &&
					renderCategories(category.children),
			});
		}
		return categoryList;
	};

	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({
				value: category._id,
				name: category.name,
				parentId: category.parentId,
			});
			if (category.children) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	const handleCreateCategoryClose = () => {
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

	const updateCategory = () => {
		setUpdateCategoryModal(true);
		const categories = createCategoryList(category.categories);
		const localCheckedArray = [];
		checked.length > 0 &&
			checked.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId === category.value
				);
				category && localCheckedArray.push(category);
			});
		const localExpandedArray = [];
		expanded.length > 0 &&
			expanded.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId === category.value
				);
				category && localExpandedArray.push(category);
			});
		setCheckedArray(localCheckedArray);
		setExpandedArray(localExpandedArray);
	};

	const handleCategoryInput = (key, value, index, type) => {
		if (type === "checked") {
			const updatedArray = checkedArray.map((item, idx) =>
				idx === index ? { ...item, [key]: value } : item
			);
			setCheckedArray(updatedArray);
		} else if (type === "expanded") {
			const updatedArray = expandedArray.map((item, idx) =>
				idx === index ? { ...item, [key]: value } : item
			);
			setExpandedArray(updatedArray);
		}
	};

	const handleShow = () => setShow(true);

	const handleEditCategoryClose = () => {
		const form = new FormData();
		expandedArray.forEach(item => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});
		checkedArray.forEach(item => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});
		dispatch(updateCategories(form)).then(result => {
			if (result) dispatch(getAllCategory());
		});
		setUpdateCategoryModal(false);
		setExpanded([]);
		setExpandedArray([]);
		setCheckedArray([]);
		setChecked([]);
	};

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
						<CheckboxTree
							nodes={renderCategories(category.categories)}
							checked={checked}
							expanded={expanded}
							onCheck={checked => setChecked(checked)}
							onExpand={expanded => setExpanded(expanded)}
							icons={{
								check: <IoCheckbox />,
								uncheck: <IoCheckboxOutline />,
								halfCheck: <IoCheckboxOutline />,
								expandClose: <IoChevronForward />,
								expandOpen: <IoChevronDown />,
							}}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<button>Delete</button>
						<button onClick={updateCategory}>Edit</button>
					</Col>
				</Row>
			</Container>

			{/* Add new Category Modal*/}

			<Modal
				show={show}
				handleClose={handleCreateCategoryClose}
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

			{/* Edit Category Modal*/}

			<Modal
				show={updateCategoryModal}
				handleClose={handleEditCategoryClose}
				title="Edit categories"
				size="lg"
			>
				<Row>
					<Col>
						<h6>Expanded</h6>
					</Col>
				</Row>
				{expandedArray.length > 0 &&
					expandedArray.map((item, idx) => (
						<Row key={idx + 1}>
							<Col>
								<Input
									type="text"
									value={item.name}
									onChange={e =>
										handleCategoryInput(
											"name",
											e.target.value,
											idx,
											"expanded"
										)
									}
									placeholder="Category Name"
								/>
							</Col>
							<Col>
								<select
									className="form-control"
									value={item.parentId}
									onChange={e =>
										handleCategoryInput(
											"parentId",
											e.target.value,
											idx,
											"expanded"
										)
									}
								>
									<option>Select category</option>
									{createCategoryList(
										category.categories
									).map(option => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.name}
										</option>
									))}
								</select>
							</Col>
							<Col>
								<select className="form-control">
									<option value="">Select Type</option>
									<option value="store">Store</option>
									<option value="product">Product</option>
									<option value="page">Page</option>
								</select>
							</Col>
						</Row>
					))}
				<Row>
					<Col>
						<h6>Checked</h6>
					</Col>
				</Row>
				{checkedArray.length > 0 &&
					checkedArray.map((item, idx) => (
						<Row key={idx + 1}>
							<Col>
								<Input
									type="text"
									value={item.name}
									onChange={e =>
										handleCategoryInput(
											"name",
											e.target.value,
											idx,
											"checked"
										)
									}
									placeholder="Category Name"
								/>
							</Col>
							<Col>
								<select
									className="form-control"
									value={item.parentId}
									onChange={e =>
										handleCategoryInput(
											"parentId",
											e.target.value,
											idx,
											"checked"
										)
									}
								>
									<option>Select category</option>
									{createCategoryList(
										category.categories
									).map(option => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.name}
										</option>
									))}
								</select>
							</Col>
							<Col>
								<select className="form-control">
									<option value="">Select Type</option>
									<option value="store">Store</option>
									<option value="product">Product</option>
									<option value="page">Page</option>
								</select>
							</Col>
						</Row>
					))}
				{/* <input
					type="file"
					name="categoryImage"
					onChange={e => setCategoryImage(e.target.files[0])}
				/> */}
			</Modal>
		</Layout>
	);
};

export default Category;
