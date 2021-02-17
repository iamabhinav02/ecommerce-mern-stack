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
	} = props;

	return (
		<Modal show={show} handleClose={handleClose} title={title}>
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
					<select
						className="form-control form-control-sm"
						value={parentID}
						onChange={e => setParentID(e.target.value)}
					>
						<option>Select category</option>
						{categoryList.map(option => (
							<option key={option.value} value={option.value}>
								{option.name}
							</option>
						))}
					</select>
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
