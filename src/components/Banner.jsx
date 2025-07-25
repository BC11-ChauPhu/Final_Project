import React, { useCallback, useEffect, useState } from "react";
import { http } from "../service/config";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import SearchResultList from "./SearchResultList";
import SearchResultMedium from "./SearchResultMedium";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../service/useScrollToTop";
import Calendar from "./Calendar";
import GuestSelector from "./GuestSelector";
import { useSelector } from "react-redux";
import opencage from "opencage-api-client";
import { useDispatch } from "react-redux";
import { setCoords } from "../features/getLocationForMap/registerMapSlice";

const Banner = ({ onClickToggle, showPopUpSearch }) => {
	useScrollToTop();
	const [input, setInput] = useState("");
	const [filteredList, setfilteredList] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState();
	const [animated, setAnimated] = useState(false);
	const [calendar, setCalendar] = useState(false);
	const [guestSelector, setGuestSelector] = useState(false);
	const guests = useSelector((state) => state.guestSelection.guests);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [locationName, setLocationName] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const dateRange = useSelector((state) => state.dateSelection.date);

	useEffect(() => {
		if (dateRange) {
			setStartDate(new Date(dateRange.start).toLocaleDateString("en-GB"));
			setEndDate(new Date(dateRange.end).toLocaleDateString("en-GB"));
		}
	}, [dateRange]);

	const fetchData = (value) =>
		http
			.get("/api/vi-tri")
			.then((res) => {
				const result = res.data.content.filter((item) => {
					return (
						value &&
						item &&
						item.tenViTri &&
						item.tenViTri.toLowerCase().includes(value)
					);
				});
				setfilteredList(result);
			})
			.catch((err) => {
				console.log(err);
			});

	const handleShowResults = (value) => {
		setShowResults(value.trim().length > 0);
	};

	const handleLocationSelect = (tenViTri, tinhThanh, quocGia, id) => {
		const locationString = `${tenViTri}, ${tinhThanh}, ${quocGia},`;
		setInput(locationString);
		setSelectedLocation({ tenViTri, tinhThanh, quocGia, id });
		setShowResults(false);
	};

	const handleChange = (value) => {
		setInput(value);
		fetchData(value);
		handleShowResults(value);
	};

	const handleOnClickTransform = () => {
		setAnimated((prev) => !prev);
		setCalendar(false);
	};

	const handleOnClickLocationSearch = () => {
		setCalendar(false);
		setGuestSelector(false);
	};

	const handleShowCalendar = () => {
		setGuestSelector(false);
		setCalendar((prev) => !prev);
	};

	const handleShowGuestSelector = () => {
		setCalendar(false);
		setGuestSelector((prev) => !prev);
	};

	const navigateAfterSearch = () => {
		if (selectedLocation) {
			navigate(`location/selectedLocation/${selectedLocation.id}`);
		}
		if (dateRange && !selectedLocation) {
			navigate("location/selectedLocation/rooms");
		}
	};

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
			console.log(error);
		}
	};

	const handleAfterGetSearchValue = useCallback(
		async (locationName, locationId) => {
			const coords = await getCoordinates(locationName);
		},
	);

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
		if (input.trim() !== "") {
			handleAfterGetSearchValue(input);
		}
	}, [input, handleAfterGetSearchValue]);

	return (
		<>
			{!showPopUpSearch && (
				<section
					id="banner"
					className="block p-6 pb-0 pt-3 border border-b-gray-200"
				>
					<div className="relative max-w-full pb-6 md:mx-auto md:mt-20 md:max-w-7xl ">
						{/* SMALL SEARCHBAR */}
						{!showPopUpSearch && (
							<button
								type="button"
								className="mx-auto h-14 max-w-md rounded-full border border-gray-300 bg-white shadow-xl transition-all duration-500 hover:bg-gray-200 md:hidden w-full"
								id="smallSearchBar"
								onClick={() => onClickToggle(true)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") onClickToggle();
								}}
							>
								<div className="grid h-full">
									<div className="grid grid-cols-8 grid-flow-col md:grid-cols-6 items-center">
										<span className="col-span-1">
											<FaMagnifyingGlass className="mx-auto text-xl" />
										</span>
										<span className="col-span-7 grid justify-start text-left">
											<div className="text-sm  font-semibold">Where to?</div>
											<div className="text-[12px] text-gray-500">
												<span>Anywhere • Any week • Add guests</span>
											</div>
										</span>
									</div>
								</div>
							</button>
						)}
						{/* MEDIUM SEARCHBAR */}
						<div className="relative mx-auto hidden h-[66px] md:block lg:w-[70%]">
							{/* SEARCH FORM */}
							<div className="dropshadow-xl relative flex rounded-full border border-gray-300 shadow-lg">
								<button
									type="button"
									className="w-1/3"
									onClick={() => handleOnClickLocationSearch()}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ")
											handleOnClickLocationSearch();
									}}
								>
									<div className="bannerSeachLocale flex h-full md:w-full">
										<label
											htmlFor=""
											className="rounded-full border-black bg-white px-8 py-4 transition-all duration-500 hover:bg-gray-200 md:w-full"
										>
											<div className="flex w-full flex-col items-center justify-start">
												<div className="w-full text-left text-xs font-semibold">
													Where
												</div>
												<input
													id="mediumSearchBar"
													type="search"
													placeholder="Search destinations"
													className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm outline-none focus-visible:outline-none md:placeholder:h-[18px]"
													value={input}
													onChange={(e) => handleChange(e.target.value)}
												/>
											</div>
										</label>
									</div>
								</button>
								<div className="flex items-center bg-white">
									<div className="h-8 border-r border-r-gray-300" />
								</div>
								<button
									type="button"
									className="flex w-1/3"
									onClick={() => {
										setCalendar((prev) => !prev);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ")
											setCalendar((prev) => !prev);
									}}
								>
									<div className="flex h-full w-full justify-start">
										<div className="w-full rounded-full bg-white px-6 py-4 transition-all duration-500 hover:bg-gray-200 text-left">
											<div className="text-xs font-semibold">Check in</div>
											<div
												className={`${dateRange ? "text-black" : "text-gray-400"} text-sm`}
											>
												{dateRange ? `${startDate} - ${endDate}` : "Add dates"}
											</div>
										</div>
									</div>
								</button>
								<div className="flex items-center bg-white">
									<div className="h-8 border-r border-r-gray-300" />
								</div>
								<div className="flex w-1/3 items-center justify-between rounded-full rounded-br-full rounded-tr-full bg-white hover:bg-gray-200 text-left">
									<div>
										<button
											type="button"
											className="w-full"
											onClick={() => handleShowGuestSelector()}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ")
													handleShowGuestSelector();
											}}
										>
											<div className="px-6 py-4">
												<div className="w-full text-xs font-semibold text-left">
													Who
												</div>
												<div className="w-full text-sm text-gray-400">
													Add guests
												</div>
											</div>
										</button>
									</div>
									<div className="pr-2">
										<button
											type="button"
											onClick={() => navigateAfterSearch()}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ")
													navigateAfterSearch();
											}}
										>
											<button
												className="rounded-full bg-brand p-3 text-white"
												type="button"
											>
												<div>
													<FaMagnifyingGlass className="block h-4 w-4 stroke-[4px]" />
												</div>
											</button>
										</button>
									</div>
								</div>
								{guestSelector && <GuestSelector />}

								{showResults && (
									<SearchResultMedium
										filteredList={filteredList}
										onLocationSelect={handleLocationSelect}
									/>
								)}
								{/* CALENDAR */}
								{calendar && <Calendar />}
							</div>
						</div>
					</div>
				</section>
			)}
			{/* POPUP SEARCH FOR SMALL SCREEN */}
			{showPopUpSearch && (
				<div
					id="popup-location"
					className="small-popup z-10 h-screen w-full flex-col overflow-y-auto bg-white transition-all duration-500"
				>
					{/* CLOSE BUTTON */}
					{!animated && (
						<div className="z-[2] px-5 py-3">
							<IoClose
								onClick={() => onClickToggle(false)}
								className="rounded-full border border-gray-300 p-1 text-3xl"
							/>
						</div>
					)}
					{/* SEARCH FORM */}
					{!calendar && (
						<button
							type="button"
							className={`smallLocationSearch mx-4 rounded-3xl border border-gray-300 p-6 shadow-lg ${animated ? "animate" : ""}`}
							onClick={handleOnClickTransform}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ")
									handleOnClickTransform();
							}}
						>
							<div>
								<span className="text-xl font-bold">Where to?</span>
							</div>
							<div className="flex flex-col justify-between space-y-6">
								<button
									className="mt-5 max-w-full rounded-lg border border-gray-500"
									type="button"
								>
									<form>
										<div>
											<label
												htmlFor=""
												className="flex h-14 items-center justify-between space-x-4 px-5"
											>
												<div className="flex h-full items-center">
													<FaMagnifyingGlass />
												</div>
												<input
													type="search"
													placeholder="Search destinations"
													className="h-full w-full overflow-hidden overflow-ellipsis whitespace-nowrap outline-none focus-visible:outline-none"
													value={input}
													onChange={(e) => handleChange(e.target.value)}
												/>
											</label>
										</div>
									</form>
								</button>
								{/* SEARCH RESULT */}
								{showResults && (
									<SearchResultList
										filteredList={filteredList}
										onLocationSelect={handleLocationSelect}
									/>
								)}
							</div>
						</button>
					)}
					{/* SEARCH DATE */}
					{!animated && (
						<button
							type="button"
							className="mx-4 mt-4 rounded-2xl border border-gray-300 p-4 shadow-lg"
							onClick={() => handleShowCalendar()}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") handleShowCalendar();
							}}
						>
							<div className="flex justify-between">
								<span className="text-sm font-bold text-gray-500">When?</span>
								<span className="text-sm font-semibold">
									{dateRange
										? `${formatDateToMonthDay(dateRange.start)} - ${formatDateToMonthDay(dateRange.end)}`
										: "Add dates"}
								</span>
							</div>
						</button>
					)}
					{calendar && <Calendar />}
					{/* ADD GUESTS */}
					{!animated && (
						<button
							type="button"
							className="mx-4 mt-4 rounded-2xl border border-gray-300 p-4 shadow-lg"
							onClick={() => handleShowGuestSelector()}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ")
									handleShowGuestSelector();
							}}
						>
							<div className="flex justify-between">
								<span className="text-sm font-bold text-gray-500">Who?</span>
								<span className="text-sm font-semibold">{`${guests <= 0 ? "Add guests" : `${guests} guests`}`}</span>
							</div>
						</button>
					)}
					{guestSelector && <GuestSelector />}
					{/* SEARCH BUTTON */}
					{!animated && !calendar && (
						<div className="absolute bottom-0 w-full px-6 py-3">
							<div>
								<button
									type="button"
									className="inline-block rounded-lg bg-brand px-6 py-3 text-white"
									onClick={() => navigateAfterSearch()}
								>
									<div className="flex items-center gap-x-2">
										<span>
											<FaMagnifyingGlass />
										</span>
										<span>Search</span>
									</div>
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Banner;
