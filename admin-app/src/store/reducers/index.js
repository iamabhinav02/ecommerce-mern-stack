import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import productReducer from "./product.reducers";
import categoryReducer from "./category.reducers";
import orderReducer from "./order.reducers";

const Reducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	order: orderReducer,
	category: categoryReducer,
	product: productReducer,
});

export default Reducer;
