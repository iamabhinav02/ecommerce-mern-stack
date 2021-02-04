import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Inputs";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../store/actions";

const Signup = () => {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [Email, setEmail] = useState("");
	const [Contact, setContact] = useState("");
	const [Password, setPassword] = useState("");
	const [Repassword, setRepassword] = useState("");

	const dispatch = useDispatch();

	const userSignup = e => {
		e.preventDefault();

		const user = {
			firstName: FirstName,
			lastName: LastName,
			email: Email,
			password: Password,
			repassword: Repassword,
			contact: Contact,
		};

		dispatch(signup(user));
	};

	if (auth.authenticate) {
		return <Redirect to={"/"} />;
	}

	if (user.loading) {
		<h1>Loading...</h1>;
	}

	return (
		<Layout>
			<Container>
				{user.message}
				<Row style={{ marginTop: "50px", paddingTop: "60px" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userSignup}>
							<Row>
								<Col md={6}>
									<Input
										label="First Name"
										placeholder="Enter first name"
										value={FirstName}
										type="text"
										onChange={e =>
											setFirstName(e.target.value)
										}
									/>
								</Col>
								<Col md={6}>
									<Input
										label="Last Name"
										placeholder="Enter last name"
										value={LastName}
										type="text"
										onChange={e =>
											setLastName(e.target.value)
										}
									/>
								</Col>
							</Row>
							<Input
								label="Email"
								placeholder="Enter email"
								value={Email}
								type="email"
								onChange={e => setEmail(e.target.value)}
							/>
							<Input
								label="Contact No."
								placeholder="Enter contact number"
								value={Contact}
								type="text"
								onChange={e => setContact(e.target.value)}
							/>
							<Input
								label="Password"
								placeholder="Enter password"
								value={Password}
								type="password"
								onChange={e => setPassword(e.target.value)}
							/>
							<Input
								label="Re-Password"
								placeholder="Re-enter password for verification"
								value={Repassword}
								type="password"
								onChange={e => setRepassword(e.target.value)}
							/>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default Signup;
