import React from "react";
import { PiArrowFatUpFill } from "react-icons/pi";

const BackToTopButton = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<button
			type="button"
			className="fixed bottom-0 right-0 mb-8 mr-7 hidden md:block"
			onClick={() => scrollToTop()}
			onKeyDown={(e) => {
				if (e.key === "PageUp") scrollToTop();
			}}
		>
			<div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-brand text-white">
				<PiArrowFatUpFill className="text-xl" />
			</div>
		</button>
	);
};

export default BackToTopButton;
