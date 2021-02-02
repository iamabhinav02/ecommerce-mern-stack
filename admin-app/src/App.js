import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Order from "./containers/Orders";
import Product from "./containers/Products";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn } from "./store/actions";

const App = () => {
	const auth = useSelector(state => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
	}, []);

	return (
		<div>
			<Switch>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute path="/products" component={Product} />
				<PrivateRoute path="/orders" component={Order} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</div>
	);
};

export default App;
