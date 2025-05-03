import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";

const Footer = () => {
	const [isLocationDeatail, setIsLocationDetail] = useState(false);

	useEffect(() => {
		if (location.pathname.includes("/location/detail")) {
			/* setIsLocationDetail(true); */
		} else {
			/* setIsLocationDetail(false); */
		}
	});

	/* console.log(isLocationDeatail); */

	return (
		<section
			className="bg-gray-100 text-black border border-t-gray-300"
			id="footer"
		>
			<div
				className={`${isLocationDeatail ? "lg:w-[1080px] xl:w-[1280px] xl:!px-6" : ""} mx-auto m-auto md:px-6 xl:px-20 `}
			>
				<div className="grid gap-y-6 py-6 md:grid-cols-4 md:gap-x-4">
					<div className="">
						<h2 className="mb-2 font-semibold">Introduction</h2>{" "}
						<ul className="flex flex-col space-y-2">
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">How Airbnb works</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">News site</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Investors</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Airbnb Plus</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Airbnb Luxe</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">HotelTonight</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Airbnb for Work</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Employment opportuinity</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Creator's message</a>
							</li>
						</ul>
					</div>
					<div className="">
						<h2 className="mb-2 font-semibold">Community</h2>
						<ul className="flex flex-col space-y-2">
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Variety and familiarity</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Suitable appliances for disables</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Airbnb's partners</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Lodging for first-rate</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Customer's recommendations</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Airbnb.org</a>
							</li>
						</ul>
					</div>
					<div className="">
						<h2 className="mb-2 font-semibold">Welcoming Guests</h2>
						<ul className="flex flex-col space-y-2">
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">House for rent</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Host online experience</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Host experience</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Welcome guests with responsibility</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Resource center</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Community center</a>
							</li>
						</ul>
					</div>
					<div className="">
						<h2 className="mb-2 font-semibold">Support</h2>
						<ul className="flex flex-col space-y-2">
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Our COVID-19 policies</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								Support center
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Cancel options</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Residental are support</a>
							</li>
							<li className="text-sm tracking-wider text-gray-700 transition-all hover:text-black">
								<a href="/">Trustworthy and safe</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-t-gray-300 py-3 text-sm text-gray-700 md:flex md:items-center md:justify-between">
					<div className="items-center md:flex md:space-x-4">
						<p>© 2024 Airbnb, Inc. All rights reserved</p>
						<ul className="text-sm">
							<li className="inline-block">
								<a href="/">Privacy </a>
								<span className="inline-block px-2 text-center">|</span>
							</li>
							<li className="inline-block">
								<a href="/">Terms</a>
								<span className="inline-block px-2 text-center">|</span>
							</li>
							<li className="inline-block">
								<a href="/">Sitemap</a>
							</li>
						</ul>
					</div>
					<div className="flex space-x-4">
						<a href="/">
							<FaFacebookF />
						</a>
						<a href="/">
							<FaTwitter />
						</a>
						<a href="/">
							<FaInstagram />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Footer;
