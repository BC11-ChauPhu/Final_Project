import React, { useCallback, useEffect, useState } from "react";
import { http } from "../service/config";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import defaultUser from "../assets/img/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
	setAverageRating,
	setReviews,
} from "../features/averageRating/averageRatingSlice";

const LocationComments = ({ localeId, reloadComments }) => {
	const [comment, setComment] = useState([]);
	const [visibleComments, setVisibleComments] = useState(6);
	const [commentModal, setCommentModal] = useState(false);
	const dispatch = useDispatch();
	const aRatings = useSelector((state) => state.averageRating.rating);
	const reviews = useSelector((state) => state.averageRating.reviews);

	const fetchData = useCallback(async () => {
		try {
			const res = await http.get(
				`/api/binh-luan/lay-binh-luan-theo-phong/${localeId}`,
			);
			setComment(res.data.content);
		} catch (err) {
			console.error(err);
		}
	}, [localeId]);

	useEffect(() => {
		/* console.log("This hook was used!"); */
		fetchData();
		if (reloadComments) {
			fetchData();
		}
	}, [fetchData, reloadComments]);

	const formatDateToMonthDay = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString("en-us", {
			month: "long",
			day: "2-digit",
		});
	};

	const openCommentModal = () => {
		setCommentModal(true);
	};

	const closeCommentModal = () => {
		setCommentModal(false);
	};

	useEffect(() => {
		if (comment.length > 0) {
			const validComments = comment.filter(
				(item) => typeof item.saoBinhLuan === "number",
			);

			if (validComments.length > 0) {
				const total = validComments.reduce(
					(sum, item) => sum + item.saoBinhLuan,
					0,
				);
				const averageRating = total / validComments.length;
				dispatch(setAverageRating(averageRating));
				dispatch(setReviews(validComments.length));
			}
		}
	}, [comment, dispatch]);

	return (
		<>
			{comment.length > 0 ? (
				<>
					<div className="mt-6 px-6 text-center text-2xl font-semibold xl:w-[1280px] xl:mx-auto relative">
						<p className="flex items-center gap-1 font-semibold  justify-start">
							<span className="flex gap-1 items-center">
								<FaStar className="h-4 w-4 text-brand" /> {aRatings.toFixed(1)}
							</span>
							<span>·</span>
							<span className="">{reviews} reviews</span>
						</p>
					</div>
					<div className="no-scrollbar mx-auto flex overflow-y-hidden overflow-x-scroll px-6 md:grid md:gap-10 md:text-base lg:w-[1280px] lg:grid-cols-2 md:mt-6">
						{comment?.slice(0, 6).map((item) => (
							<div className="mx-2 min-w-64 md:m-0" key={item.id}>
								<div className="my-6 flex h-60 flex-col justify-between rounded-xl border border-gray-300 p-5 shadow-xl md:m-0 md:h-full md:flex-col-reverse md:gap-2 md:border-transparent md:p-0 md:shadow-none">
									{/* COMMENT-TEXT */}
									<div>
										<div className="flex items-center md:text-sm">
											<div className="flex">
												{Array.from(
													{ length: item.saoBinhLuan },
													(_, index) => (
														<span key={`${item.id} - ${index}`}>
															<FaStar className="h-[14px] w-[14px] text-brand" />
														</span>
													),
												)}
											</div>
											<div className="px-2"> · </div>
											<div>{formatDateToMonthDay(item.ngayBinhLuan)}</div>
										</div>
										<div>
											{item.noiDung.length < 50 && (
												<p>
													{item.noiDung
														? item.noiDung
														: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, natus."}
												</p>
											)}
										</div>
									</div>
									{/* AVATAR */}
									<div>
										<div className="flex items-center gap-4">
											<div
												className="h-12 min-w-12 rounded-full border border-gray-500 bg-cover bg-center bg-no-repeat"
												style={{
													backgroundImage: `url(${item.avatar ? item.avatar : defaultUser})`,
												}}
											/>
											<div>
												<p className="text-sm font-semibold capitalize">
													{item.tenNguoiBinhLuan}
												</p>
												<p className="text-sm">4 months on Airbnb</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					{comment?.length > visibleComments && (
						<div className="xl:w-[1280px] xl:mx-auto px-6 mt-6 font-semibold">
							<button
								type="button"
								className="px-6 py-3 border border-black rounded-lg hover:bg-gray-100 transition-all duration-300"
								onClick={() => openCommentModal()}
							>
								Show all {comment.length} reviews
							</button>
						</div>
					)}
					{/* COMMENT MODAl */}
					<div
						className={`fixed md:justify-center items-center top-0 left-0 flex h-full w-full ${commentModal ? "open" : "close"} bg-black/50 md:p-10`}
						id="commentModal"
						onClick={() => closeCommentModal()}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") closeCommentModal();
						}}
					>
						<div
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") closeCommentModal();
							}}
							className="bg-white h-full gap-0 md:rounded-xl flex flex-col overflow-y-hidden"
						>
							{/* CLOSE BUTTON */}
							<button
								type="button"
								className="flex closeButton pl-6 md:px-6 lg:px-10 relative hover:cursor-pointer"
								onClick={() => setCommentModal(false)}
							>
								<div className="absolute left-6 top-4 lg:top-10 lg:left-10">
									<IoMdClose className="h-4 w-4 lg:h-6 lg:w-6" />
								</div>
							</button>
							{/* MODALS CONTENT */}
							<div className="  md:px-6 lg:px-10 overflow-y-auto">
								<div className="border border-b-gray-300 border-t-transparent border-l-transparent border-r-transparent md:pb-4">
									<p className="flex items-center gap-1 font-semibold  justify-start text-2xl pr-8 ">
										<span className="flex gap-1 items-center">
											<FaStar className="h-4 w-4 text-brand" />{" "}
											{aRatings.toFixed(1)}
										</span>
										<span>·</span>
										<span className="">{reviews} reviews</span>
									</p>
								</div>
								<div className="lg:pb-8 md:pt-4 overflow-y-hidden flex gap-8 ">
									<div className=" grid gap-8 rounded-xl pr-6 overflow-y-auto">
										{comment.map((item, index) => (
											<div className="mx-2 min-w-64 md:m-0" key={item.id}>
												<div className="my-6 flex h-60 flex-col justify-between rounded-xl border border-gray-300 p-5 shadow-xl md:m-0 md:h-full md:flex-col-reverse md:gap-2 md:border-transparent md:p-0 md:shadow-none">
													{/* COMMENT-TEXT */}
													<div>
														<div className="flex items-center md:text-sm">
															<div className="flex">
																{Array.from(
																	{ length: item.saoBinhLuan },
																	(_, index) => (
																		<span key={`${item.id} - ${index}`}>
																			<FaStar className="h-[14px] w-[14px] text-brand" />
																		</span>
																	),
																)}
															</div>
															<div className="px-2"> · </div>
															<div>
																{formatDateToMonthDay(item.ngayBinhLuan)}
															</div>
														</div>
														<div>
															{item.noiDung.length < 50 && (
																<p>
																	{item.noiDung
																		? item.noiDung
																		: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, natus."}
																</p>
															)}
														</div>
													</div>
													{/* AVATAR */}
													<div>
														<div className="flex items-center gap-4">
															<div
																className="h-12 min-w-12 rounded-full border border-gray-500 bg-cover bg-center bg-no-repeat"
																style={{
																	backgroundImage: `url(${item.avatar ? item.avatar : defaultUser})`,
																}}
															/>
															<div>
																<p className="text-sm font-semibold capitalize">
																	{item.tenNguoiBinhLuan}
																</p>
																<p className="text-sm">4 months on Airbnb</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="py-6 pt-6 xl:w-[1240px] m-auto ">
					<h1 className="text-lg font-bold">Comments</h1>
					<p>There are no comments</p>
				</div>
			)}
		</>
	);
};

export default LocationComments;
