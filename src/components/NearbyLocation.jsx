import React, { useState, useEffect } from "react";
import { http } from "../service/config";
import { IoIosStar } from "react-icons/io";
import { PiHeartDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../service/useScrollToTop";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import opencage from "opencage-api-client";
import { useDispatch } from "react-redux";
import { setCoords } from "../features/getLocationForMap/registerMapSlice";
import { isValidImageUrl } from "../utils/isValidImageUrl";

const NearbyLocation = () => {
	useScrollToTop();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [locations, setLocation] = useState([]);

	useEffect(() => {
		http
			.get("/api/vi-tri")
			.then((res) => {
				setLocation(res.data.content);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const getCoordinates = async (locationName) => {
		try {
			const response = await opencage.geocode({
				key: "0c633698ef6f4e0b8c21767ca08a95c8",
				q: locationName,
			});

			if (response && response.results.length > 0) {
				const { lat, lng } = response.results[0].geometry;
				dispatch(setCoords([lat, lng]));
				return { latitude: lat, longtitude: lng };
			}
		} catch (error) {
			console.error("Geocoding error:", error);
		}
	};

	const handleLocationClick = async (locationName, locationId) => {
		const coords = await getCoordinates(locationName);
		navigate(`/location/selectedLocation/${locationId}`);
	};

	return (
		<section id="nearbyLocation" className="block">
			<div className="mx-auto px-6 md:mt-4 lg:mb-10 xl:px-20">
				<h2 className="mb-3 text-center text-3xl font-bold md:text-left">
					Popular locations
				</h2>
				<div className="grid space-y-6 xs:grid-cols-1 md:grid-cols-2 md:gap-6 md:gap-y-10 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6">
					{locations
						?.filter((item) => {
							return isValidImageUrl(item.hinhAnh);
						})
						.map((item, index) => {
							const handleImageError = (e) => {
								e.target.closest(".locationItem").style.display = "none";
							};
							return (
								<div
									key={`${item.id}`}
									className="locationItem flex flex-col"
									onClick={(e) => {
										const isSwiperButton =
											e.target.closest(".swiper-button-prev") ||
											e.target.closest(".swiper-button-next");
										if (isSwiperButton) return;

										const location = `${item.tenViTri} + ${item.tinhThanh} + ${item.quocGia}`;
										handleLocationClick(location, item.id);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === "") {
											const location = `${item.tenViTri} + ${item.tinhThanh} + ${item.quocGia}`;
											handleLocationClick(location, item.id);
										}
									}}
								>
									<div>
										<Swiper
											navigation={true}
											pagination={true}
											modules={[Pagination, Navigation]}
											className="rounded-2xl"
										>
											<SwiperSlide>
												<div className="relative md:h-80 lg:h-64">
													<div className="h-full">
														<img
															className="block h-full w-full rounded-2xl object-cover"
															src={
																isValidImageUrl(item.hinhAnh)
																	? item.hinhAnh
																	: "../assets/img/Farm.jpg"
															}
															alt=""
															onError={handleImageError}
														/>
													</div>
													<div>
														<div className="absolute right-3 top-3">
															<button type="button">
																<PiHeartDuotone className="block h-6 w-6 text-white hover:scale-110" />
															</button>
														</div>
													</div>
													<div className="absolute left-3 top-3">
														<span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
															Guest favorite
														</span>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="relative md:h-80 lg:h-64">
													<div
														className="h-full"
														onClick={() => {
															handleLocationClick(item.tinhThanh, item.id);
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																handleLocationClick(item.tinhThanh, item.id);
															}
														}}
													>
														<img
															className="block h-full w-full rounded-2xl object-cover"
															src={item.hinhAnh}
															alt=""
														/>
													</div>
													<div>
														<div className="absolute right-3 top-3">
															<button type="button">
																<PiHeartDuotone className="block h-6 w-6 text-white" />
															</button>
														</div>
													</div>
													<div className="absolute left-3 top-3">
														<span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
															Guest favorite
														</span>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="relative md:h-80 lg:h-64">
													<div
														className="h-full"
														onClick={() => {
															handleLocationClick(item.tinhThanh, item.id);
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																handleLocationClick(item.tinhThanh, item.id);
															}
														}}
													>
														<img
															className="block h-full w-full rounded-2xl object-cover"
															src={item.hinhAnh}
															alt=""
														/>
													</div>
													<div>
														<div className="absolute right-3 top-3">
															<button type="button">
																<PiHeartDuotone className="block h-6 w-6 text-white" />
															</button>
														</div>
													</div>
													<div className="absolute left-3 top-3">
														<span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
															Guest favorite
														</span>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="relative md:h-80 lg:h-64">
													<div
														className="h-full"
														onClick={() => {
															handleLocationClick(item.tinhThanh, item.id);
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																handleLocationClick(item.tinhThanh, item.id);
															}
														}}
													>
														<img
															className="block h-full w-full rounded-2xl object-cover"
															src={item.hinhAnh}
															alt=""
														/>
													</div>
													<div>
														<div className="absolute right-3 top-3">
															<button type="button">
																<PiHeartDuotone className="block h-6 w-6 text-white" />
															</button>
														</div>
													</div>
													<div className="absolute left-3 top-3">
														<span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
															Guest favorite
														</span>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="relative md:h-80 lg:h-64">
													<div
														className="h-full"
														onClick={() => {
															handleLocationClick(item.tinhThanh, item.id);
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																handleLocationClick(item.tinhThanh, item.id);
															}
														}}
													>
														<img
															className="block h-full w-full rounded-2xl object-cover"
															src={item.hinhAnh}
															alt=""
														/>
													</div>
													<div>
														<div className="absolute right-3 top-3">
															<button type="button">
																<PiHeartDuotone className="block h-6 w-6 text-white" />
															</button>
														</div>
													</div>
													<div className="absolute left-3 top-3">
														<span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
															Guest favorite
														</span>
													</div>
												</div>
											</SwiperSlide>
										</Swiper>
									</div>
									<div className="mt-2 grid grid-cols-[87%_13%] items-start text-left text-sm">
										<div>
											<p className="font-semibold">
												{item.tenViTri}, {item.tinhThanh}, {item.quocGia}
											</p>
											<p className="mt text-gray-600">152 km away</p>
											<p className="text-gray-600">Dec.1-6</p>
										</div>
										<div>
											<span className="flex items-baseline justify-between">
												<span>
													<IoIosStar className="mr-1 block h-3 w-3" />
												</span>
												<span>4.5</span>
											</span>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</section>
	);
};

export default NearbyLocation;
