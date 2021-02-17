import { categoryConstants } from "../actions/constants";

const initialState = {
	categories: [],
	loading: false,
	error: null,
};

const buildNewCategories = (parentId, categories, category) => {
	let myCategories = [];
	if (parentId == undefined) {
		return [
			...categories,
			{
				_id: category._id,
				name: category.name,
				slug: category.slug,
				type: category.type,
				children: [],
			},
		];
	}
	for (let cat of categories) {
		if (cat._id == parentId) {
			const newCategory = {
				_id: category._id,
				name: category.name,
				slug: category.slug,
				parentId: category.parentId,
				type: category.type,
				children: [],
			};
			myCategories.push({
				...cat,
				children:
					cat.children.length > 0
						? [...cat.children, newCategory]
						: [newCategory],
			});
		} else {
			myCategories.push({
				...cat,
				children: cat.children
					? buildNewCategories(parentId, cat.children, category)
					: [],
			});
		}
	}
	return myCategories;
};

export default (state = initialState, action) => {
	switch (action.type) {
		case categoryConstants.GET_CATEGORY_SUCCESS:
			state = {
				...state,
				categories: action.payload.categories,
			};
			break;
		case categoryConstants.CREATE_CATEGORY_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case categoryConstants.CREATE_CATEGORY_SUCCESS:
			const updatedCategory = buildNewCategories(
				action.payload.category.parentId,
				state.categories,
				action.payload.category
			);
			state = {
				...state,
				categories: updatedCategory,
				loading: false,
			};
			break;
		case categoryConstants.CREATE_CATEGORY_FAILURE:
			state = {
				...initialState,
			};
			break;
	}
	return state;
};
