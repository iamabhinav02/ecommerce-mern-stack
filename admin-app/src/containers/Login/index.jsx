import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Inputs";

const Login = () => {
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "50px" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form>
							<Input
								label="Email"
								placeholder="Enter email"
								value=""
								type="email"
								onChange={() => {}}
							/>
							<Input
								label="Password"
								placeholder="Enter password"
								value=""
								type="password"
								onChange={() => {}}
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
