import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Inputs";
import { login } from "../../store/actions";

const Login = () => {
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");

	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const userLogin = e => {
		e.preventDefault();
		const user = {
			email: Email,
			password: Password,
		};
		dispatch(login(user));
	};

	if (auth.authenticate) {
		return <Redirect to={"/"} />;
	}

	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "50px" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userLogin}>
							<Input
								label="Email"
								placeholder="Enter email"
								value={Email}
								type="email"
								onChange={e => setEmail(e.target.value)}
							/>
							<Input
								label="Password"
								placeholder="Enter password"
								value={Password}
								type="password"
								onChange={e => setPassword(e.target.value)}
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

export default Login;
