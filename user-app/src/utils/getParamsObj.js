export default query => {
	const paramObj = {};
	if (query) {
		const queryString = query.split("?")[1];
		if (queryString) {
			const params = queryString.split("&");
			params.forEach(param => {
				const keyValue = param.split("=");
				paramObj[keyValue[0]] = keyValue[1];
			});
		}
	}
	return paramObj;
};
