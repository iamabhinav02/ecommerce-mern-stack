import React from "react";
import Layout from "../../components/Layout";
import getParamsObj from "../../utils/getParamsObj";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage";
import "./style.css";

const ProductListPage = props => {
	const renderProducts = () => {
		const paramObj = getParamsObj(props.location.search);
		let content = null;
		switch (paramObj.type) {
			case "store":
				content = <ProductStore {...props} />;
				break;
			case "page":
				content = <ProductPage {...props} />;
				break;
			default:
				content = null;
		}
		return content;
	};
	return <Layout>{renderProducts()}</Layout>;
};

export default ProductListPage;
