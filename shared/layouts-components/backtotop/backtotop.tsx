"use client"
import React, { useEffect, useState } from "react";

const Backtotop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const screenUp = () => {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		const handleScroll = () => {
			// Check the scroll position and update visibility state
			if (window.scrollY > 100) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		// Add the scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="scrollToTop" style={{ display: isVisible ? 'flex' : 'none', }} onClick={screenUp}	>
			<span className="arrow pt-1">
				<i className="ti ti-caret-up text-xl"></i>
			</span>
		</div>
	);
};

export default Backtotop;
