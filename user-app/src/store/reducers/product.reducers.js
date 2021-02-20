import { productConstants } from "../actions/constants";

const initialState = {
	loading: false,
	products: [],
	productsByPrice: {
		under5k: [],
		under10k: [],
		under15k: [],
		under20k: [],
	},
	pageReq: false,
	error: null,
	page: {},
};

export default (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case productConstants.GET_PRODUCTS_BY_SLUG_REQUEST:
			state = {
				...initialState,
				loading: true,
			};
			break;
		case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
			state = {
				...state,
				loading: false,
				products: action.payload.products,
				productsByPrice: {
					...action.payload.productsByPrice,
				},
			};
			break;
		case productConstants.GET_PRODUCTS_BY_SLUG_FAILURE:
			state = {
				...initialState,
			};
			break;
		case productConstants.GET_PRODUCT_PAGE_REQUEST:
			state = {
				...initialState,
				pageReq: true,
			};
			break;
		case productConstants.GET_PRODUCT_PAGE_SUCCESS:
			state = {
				...state,
				pageReq: false,
				page: action.payload.page,
			};
			break;
		case productConstants.GET_PRODUCT_PAGE_FAILURE:
			state = {
				...initialState,
				error: action.payload.error,
			};
			break;
	}
	return state;
};
