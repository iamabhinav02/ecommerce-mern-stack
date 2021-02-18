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
import { isUserLoggedIn, initialData } from "./store/actions";
import Category from "./containers/Category";
import Page from "./containers/Page";

const App = () => {
	const auth = useSelector(state => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
		if (auth.authenticate) {
			dispatch(initialData());
		}
	}, [auth.authenticate]);

	return (
		<div>
			<Switch>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/page" component={Page} />
				<PrivateRoute exact path="/products" component={Product} />
				<PrivateRoute exact path="/orders" component={Order} />
				<PrivateRoute exact path="/categories" component={Category} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</div>
	);
};

export default App;
