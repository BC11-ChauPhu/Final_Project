import React, { useState } from "react";
import { http } from "../service/config";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const UserComment = ({ userData, roomData, onCommentAdded }) => {
	const [comment, setComment] = useState("");
	const generateRandomId = () => Math.floor(Math.random() * 10000);
	const token = localStorage.getItem("authToken");
	const currentDate = new Date();
	const [commentRating, setCommentRating] = useState(0);

	const handleComment = (event) => {
		event.preventDefault();

		const addComment = async () => {
			try {
				const res = await http.post(
					"/api/binh-luan",
					{
						id: generateRandomId,
						maPhong: roomData.id,
						maNguoiBinhLuan: userData.id,
						ngayBinhLuan: currentDate,
						noiDung: comment,
						saoBinhLuan: commentRating,
					},
					{
						headers: {
							token: token,
						},
					},
				);
				setComment("");
				onCommentAdded();
			} catch (err) {
				console.log(err);
			}
		};
		if (!comment.trim()) {
			const errorMessage = "Comment cannot be empty";
			toast.error(errorMessage, {
				autoClose: 2000,
				position: "top-center",
			});
		} else {
			addComment();
		}
	};

	return (
		<div
			className="py-6 gap-4 px-6 md:px-0 md:grid w-full mx-auto lg:w-[1024px] xl:w-[1240px] border-t border-t-gray-300"
			id="userComment"
		>
			{/* AVATAR */}
			<div className="flex items-center gap-4">
				<div className="hidden h-12 rounded-full md:block w-12">
					{userData.avatar ? (
						<img
							src={userData.avatar ? userData.avatar : FaUserCircle}
							alt=""
							className="object-cover"
						/>
					) : (
						<FaUserCircle className="h-12 w-12" />
					)}
				</div>
				<div className="font-bold">{userData.name}</div>
			</div>
			<div>
				<ul id="userRating">
					<li
						onClick={() => setCommentRating(1)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === "") setCommentRating(1);
						}}
					>
						<FaStar />
					</li>
					<li
						onClick={() => setCommentRating(2)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === "") setCommentRating(2);
						}}
					>
						<FaStar />
					</li>
					<li
						onClick={() => setCommentRating(3)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === "") setCommentRating(3);
						}}
					>
						<FaStar />
					</li>
					<li
						onClick={() => setCommentRating(4)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === "") setCommentRating(4);
						}}
					>
						<FaStar />
					</li>
					<li
						onClick={() => setCommentRating(5)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === "") setCommentRating(5);
						}}
					>
						<FaStar />
					</li>
				</ul>
			</div>

			{/* FORM */}
			<div>
				<form onSubmit={handleComment}>
					<textarea
						className="w-full border border-gray-400 p-2 rounded-lg  focus:outline-gray-600 transition-all duration-300"
						placeholder="Add your comment..."
						name="comment"
						id="userComment"
						rows="4"
						cols="120"
						value={comment}
						onChange={(e) => {
							setComment(e.target.value);
						}}
					/>
					<button
						className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
						type="submit"
					>
						Add comment
					</button>
				</form>
			</div>
		</div>
	);
};

export default UserComment;
