import React from "react";
import img1 from "../assets/img/House.jpg";
import img2 from "../assets/img/Exotic'.jpg";
import img3 from "../assets/img/Farm.jpg";
import img4 from "../assets/img/Pet.jpg";

const StaticLocale = () => {
	return (
		<section id="staticLocale">
			<div className="mx-auto my-6 px-6 xl:px-20 gap-5">
				<h2 className="text-center text-3xl font-bold md:text-left">
					Stay anywhere
				</h2>
				<div className="mt-6 grid gap-y-6 text-center text-2xl font-semibold md:grid-cols-2 md:gap-x-9 lg:text-left lg:text-xl xl:grid-cols-4">
					<div className="flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl">
						<div className="h-96">
							<img
								src={img1}
								alt=""
								className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
							/>
						</div>
						<p className="rounded-bl-xl rounded-br-xl border border-gray-200 border-t-black/0 p-6">
							Whole house
						</p>
					</div>
					<div className="flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl">
						<div className="h-96">
							<img
								src={img2}
								alt=""
								className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
							/>
						</div>
						<p className="rounded-bl-xl rounded-br-xl border border-gray-200 border-t-black/0 p-6">
							Exotic locations
						</p>
					</div>
					<div className="flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl">
						<div className="h-96">
							<img
								src={img3}
								alt=""
								className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
							/>
						</div>
						<p className="rounded-bl-xl rounded-br-xl border border-gray-200 border-t-black/0 p-6">
							Farm and nature
						</p>
					</div>
					<div className="flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl">
						<div className="h-96">
							<img
								src={img4}
								alt=""
								className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
							/>
						</div>
						<p className="rounded-bl-xl rounded-br-xl border border-gray-200 border-t-black/0 p-6">
							Pets allowed
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StaticLocale;
