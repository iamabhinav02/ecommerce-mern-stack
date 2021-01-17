import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Login from "./containers/Login";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
