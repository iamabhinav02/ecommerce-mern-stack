import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions";

const Header = props => {
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const logoutUser = () => {
		dispatch(logout());
	};

	const renderNonLoggedInLinks = () => {
		return (
			<Nav>
				<li className="nav-item">
					<Link to="/login" className="nav-link">
						Login
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/signup" className="nav-link">
						Signup
					</Link>
				</li>
			</Nav>
		);
	};

	const renderLoggedInLinks = () => {
		return (
			<Nav>
				<li className="nav-item">
					<span className="nav-link" onClick={logoutUser}>
						Logout
					</span>
				</li>
			</Nav>
		);
	};

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="dark"
			variant="dark"
			style={{ zIndex: 1 }}
		>
			<Container fluid>
				<Link to="/" className="navbar-brand">
					Admin Dashboard
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						{/* <NavDropdown
							title="Dropdown"
							id="collasible-nav-dropdown"
						>
							<NavDropdown.Item href="#action/3.1">
								Action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">
								Something
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
					{auth.authenticate
						? renderLoggedInLinks()
						: renderNonLoggedInLinks()}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
