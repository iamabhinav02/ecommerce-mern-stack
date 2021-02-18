import React from "react";
import { Modal, Button } from "react-bootstrap";

const NewModal = props => {
	return (
		<Modal size={props.size} show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
			<Modal.Footer>
				{props.buttons ? (
					props.buttons.map((btn, index) => {
						return (
							<Button
								key={index + 1}
								variant={btn.color}
								onClick={btn.onClick}
								{...props}
								className="btn-sm"
							>
								{btn.label}
							</Button>
						);
					})
				) : (
					<Button
						variant="primary"
						{...props}
						className="btn-sm"
						onClick={props.onSubmit}
					>
						Save
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default NewModal;
