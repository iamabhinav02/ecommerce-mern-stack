// import { productConstants } from "./constants";
import axios from "../../helpers/axios";

export const addProduct = form => {
	return async dispatch => {
		const res = await axios.post("/product/addproduct", form);
		console.log(res);
	};
};
