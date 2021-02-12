import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./containers/HomePage";
import ProductListPage from "./containers/ProductListPage";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/:slug" component={ProductListPage} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
