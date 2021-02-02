import { authConstants } from "../actions/constants";

const initialState = {
	token: null,
	user: {
		firstName: "",
		lastName: "",
		email: "",
	},
	authenticate: false,
	authenticating: false,
	loading: false,
	error: null,
	message: "",
};

const authReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			state = { ...state, ...action.payload, authenticating: true };
			break;
		case authConstants.LOGIN_SUCCESS:
			state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
			};
			break;
		case authConstants.LOGIN_FAILURE:
			state = {
				...initialState,
				error: action.payload.error,
			};
			break;
		case authConstants.LOGOUT_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case authConstants.LOGOUT_SUCCESS:
			state = {
				...initialState,
			};
			break;
		case authConstants.LOGOUT_FAILURE:
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

export default authReducer;
