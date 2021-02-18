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
		onSubmit,
	} = props;

	return (
		<Modal
			show={show}
			handleClose={handleClose}
			title={title}
			size={size}
			onSubmit={onSubmit}
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
							<Input
								type="select"
								value={item.parentId}
								onChange={e =>
									handleCategoryInput(
										"parentId",
										e.target.value,
										idx,
										"expanded"
									)
								}
								options={categoryList}
								placeholder="Select Category"
							/>
						</Col>
						<Col>
							<Input
								type="select"
								value={item.type}
								onChange={e =>
									handleCategoryInput(
										"type",
										e.target.value,
										idx,
										"expanded"
									)
								}
								placeholder="Select Type"
								options={[]}
							/>
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
							<Input
								type="select"
								value={item.parentId}
								onChange={e =>
									handleCategoryInput(
										"parentId",
										e.target.value,
										idx,
										"checked"
									)
								}
								options={categoryList}
								placeholder="Select Category"
							/>
						</Col>
						<Col>
							<Input
								type="select"
								value={item.type}
								onChange={e =>
									handleCategoryInput(
										"type",
										e.target.value,
										idx,
										"checked"
									)
								}
								options={[]}
								placeholder="Select Type"
							/>
						</Col>
					</Row>
				))}
		</Modal>
	);
};

export default UpdateCategory;
