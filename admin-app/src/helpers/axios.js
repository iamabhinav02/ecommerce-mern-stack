import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000/api",
	// headers: {
	// 	Authorization: "",
	// },
});

export default axiosInstance;
