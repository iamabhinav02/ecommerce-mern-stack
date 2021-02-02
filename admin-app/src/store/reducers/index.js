import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";

const Reducer = combineReducers({
	auth: authReducer,
	user: userReducer,
});

export default Reducer;
