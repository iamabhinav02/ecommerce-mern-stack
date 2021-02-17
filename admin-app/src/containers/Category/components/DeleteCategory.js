import React from "react";
import Modal from "../../../components/UI/Modal";

const DeleteCategory = props => {
	const {
		deleteCategoryModal,
		title,
		handleClose,
		size,
		deleteConfirmation,
		expandedArray,
		checkedArray,
	} = props;

	return (
		<Modal
			show={deleteCategoryModal}
			handleClose={handleClose}
			title={title}
			size={size}
			buttons={[
				{
					label: "No",
					color: "primary",
					onClick: () => alert("No"),
				},
				{
					label: "Yes",
					color: "danger",
					onClick: deleteConfirmation,
				},
			]}
		>
			<h5>Expanded</h5>
			{expandedArray.map((item, index) => {
				return <span key={index + 1}>{item.name} </span>;
			})}
			<h5>Checked</h5>
			{checkedArray.map((item, index) => {
				return <span key={index + 1}>{item.name} </span>;
			})}
		</Modal>
	);
};

export default DeleteCategory;
