import React from "react";
import Input from "../../../components/UI/Inputs";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const UpdateCategory = props => {
	const {
		show,
		size,
		title,
		handleClose,
		expandedArray,
		checkedArray,
		categoryList,
		handleCategoryInput,
	} = props;

	return (
		<Modal show={show} handleClose={handleClose} title={title} size={size}>
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
								{categoryList.map(option => (
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
							<select
								className="form-control"
								value={item.type}
								onChange={e =>
									handleCategoryInput(
										"type",
										e.target.value,
										idx,
										"expanded"
									)
								}
							>
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
								{categoryList.map(option => (
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
							<select
								className="form-control"
								value={item.type}
								onChange={e =>
									handleCategoryInput(
										"type",
										e.target.value,
										idx,
										"checked"
									)
								}
							>
								<option value="">Select Type</option>
								<option value="store">Store</option>
								<option value="product">Product</option>
								<option value="page">Page</option>
							</select>
						</Col>
					</Row>
				))}
		</Modal>
	);
};

export default UpdateCategory;
