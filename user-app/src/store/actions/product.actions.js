import { productConstants } from "./constants";
import axios from "../../helpers/axios";

export const getProductsBySlug = slug => {
	return async dispatch => {
		dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST });
		const res = await axios.get(`/products/${slug}`);
		if (res.status === 200) {
			dispatch({
				type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
				payload: res.data,
			});
		} else {
			dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE });
		}
	};
};
