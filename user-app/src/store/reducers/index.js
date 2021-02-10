import { combineReducers } from "redux";
import categoryReducer from "./category.reducers";

const Reducer = combineReducers({
	category: categoryReducer,
});

export default Reducer;
