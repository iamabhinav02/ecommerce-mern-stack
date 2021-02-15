import { categoryConstants } from "../actions/constants";

const initialState = {
	categories: [],
	loading: false,
	error: null,
};

const buildNewCategory = (categories, category) => {
	let updatedCategoryList = [];
	if (!category.parentId) {
		return [
			...categories,
			{
				_id: category._id,
				name: category.name,
				slug: category.slug,
				children: [],
			},
		];
	}
	for (let cat of categories) {
		if (cat._id === category.parentId) {
			const newCategory = {
				_id: category._id,
				name: category.name,
				slug: category.slug,
				parentId: category.parentId,
				children: category.children,
			};
			updatedCategoryList.push({
				...cat,
				children:
					cat.children.length > 0
						? [...cat.children, newCategory]
						: [newCategory],
			});
		} else {
			updatedCategoryList.push({
				...cat,
				children: cat.children
					? buildNewCategory(cat.children, category)
					: [],
			});
		}
	}
	return updatedCategoryList;
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
			const updatedCategory = buildNewCategory(
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
