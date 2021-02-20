import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../store/actions";
import getParamsObj from "../../../utils/getParamsObj";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "../../../components/UI/Card";

const ProductPage = props => {
	const dispatch = useDispatch();
	const product = useSelector(state => state.product);
	const { page } = product;

	useEffect(() => {
		const params = getParamsObj(props.location.search);
		dispatch(getProductPage(params));
	}, []);
	return (
		<div style={{ margin: "0 10px" }}>
			<h3>{page.title}</h3>
			<Carousel renderThumbs={() => {}}>
				{page.banners &&
					page.banners.map((banner, index) => {
						return (
							<a
								key={banner._id}
								href={banner.navigateTo}
								style={{ display: "block" }}
							>
								<img
									src={banner.img}
									alt={`Banner number ${index + 1}`}
								/>
							</a>
						);
					})}
			</Carousel>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
				}}
			>
				{page.products &&
					page.products.map((product, index) => {
						return (
							<Card
								key={product._id}
								style={{
									width: "400px",
									height: "200px",
									margin: "5px",
								}}
							>
								<img
									src={product.img}
									alt={`Product number ${index + 1}`}
									style={{ width: "100%", height: "100%" }}
								/>
							</Card>
						);
					})}
			</div>
		</div>
	);
};

export default ProductPage;
