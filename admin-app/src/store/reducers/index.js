import authReducer from "./auth.reducers";
import { combineReducers } from "redux";

const Reducer = combineReducers({
	auth: authReducer,
});

export default Reducer;
