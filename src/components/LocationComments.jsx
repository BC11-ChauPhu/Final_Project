import React, { useEffect, useState } from "react";
import { http } from "../service/config";
import { FaStar } from "react-icons/fa";
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

	const fetchData = async () => {
		try {
			const res = await http.get(
				`/api/binh-luan/lay-binh-luan-theo-phong/${localeId}`,
			);
			setComment(res.data.content);
		} catch (err) {
			console.log(err);
		}
	};

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
	}, [comment]);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchData();
	}, [reloadComments]);

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
														<span key={index}>
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
											></div>
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
								className="px-6 py-3 border border-black rounded-lg hover:bg-gray-100 transition-all duration-300"
								onClick={() => openCommentModal()}
							>
								Show all {comment.length} reviews
							</button>
						</div>
					)}
					{/* COMMENT MODAl */}
					<div
						className={`fixed top-0 left-0 flex h-dvh w-full ${commentModal ? "open" : "close"}`}
						id="commentModal"
						onClick={() => closeCommentModal()}
					>
						<div onClick={(e) => e.stopPropagation()}>
							<div>Comments</div>
						</div>
					</div>
				</>
			) : (
				<div className="px-6 pt-6">
					<h1 className="text-lg font-bold">Comments</h1>
					<p>There are no comments</p>
				</div>
			)}
		</>
	);
};

export default LocationComments;
