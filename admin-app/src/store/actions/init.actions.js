import { categoryConstants, productConstants } from "./constants";
import axios from "../../helpers/axios";

export const initialData = () => {
	return async dispatch => {
		const res = await axios.get("/init");
		if (res.status === 200) {
			const { categories, products } = res.data;
			dispatch({
				type: categoryConstants.GET_CATEGORY_SUCCESS,
				payload: { categories },
			});
			dispatch({
				type: productConstants.GET_PRODUCT_SUCCESS,
				payload: { products },
			});
		} else {
			// dispatch({
			// 	type: categoryConstants.GET_CATEGORY_FAILURE,
			// 	error: res.data.error,
			// });
			// dispatch({
			// 	type: productConstants.GET_PRODUCT_FAILURE,
			// 	error: res.data.error,
			// });
			console.log(res);
		}
	};
};
