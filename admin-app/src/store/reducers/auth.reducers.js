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
};

const authReducer = (state = initialState, action) => {
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
				...state,
				...action.payload,
				authenticate: false,
				authenticating: false,
			};
			break;
		default:
			return state;
	}
	return state;
};

export default authReducer;
