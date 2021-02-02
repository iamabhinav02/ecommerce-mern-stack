import { userConstants } from "../actions/constants";

const initialState = {
	error: null,
	message: "",
	loading: false,
};

const userReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case userConstants.USER_REGISTER_REQUEST:
			state = { ...state, loading: true };
			break;
		case userConstants.USER_REGISTER_SUCCESS:
			state = {
				...state,
				message: action.payload.message,
				loading: false,
			};
			break;
		case userConstants.USER_REGISTER_FAILURE:
			state = {
				...state,
				loading: false,
				error: action.payload.error,
			};
			break;
		default:
			return state;
	}
	return state;
};

export default userReducer;
