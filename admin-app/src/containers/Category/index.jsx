import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import {
	createCategory,
	getAllCategory,
	updateCategories,
	deleteCategories,
} from "../../store/actions";
import CheckboxTree from "react-checkbox-tree";
import {
	IoCheckboxOutline,
	IoCheckbox,
	IoChevronDown,
	IoChevronForward,
} from "react-icons/io5";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategory from "./components/UpdateCategory";
import AddCategory from "./components/AddCategory";
import DeleteCategory from "./components/DeleteCategory";
import "./style.css";

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
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
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
				type: category.type,
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

	const updateCheckedAndExpandedCategory = () => {
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

	const updateCategory = () => {
		updateCheckedAndExpandedCategory();
		setUpdateCategoryModal(true);
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
		dispatch(updateCategories(form));
		setUpdateCategoryModal(false);
	};

	const deleteCategory = () => {
		updateCheckedAndExpandedCategory();
		setDeleteCategoryModal(true);
	};

	const deleteConfirmation = () => {
		const checkedIds = checkedArray.map(item => {
			return {
				_id: item.value,
			};
		});
		// const expandedIds = expandedArray.map(item => {
		// 	return {
		// 		_id: item.value,
		// 	};
		// });
		// const ids = expandedIds.concat(checkedIds);
		if (checkedIds.length > 0) {
			dispatch(deleteCategories(checkedIds));
		}
		setDeleteCategoryModal(false);
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
							<div className="actionBtnContainer">
								<Button onClick={handleShow}>Add</Button>
								<Button onClick={deleteCategory}>Delete</Button>
								<Button onClick={updateCategory}>Edit</Button>
							</div>
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
			</Container>

			{/* Add new Category Modal*/}

			<AddCategory
				show={show}
				handleClose={() => setShow(false)}
				onSubmit={handleCreateCategoryClose}
				title="Add new category"
				categoryName={categoryName}
				setCategoryName={setCategoryName}
				parentID={parentID}
				setParentID={setParentID}
				categoryList={createCategoryList(category.categories)}
				setCategoryImage={setCategoryImage}
			/>

			{/* Edit Category Modal*/}

			<UpdateCategory
				show={updateCategoryModal}
				handleClose={() => setUpdateCategoryModal(false)}
				onSubmit={handleEditCategoryClose}
				title="Edit categories"
				size="lg"
				expandedArray={expandedArray}
				checkedArray={checkedArray}
				categoryList={createCategoryList(category.categories)}
				handleCategoryInput={handleCategoryInput}
			/>
			{/* Delete Category Modal */}

			<DeleteCategory
				deleteCategoryModal={deleteCategoryModal}
				handleClose={() => setDeleteCategoryModal(false)}
				title="Are you sure you want to delete ?"
				size="lg"
				expandedArray={expandedArray}
				checkedArray={checkedArray}
				deleteConfirmation={deleteConfirmation}
			/>
		</Layout>
	);
};

export default Category;
