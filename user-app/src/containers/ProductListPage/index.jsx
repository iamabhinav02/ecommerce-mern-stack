import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../store/actions";
import Layout from "../../components/Layout";
import "./style.css";

const ProductListPage = props => {
	const dispatch = useDispatch();
	const product = useSelector(state => state.product);
	const priceRange = {
		under5k: 5000,
		under10k: 10000,
		under15k: 15000,
		under20k: 20000,
	};

	useEffect(() => {
		dispatch(getProductsBySlug(props.match.params.slug));
	}, []);

	return (
		<Layout>
			{Object.keys(product.productsByPrice).map((key, index) => {
				return (
					<div className="card" key={index + 1}>
						<div className="cardHeader">
							<div>
								{props.match.params.slug} Mobile under{" "}
								{priceRange[key]}
							</div>
							<button>View all</button>
						</div>
						<div style={{ display: "flex" }}>
							{product.productsByPrice[key].map(product => {
								return (
									<div
										className="productContainer"
										key={product._id}
									>
										<div className="productImgContainer">
											<img
												src={`http://localhost:3000/public/${product.pictures[0].img}`}
												alt={product.name}
											/>
										</div>
										<div className="productInfo">
											<div style={{ margin: "5px 0" }}>
												{product.name}
											</div>
											{/* <div>
                                                <span>4.3</span>&nbsp;
                                                <span>3376</span>
                                            </div> */}
											<div className="productPrice">
												{product.price}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</Layout>
	);
};

export default ProductListPage;
