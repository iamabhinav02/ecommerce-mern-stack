import { pageConstants } from "../actions/constants";

const initialState = {
	page: {},
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case pageConstants.CREATE_PAGE_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case pageConstants.CREATE_PAGE_SUCCESS:
			state = {
				...state,
				loading: false,
				page: action.payload.page,
			};
			break;
		case pageConstants.CREATE_PAGE_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				loading: false,
			};
			break;
	}
	return state;
};
