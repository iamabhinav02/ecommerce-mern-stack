import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../store/actions";
import "./style.css";

const MenuHeader = () => {
	const category = useSelector(state => state.category);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCategory());
	}, []);

	const renderCategories = categories => {
		let categoryList = [];
		for (let category of categories) {
			categoryList.push(
				<li key={category._id}>
					{category.parentId ? (
						<a href={category.slug}>{category.name}</a>
					) : (
						<span style={{ display: "flex" }}>
							{category.name}{" "}
							<span
								style={{
									fontWeight: "640",
									fontSize: "18px",
									paddingLeft: "4px",
								}}
							>
								&#9662;
							</span>
						</span>
					)}
					{category.children && (
						<ul>{renderCategories(category.children)}</ul>
					)}
				</li>
			);
		}
		return categoryList;
	};

	return (
		<div className="menuheader">
			<ul>
				{category.categories && renderCategories(category.categories)}
			</ul>
		</div>
	);
};

export default MenuHeader;
