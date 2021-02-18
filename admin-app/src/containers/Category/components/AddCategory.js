import React from "react";
import Input from "../../../components/UI/Inputs";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const AddCategory = props => {
	const {
		show,
		handleClose,
		title,
		categoryName,
		setCategoryName,
		parentID,
		setParentID,
		categoryList,
		setCategoryImage,
		onSubmit,
	} = props;

	return (
		<Modal
			show={show}
			handleClose={handleClose}
			title={title}
			onSubmit={onSubmit}
		>
			<Row>
				<Col>
					<Input
						className="form-control-sm"
						type="text"
						value={categoryName}
						onChange={e => setCategoryName(e.target.value)}
						placeholder="Category Name"
					/>
				</Col>
				<Col>
					<Input
						type="select"
						placeholder="Select Category"
						value={parentID}
						onChange={e => setParentID(e.target.value)}
						options={categoryList}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type="file"
						name="categoryImage"
						onChange={e => setCategoryImage(e.target.files[0])}
					/>
				</Col>
			</Row>
		</Modal>
	);
};

export default AddCategory;
