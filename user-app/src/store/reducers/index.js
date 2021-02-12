import { combineReducers } from "redux";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";

const Reducer = combineReducers({
	category: categoryReducer,
	product: productReducer,
});

export default Reducer;
