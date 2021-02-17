import { categoryConstants } from "./constants";
import axios from "../../helpers/axios";

export const getAllCategory = () => {
	return async dispatch => {
		dispatch({ type: categoryConstants.GET_CATEGORY_REQUEST });
		const res = await axios.get("/category/getcategories");
		if (res.status === 200) {
			const { categoryList } = res.data;
			dispatch({
				type: categoryConstants.GET_CATEGORY_SUCCESS,
				payload: {
					categories: categoryList,
				},
			});
		} else {
			dispatch({
				type: categoryConstants.GET_CATEGORY_FAILURE,
				payload: {
					error: res.data.error,
				},
			});
		}
	};
};

export const createCategory = form => {
	return async dispatch => {
		dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST });
		const res = await axios.post("/category/create", form);
		if (res.status === 201) {
			dispatch({
				type: categoryConstants.CREATE_CATEGORY_SUCCESS,
				payload: { category: res.data.result },
			});
		} else {
			dispatch({
				type: categoryConstants.CREATE_CATEGORY_FAILURE,
				payload: {
					error: res.data.error,
				},
			});
		}
	};
};

export const updateCategories = form => {
	return async dispatch => {
		dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
		const res = await axios.post("/category/update", form);
		if (res.status === 201) {
			dispatch(getAllCategory());
			dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS });
		} else {
			dispatch({
				type: categoryConstants.UPDATE_CATEGORY_FAILURE,
				payload: { error: res.data.error },
			});
		}
	};
};

export const deleteCategories = ids => {
	return async dispatch => {
		dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
		const res = await axios.post("/category/delete", {
			payload: {
				ids,
			},
		});
		if (res.status === 201) {
			dispatch(getAllCategory());
			dispatch({ type: categoryConstants.DELETE_CATEGORY_SUCCESS });
		} else {
			dispatch({
				type: categoryConstants.DELETE_CATEGORY_FAILURE,
				payload: { error: res.data.error },
			});
		}
	};
};
