import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Inputs";

const Signup = () => {
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "50px" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form>
							<Row>
								<Col md={6}>
									<Input
										label="First Name"
										placeholder="Enter first name"
										value=""
										type="text"
										onChange={() => {}}
									/>
								</Col>
								<Col md={6}>
									<Input
										label="Last Name"
										placeholder="Enter last name"
										value=""
										type="text"
										onChange={() => {}}
									/>
								</Col>
							</Row>
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
							<Input
								label="Re-Password"
								placeholder="Re-enter password for verification"
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

export default Signup;
