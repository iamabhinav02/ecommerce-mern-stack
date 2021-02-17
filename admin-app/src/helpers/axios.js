import axios from "axios";
import store from "../store";
import { authConstants } from "../store/actions/constants";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		Authorization: token ? `Bearer ${token}` : "",
	},
});

axiosInstance.interceptors.request.use(req => {
	const { auth } = store.getState();
	if (auth.token) {
		req.headers.Authorization = `Bearer ${auth.token}`;
	}
	return req;
});

axiosInstance.interceptors.response.use(
	res => {
		return res;
	},
	error => {
		if (error.response.status === 500) {
			localStorage.clear();
			store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
