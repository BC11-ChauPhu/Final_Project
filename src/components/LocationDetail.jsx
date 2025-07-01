import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../service/config.js";
import { TbAirConditioning, TbIroning3 } from "react-icons/tb";
import {
	FaBed,
	FaKitchenSet,
	FaPersonSwimming,
	FaSquareParking,
	FaWifi,
} from "react-icons/fa6";
import { GiWashingMachine } from "react-icons/gi";
import { PiTelevision } from "react-icons/pi";
import LocationComments from "./LocationComments.jsx";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useAuth } from "../service/AuthContext.jsx";
import UserComment from "./UserComment.jsx";
import { toast } from "react-toastify";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import Calendar from "./Calendar.jsx";
import { useSelector } from "react-redux";
import { BsDoorOpen } from "react-icons/bs";
import { BsHouseHeart } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const LocationDetail = () => {
	const { id } = useParams();
	const [room, setRoom] = useState([]);
	const dateRange = useSelector((state) => state.dateSelection.date);
	const startDate = useState(new Date());
	const endDate = useState(new Date());
	const [guests, setGuests] = useState(0);
	const generateRandomId = () => Math.floor(Math.random() * 10000);
	const userData = JSON.parse(localStorage.getItem("user"));
	const [reloadComments, setReloadComments] = useState(false);
	const { isAuthenciated } = useAuth();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [calendar, setCalendar] = useState(false);
	const averageRating = useSelector((state) => state.averageRating.rating);
	const reviews = useSelector((state) => state.averageRating.reviews);
	const roomReservationDate = useSelector((state) => state.dateSelection.date);

	const triggerReloadComments = () => {
		setReloadComments(!reloadComments);
	};

	const handleReserve = () => {
		const reservation = async () => {
			try {
				const res = await http.post("/api/dat-phong", {
					id: generateRandomId,
					maPhong: room.id,
					ngayDen: startDate,
					ngayDi: endDate,
					soLuongKhach: guests,
					maNguoiDung: userData.id,
				});
				toast.success("Reservation successful", {
					autoClose: 2000,
					position: "top-center",
				});
			} catch (err) {
				console.log(err);
			}
		};
		if (!isAuthenciated) {
			toast.error("You must be logged in to use this future", {
				autoClose: 2000,
				position: "top-center",
			});
		} else if (guests > 0) {
			reservation();
		} else {
			toast.error("There must at least 1 guest", {
				autoClose: 2000,
				position: "top-center",
			});
		}
	};

	const decreaseGuests = () => {
		if (guests > 0) {
			setGuests(guests - 1);
		}
	};

	const increaseGuests = () => {
		setGuests(guests + 1);
	};

	const handleDateSelection = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const formatDateToMonthDay = (dateString) => {
		const date = new Date(dateString);
		return date
			.toLocaleString("en-us", {
				month: "long",
				day: "2-digit",
			})
			.replace(" ", ".");
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await http.get(`/api/phong-thue/${id}`);
				setRoom(res.data.content);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [id]);

	return (
		<section className="relative lg:mx-auto">
			{/* IMAGE */}
			<div className="flex flex-col md:flex-col-reverse md:pb-8 md:pt-14 lg:mx-auto lg:w-[1024px] xl:w-[1280px]">
				<div className="h-72 md:h-80 md:px-6 lg:h-[489px]">
					<img
						src={room.hinhAnh}
						alt=""
						className="h-full w-full object-cover md:rounded-lg"
					/>
				</div>
				<div className="flex items-center justify-between p-6 pb-3 md:pb-6 md:pt-14">
					<h1 className="text-2xl font-semibold">{room.tenPhong}</h1>
					<div className="hidden gap-4 md:flex">
						<span className="flex items-center rounded-lg p-2 transition-all duration-300 hover:bg-gray-200">
							<span className="mr-2">
								<FaRegShareFromSquare />
							</span>
							<span className="underline">Share</span>
						</span>
						<span className="flex items-center rounded-lg p-2 transition-all duration-200 hover:bg-gray-200">
							<span className="mr-2">
								<FaRegHeart />
							</span>
							<span className="underline">Save</span>
						</span>
					</div>
				</div>
			</div>
			{/* CONTENT */}
			<div className="relative flex flex-col space-y-4  px-6 text-sm md:flex-row md:space-y-0 md:text-base lg:mx-auto lg:w-[1024px] xl:w-[1280px] ">
				{/* LEFT CONTENT */}
				<div className="flex flex-col md:w-[65%] z-0 relative ">
					{/* ROOMS NUMBER */}
					<div className="flex flex-col pb-6">
						<div>
							<h2 className="text-base font-medium">Entire rental unit</h2>
							<p className="flex items-center text-sm text-gray-800">
								<span>{room.khach} guests </span>
								<span className="mx-1"> · </span>
								<span>{room.phongNgu} bedrooms </span>
								<span className="mx-1"> · </span>
								<span>{room.phongTam} bathrooms</span>
							</p>
							<p className="flex items-center gap-1 font-semibold  justify-start">
								<span className="flex gap-1 items-center">
									<FaStar className="h-4 w-4 text-brand" />{" "}
									{averageRating.toFixed(1)}
								</span>
								<span>·</span>
								<span className="underline">{reviews} reviews</span>
							</p>
						</div>
					</div>
					{/* ATTRIBUTES */}
					<div className="border-b border-t border-b-gray-300 border-t-gray-300">
						<div className="flex gap-4 py-6">
							<div>
								<FaUserCircle className="h-10 w-10" />
							</div>
							<div>
								<p className="text-base font-semibold">Hosted by user</p>
								<p className="font-light">5 years hosting</p>
							</div>
						</div>
						<div className="grid gap-6 border-t border-t-gray-300 py-6">
							<div className="flex items-center gap-4">
								<div>
									<BsDoorOpen className="h-6 w-6" />
								</div>
								<div>
									<p className="font-medium">Self check-in</p>
									<p className="font-extralight">
										Check yourself in with the keypad.
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div>
									<BsHouseHeart className="h-6 w-6" />
								</div>
								<div>
									<p className="font-medium">Extra spacious</p>
									<p className="font-extralight">
										Guests love this home's spaciousness for a comfortable stay.
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div>
									<IoLocationOutline className="h-6 w-6" />
								</div>
								<div>
									<p className="font-medium">Beautiful and walkable</p>
									<p className="font-extralight">
										Guests say this area is scenic and it's easy to get around.
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* ABOUT */}
					<div className="flex flex-col py-6">
						<p className="text-xl font-medium">About this place</p>
						<div>
							<p className="text-base text-gray-800">{room.moTa}</p>
						</div>
					</div>
					{/* ANEMITIES */}
					<div className="flex flex-col border-t border-t-gray-300 pt-6">
						<h2 className="text-xl font-semibold">Anemities</h2>
						<div className="flex flex-col">
							{room.banLa && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<TbIroning3 className="mr-4 h-6 w-6" /> Ironing
									</div>
								</div>
							)}
							{room.bep && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<FaKitchenSet className="mr-4 h-6 w-6" /> Kitchen
									</div>
								</div>
							)}
							{room.dieuHoa && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<TbAirConditioning className="mr-4 h-6 w-6" /> Air
										conditioning
									</div>
								</div>
							)}
							{room.doXe && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<FaSquareParking className="mr-4 h-6 w-6" /> Parking
									</div>
								</div>
							)}
							{room.hoBoi && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<FaPersonSwimming className="mr-4 h-6 w-6" /> Swimming pool
									</div>
								</div>
							)}
							{room.mayGiat && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<GiWashingMachine className="mr-4 h-6 w-6" />
										Washing machine
									</div>
								</div>
							)}
							{room.tivi && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<PiTelevision className="mr-4 h-6 w-6" />
										Television
									</div>
								</div>
							)}
							{room.wifi && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<FaWifi className="mr-4 h-6 w-6" />
										Wifi
									</div>
								</div>
							)}
							{room.giuong && (
								<div className="border-b border-b-gray-300 py-6 text-base">
									<div className="flex items-center">
										<FaBed className="mr-4 h-6 w-6" />
										{room.bed} Beds
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				{/* RIGHT CONTENT */}
				<div className="relative hidden md:ml-[8.5%] md:block md:w-[35%] ">
					<div className="sticky top-28 flex flex-col rounded-xl border border-gray-300 p-6 shadow-lg">
						<div className="mb-6">
							<p>
								<span className="text-2xl font-semibold">${room.giaTien}</span>{" "}
								night
							</p>
						</div>
						{/* CHECK IN/OUT  */}
						<div>
							<button
								type="button"
								className="flex text-left text-[0.625rem]"
								onClick={() => setCalendar((prev) => !prev)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										setCalendar((prev) => !prev);
									}
								}}
							>
								<div className="w-1/2">
									<div className="w-full">
										<div className="flex flex-col rounded-tl-xl border border-gray-400 px-2 py-2 text-left">
											<span className="font-bold">CHECK-IN</span>
											<span className="overflow-ellipsis whitespace-nowrap text-base text-[0.875rem] ">
												{roomReservationDate
													? `${roomReservationDate.start}`
													: "Add date"}
											</span>
										</div>
									</div>
								</div>
								<div className="w-1/2">
									<button type="button" className="w-full">
										<div className="flex flex-col rounded-tr-xl border border-gray-400 border-l-transparent px-2 py-2 text-left">
											<span className="font-bold">CHECK-OUT</span>
											<span className="overflow-ellipsis whitespace-nowrap text-base">
												{roomReservationDate
													? `${roomReservationDate.end}`
													: "Add date"}
											</span>
										</div>
									</button>
								</div>
							</button>
							{/* DATE PICKER */}
							{calendar && (
								<div className="max-h-[400px] h-[400px] absolute w-[900px] right-4 z-50">
									<Calendar />
								</div>
							)}
						</div>
						{/* GUEST SELECTOR */}
						<div className="relative rounded-bl-xl rounded-br-xl border border-gray-400 border-t-transparent px-2 py-2 text-left text-[0.625rem]">
							<div className="font-bold">GUESTS</div>
							<div className="flex items-center justify-between">
								<span className="text-base">{guests} guests</span>
								<div className="flex gap-2 text-2xl">
									<p
										onClick={() => {
											decreaseGuests();
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") decreaseGuests();
										}}
									>
										<CiCircleMinus />
									</p>
									<p
										onClick={() => {
											increaseGuests();
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") increaseGuests();
										}}
									>
										<CiCirclePlus />
									</p>
								</div>
							</div>
						</div>
						{/* RESERVE BUTTON */}
						<div className="mt-6 flex justify-center">
							<div className="w-full">
								<button
									type="button"
									className="w-full rounded-xl bg-brand px-6 py-3 font-semibold text-white"
									onClick={() => {
										handleReserve();
									}}
								>
									Reserve
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* COMMENT */}
			<div>
				{room && (
					<LocationComments localeId={id} reloadComments={reloadComments} />
				)}
			</div>
			{/* USER COMMENT */}
			<div>
				{isAuthenciated && (
					<UserComment
						userData={userData}
						roomData={room}
						localeId={id}
						onCommentAdded={triggerReloadComments}
					/>
				)}
			</div>
			{/* STICKY RESERVE BOTTOM */}
			<div className="fixed bottom-0 min-h-20 w-full border-t border-t-gray-300 bg-white md:hidden">
				<div className="h-full w-full items-center px-4">
					<div>
						<div className="py-4">
							<div className="flex items-center justify-between gap-3">
								<div className="flex w-2/3 font-semibold">
									<div className="w-full">
										<div className="flex justify-between">
											<p className="underline">
												<span>${room.giaTien}</span>
												<span className="font-normal"> /night</span>
											</p>
										</div>
										<button
											type="button"
											onClick={handleDateSelection}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ")
													handleDateSelection();
											}}
										>
											{dateRange
												? `${formatDateToMonthDay(dateRange.start)} - ${formatDateToMonthDay(dateRange.end)}`
												: "Select a date"}
										</button>
										<div>
											<div className="flex items-center gap-1">
												<CiCircleMinus
													onClick={() => {
														decreaseGuests();
													}}
												/>{" "}
												{guests} Guests{" "}
												<CiCirclePlus
													onClick={() => {
														increaseGuests();
													}}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="w-1/3">
									<button
										type="button"
										className="rounded-lg bg-brand px-4 py-[14px] text-center font-semibold text-white"
										onClick={() => {
											handleReserve();
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === "") {
												handleReserve();
											}
										}}
									>
										<span>Reserve</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button
				type="button"
				id="calendarModal"
				className={`fixed w-full top-0 h-dvh items-center overflow-auto bg-black/50 transition-all duration-500 ${isModalOpen ? "open" : "close"}`}
				onClick={closeModal}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						closeModal();
					}
				}}
			>
				<button
					type="button"
					className="calendarModalContent"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.stopPropagation();
						}
					}}
				>
					<Calendar />
				</button>
			</button>
		</section>
	);
};
export default LocationDetail;
