import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import Image from "next/image";
import Link from "next/link";

export const Navbar1 = () => {
	return (
		<>
			<header
				className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-transparent text-sm py-4 sm:py-0">
				<nav className=" w-full mx-auto px-4" aria-label="Global">
					<div className="relative sm:flex sm:items-center">
						<div className="flex items-center justify-between">
							<Link scroll={false} href="/dashboards/sales" className="header-logo">
								<Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
								<Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
							</Link>
							<div className="sm:hidden">
								<SpkButton buttontype="button"
									customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-white/10 dark:text-white dark:hover:!bg-light dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
									Collapse="#navbar-basic-usage" Controls="navbar-basic-usage" Label="Toggle navigation">
									<svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
										width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
										strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<line x1="3" x2="21" y1="6" y2="6" />
										<line x1="3" x2="21" y1="12" y2="12" />
										<line x1="3" x2="21" y1="18" y2="18" />
									</svg>
									<svg className="hs-collapse-open:block hidden flex-shrink-0 size-4"
										xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
										stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M18 6 6 18" />
										<path d="m6 6 12 12" />
									</svg>
								</SpkButton>
							</div>
						</div>
						<div id="navbar-basic-usage"
							className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block">
							<div
								className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
								<Link scroll={false} className="font-medium text-primary dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
									href="#!" aria-current="page">Active</Link>
								<div className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none]">
									<SpkButton buttontype="button"
										customClass="flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-white/70 dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent">
										Mega Menu
										<svg className="ms-2 flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
											height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
											strokeLinecap="round" strokeLinejoin="round">
											<path d="m6 9 6 6 6-6" />
										</svg>
									</SpkButton>
									<div
										className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 top-full start-0 min-w-60 bg-white sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10 before:absolute">
										<div className="sm:grid sm:grid-cols-3">
											<div className="flex flex-col">
												<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-light dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
													href="#!">
													About
												</Link>
												<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-light dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
													href="#!">
													Services
												</Link>
												<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-light dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
													href="#!">
													Customer Story
												</Link>
											</div>
											<div className="flex flex-col">
												<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-light dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
													href="#!">
													Careers
												</Link>
												<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-light dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
													href="#!">
													Careers: Overview
												</Link>
												<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-light dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
													href="#!">
													Careers: Apply
												</Link>
											</div>
											<div className="flex flex-col">
												<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-light dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
													href="#!">
													Log In
												</Link>
												<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-light dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
													href="#!">
													Sign Up
												</Link>
											</div>
										</div>
									</div>
								</div>
								<Link scroll={false} className="font-medium text-gray-600 hover:text-muted dark:text-white/70 dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
									href="#!">Project</Link>
							</div>
						</div>
					</div>
				</nav>
			</header>

		</>
	);
};
export const Navbar2 = () => {
	return (
		<>
			<header
				className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm dark:bg-bodybg">
				<nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
					<div className="flex items-center justify-between">
						<Link scroll={false} href="/dashboards/sales" className="header-logo">
							<Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
							<Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
						</Link>
						<div className="sm:hidden">
							<SpkButton buttontype="button"
								customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-transparent transition-all text-sm dark:bg-bodybg dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
								Collapse="#navbar-collapse-basic1" Controls="navbar-collapse-basic1"
								Label="Toggle navigation">
								<svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
									viewBox="0 0 16 16">
									<path fillRule="evenodd"
										d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
								</svg>
								<svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
									viewBox="0 0 16 16">
									<path
										d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
								</svg>
							</SpkButton>
						</div>
					</div>

					<div id="navbar-collapse-basic1" className="hidden basis-full grow sm:block">
						<div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
							<Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Active</Link>

							<div
								className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
								<SpkButton Id="hs-mega-menu-basic-dr3" buttontype="button"
									customClass="flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-white/70 dark:hover:text-white/70 ">
									Dropdown
									<svg className="ms-2 w-2.5 h-2.5 text-gray-600 dark:text-white/70" width="16" height="16"
										viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
											stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
									</svg>
								</SpkButton>

								<div
									className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-white sm:shadow-md rounded-sm p-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5">
									<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
										href="#!">
										About
									</Link>
									<div
										className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
										<SpkButton buttontype="button"
											customClass="w-full flex justify-between items-center text-sm text-gray-800 rounded-sm py-2 px-3 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300">
											Sub Menu
											<svg
												className="sm:-rotate-90 ms-2 w-2.5 h-2.5 text-gray-600 dark:text-white/70 rtl:rotate-90"
												width="16" height="16" viewBox="0 0 16 16" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
													stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
											</svg>
										</SpkButton>

										<div
											className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-sm p-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10 before:absolute sm:border before:-end-5 before:top-0 before:h-full before:w-5 top-0 end-full !mx-[10px]">
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												About
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Downloads
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Team Account
											</Link>
										</div>
									</div>

									<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
										href="#!">
										Downloads
									</Link>
									<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
										href="#!">
										Team Account
									</Link>
								</div>
							</div>

							<div
								className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
								<SpkButton buttontype="button"
									customClass="flex items-center w-full text-gray-600  hover:text-muted font-medium dark:text-white/70 dark:hover:text-white/70">
									Mega Menu
									<svg className="ms-2 w-2.5 h-2.5 text-gray-600 dark:text-white/70" width="16" height="16"
										viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
											stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
									</svg>
								</SpkButton>

								<div
									className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 top-full start-0 min-w-[15rem] bg-white sm:shadow-md rounded-sm p-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10 before:absolute before:-top-5 before:start-0 before:w-full before:h-5">
									<div className="sm:grid sm:grid-cols-3">
										<div className="flex flex-col">
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												About
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Services
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Customer Story
											</Link>
										</div>

										<div className="flex flex-col">
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Careers
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Careers: Overview
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Careers: Apply
											</Link>
										</div>

										<div className="flex flex-col">
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Log In
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Sign Up
											</Link>
										</div>
									</div>
								</div>
							</div>

							<Link scroll={false} className="font-medium text-gray-600 hover:text-muted dark:text-white/70 dark:hover:text-white/70"
								href="#!">Link</Link>
						</div>
					</div>
				</nav>
			</header>

		</>
	);
};
export const Navbar3 = () => {
	return (
		<>
			<header
				className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm dark:bg-bodybg">
				<nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
					<div className="flex items-center justify-between">
						<Link scroll={false} href="/dashboards/sales" className="header-logo">
							<Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
							<Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
						</Link>
						<div className="sm:hidden">
							<SpkButton buttontype="button"
								customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-transparent transition-all text-sm dark:bg-bodybg dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
								Collapse="#navbar-collapse-basic2" Controls="navbar-collapse-basic2"
								Label="Toggle navigation">
								<svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
									viewBox="0 0 16 16">
									<path fillRule="evenodd"
										d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
								</svg>
								<svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
									viewBox="0 0 16 16">
									<path
										d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
								</svg>
							</SpkButton>
						</div>
					</div>

					<div id="navbar-collapse-basic2" className="hidden basis-full grow sm:block">
						<div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
							<Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Active</Link>

							<div
								className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
								<SpkButton Id="hs-mega-menu-basic-dr" buttontype="button"
									customClass="flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-white/70 dark:hover:text-white/70 ">
									Dropdown
									<svg className="ms-2 w-2.5 h-2.5 text-gray-600 dark:text-white/70" width="16" height="16"
										viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
											stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
									</svg>
								</SpkButton>

								<div
									className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-3 bg-white sm:shadow-md rounded-sm p-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5">
									<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
										href="#!">
										About
									</Link>
									<div
										className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
										<SpkButton buttontype="button"
											customClass="w-full flex justify-between items-center text-sm text-gray-800 rounded-sm py-2 px-3 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300">
											Sub Menu
											<svg
												className="sm:-rotate-90 ms-2 w-2.5 h-2.5 text-gray-600 dark:text-white/70 rtl:rotate-90"
												width="16" height="16" viewBox="0 0 16 16" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
													stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
											</svg>
										</SpkButton>

										<div
											className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-3 bg-white sm:shadow-md rounded-sm p-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10 before:absolute sm:border before:-end-5 before:top-0 before:h-full before:w-5 top-0 end-full !mx-[10px]">
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												About
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Downloads
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Team Account
											</Link>
										</div>
									</div>

									<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
										href="#!">
										Downloads
									</Link>
									<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
										href="#!">
										Team Account
									</Link>
								</div>
							</div>

							<div
								className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
								<SpkButton buttontype="button"
									customClass="flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-white/70 dark:hover:text-white/70">
									Mega Menu
									<svg className="ms-2 w-2.5 h-2.5 text-gray-600 dark:text-white/70" width="16" height="16"
										viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
											stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
									</svg>
								</SpkButton>

								<div
									className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 sm:mt-3 top-full start-0 min-w-[15rem] bg-white sm:shadow-md rounded-sm p-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10 before:absolute before:-top-5 before:start-0 before:w-full before:h-5">
									<div className="sm:grid sm:grid-cols-3">
										<div className="flex flex-col">
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												About
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Services
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Customer Story
											</Link>
										</div>

										<div className="flex flex-col">
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Careers
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Careers: Overview
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Careers: Apply
											</Link>
										</div>

										<div className="flex flex-col">
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Log In
											</Link>
											<Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm text-gray-800 hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:text-white/70 dark:hover:bg-black/20 dark:hover:text-gray-300"
												href="#!">
												Sign Up
											</Link>
										</div>
									</div>
								</div>
							</div>

							<Link scroll={false} className="font-medium text-gray-600 hover:text-muted dark:text-white/70 dark:hover:text-white/70"
								href="#!">Link</Link>
						</div>
					</div>
				</nav>
			</header>

		</>
	);
};
export const Navbar4 = () => {
	return (
		<>
			 <header
							className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 sm:py-0 dark:bg-bodybg">
							<nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
							  <div className="flex items-center justify-between">
								<Link scroll={false} href="/dashboards/sales" className="header-logo">
								  <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
								  <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
								</Link>
								<div className="sm:hidden">
								  <SpkButton buttontype="button"
									customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-defaultborder/10 dark:text-white dark:hover:!bg-light dark:focus:outline-none  "
									Collapse="#navbar-auto-close-behavior" Controls="navbar-auto-close-behavior"
									Label="Toggle navigation">
									<svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
									  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
									  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									  <line x1="3" x2="21" y1="6" y2="6" />
									  <line x1="3" x2="21" y1="12" y2="12" />
									  <line x1="3" x2="21" y1="18" y2="18" />
									</svg>
									<svg className="hs-collapse-open:block hidden flex-shrink-0 size-4"
									  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
									  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									  <path d="M18 6 6 18" />
									  <path d="m6 6 12 12" />
									</svg>
								  </SpkButton>
								</div>
							  </div>
							  <div id="navbar-auto-close-behavior"
								className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block">
								<div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
								  <Link scroll={false} className="font-medium text-blue-500 dark:focus:outline-none  "
									href="#!" aria-current="page">Active</Link>
			
								  <div
									className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] [--auto-close:false]">
									<SpkButton buttontype="button"
									  customClass="sm:py-4 flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none">
									  Mega Menu
									  <svg className="ms-2 flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
										height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
										strokeLinecap="round" strokeLinejoin="round">
										<path d="m6 9 6 6 6-6" />
									  </svg>
									</SpkButton>
			
									<div
									  className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 sm:mt-3 top-full start-0 min-w-60 bg-white sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-bodybg sm:dark:border dark:border-white/10 before:absolute">
									  <div className="sm:grid sm:grid-cols-3">
										<div className="flex flex-col">
										  <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 !rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300 dark:focus:outline-none  "
											href="#!">
											About
										  </Link>
										  <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 !rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300 dark:focus:outline-none  "
											href="#!">
											Services
										  </Link>
										  <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 !rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300 dark:focus:outline-none  "
											href="#!">
											Customer Story
										  </Link>
										</div>
			
										<div className="flex flex-col">
										  <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 !rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300 dark:focus:outline-none  "
											href="#!">
											Careers
										  </Link>
										  <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 !rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300 dark:focus:outline-none  "
											href="#!">
											Careers: Overview
										  </Link>
										  <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 !rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300 dark:focus:outline-none  "
											href="#!">
											Careers: Apply
										  </Link>
										</div>
			
										<div className="flex flex-col">
										  <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 !rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300 dark:focus:outline-none  "
											href="#!">
											Log In
										  </Link>
										  <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 !rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300 dark:focus:outline-none  "
											href="#!">
											Sign Up
										  </Link>
										</div>
									  </div>
									</div>
								  </div>
			
								  <Link scroll={false} className="font-medium text-gray-600 hover:text-muted dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none  "
									href="#!">Project</Link>
								</div>
							  </div>
							</nav>
						  </header>

		</>
	);
};
export const Navbar5 = () => {
	return (
		<>
			 <header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-transparent text-sm py-4 sm:py-0">
                <nav className="w-full mx-auto px-4" aria-label="Global">
                  <div className="relative sm:flex sm:items-center">
                    <div className="flex items-center justify-between">
                      <Link scroll={false} href="/dashboards/sales/" className="header-logo">
                        <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
                        <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
                      </Link>
                      <div className="sm:hidden">
                        <SpkButton buttontype="button"
                          customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-white/10 dark:text-white dark:hover:!bg-light dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                          Collapse="#navbar-collapse-columns-1" Controls="navbar-collapse-columns-1"
                          Label="Toggle navigation">
                          <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" x2="21" y1="6" y2="6" />
                            <line x1="3" x2="21" y1="12" y2="12" />
                            <line x1="3" x2="21" y1="18" y2="18" />
                          </svg>
                          <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </SpkButton>
                      </div>
                    </div>

                    <div id="navbar-collapse-columns-1"
                      className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block">
                      <div
                        className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                        <div
                          className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
                          <SpkButton buttontype="button"
                            customClass="sm:py-3 flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-white/70 dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent">
                            1 Col
                            <svg className="ms-1 flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                              height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </SpkButton>

                          <div
                            className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 hidden z-10 top-full sm:w-48 bg-white sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10">
                            <div className="flex flex-col">
                              <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                href="#!">
                                About
                              </Link>
                              <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                href="#!">
                                Services
                              </Link>
                              <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                href="#!">
                                Customer Story
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div
                          className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
                          <SpkButton buttontype="button"
                            customClass="sm:py-3 flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-white/70 dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent">
                            2 Cols
                            <svg className="ms-1 flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                              height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </SpkButton>

                          <div
                            className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 hidden z-10 top-full end-0 sm:w-96 bg-white sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10">
                            <div className="sm:grid sm:grid-cols-2">
                              <div className="flex flex-col">
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  About
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Services
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Customer Story
                                </Link>
                              </div>

                              <div className="flex flex-col">
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Careers
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Careers: Overview
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Careers: Apply
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
                          <SpkButton buttontype="button"
                            customClass="sm:py-3 flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-white/70 dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent">
                            3 Cols
                            <svg className="ms-1 flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                              height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </SpkButton>

                          <div
                            className="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 hidden z-10 top-full end-0 sm:w-[30rem] bg-white sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-bodybg sm:dark:border dark:border-white/10 dark:divide-white/10">
                            <div className="sm:grid sm:grid-cols-3">
                              <div className="flex flex-col">
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  About
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Services
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Customer Story
                                </Link>
                              </div>

                              <div className="flex flex-col">
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Careers
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Careers: Overview
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Careers: Apply
                                </Link>
                              </div>

                              <div className="flex flex-col">
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Log In
                                </Link>
                                <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-white/70 dark:hover:bg-bodybg dark:hover:text-white dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-transparent"
                                  href="#!">
                                  Sign Up
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </header>
		</>
	);
};
export const Navbar6 = () => {
	return (
		<>
			 <header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white text-sm dark:bg-bodybg">
                <nav className=" w-full mx-auto sm:px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                  <Link scroll={false} href="/dashboards/sales" className="header-logo">
                    <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
                    <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
                  </Link>
                  <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                    <Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Landing</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Account</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Work</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Blog</Link>
                  </div>
                </nav>
              </header>
		</>
	);
};
export const Navbar7 = () => {
	return (
		<>
			 <header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white text-sm dark:bg-bodybg">
                <nav className="w-full mx-auto px-4 xxl:flex xxl:items-center xxl:justify-between" aria-label="Global">
                  <Link scroll={false} href="/dashboards/sales" className="header-logo">
                    <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
                    <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
                  </Link>
                  <div
                    className="flex flex-row items-center gap-5 mt-5 pb-2 overflow-x-auto xxl:justify-end xxl:mt-0 sm:ps-5 xxl:pb-0 xxl:overflow-x-visible">
                    <Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Dashboard</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Widgets</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Components</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Advanced Ui</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Basic Ui</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Elements</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Forms</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Pages</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Authentication</Link>
                    <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                      href="#!">Maps</Link>
                  </div>
                </nav>
              </header>
		</>
	);
};
export const Navbar8 = () => {
	return (
		<>
			<header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white text-sm dark:bg-bodybg">
                <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                  <div className="flex items-center justify-between">
                    <Link scroll={false} href="/dashboards/sales" className="header-logo">
                      <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
                      <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
                    </Link>
                    <div className="sm:hidden">
                      <SpkButton buttontype="button"
                        customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-transparent transition-all text-sm dark:bg-bodybg dark:hover:bg-black/20 dark:border-white/10 text-textmuted dark:text-textmuted/50 dark:hover:text-white dark:focus:ring-offset-white/10"
                        Collapse="#navbar-with-collapse" Controls="navbar-with-collapse"
                        Label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </SpkButton>
                    </div>
                  </div>
                  <div id="navbar-with-collapse" className="hidden basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                      <Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Landing</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Account</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Work</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Blog</Link>
                    </div>
                  </div>
                </nav>
              </header>
		</>
	);
};
export const Navbar9 = () => {
	return (
		<>
			<header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white text-sm dark:bg-bodybg">
                <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                  <div className="flex items-center justify-between">
                    <Link scroll={false} href="/dashboards/sales" className="header-logo">
                      <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
                      <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
                    </Link>
                    <div className="sm:hidden">
                      <SpkButton buttontype="button"
                        customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-transparent transition-all text-sm dark:bg-bodybg dark:hover:bg-black/20 dark:border-white/10 text-textmuted dark:text-textmuted/50 dark:hover:text-white dark:focus:ring-offset-white/10"
                        Collapse="#navbar-collapse-with-animation"
                        Controls="navbar-collapse-with-animation" Label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </SpkButton>
                    </div>
                  </div>
                  <div id="navbar-collapse-with-animation"
                    className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                      <Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Landing</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Account</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Work</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Blog</Link>
                    </div>
                  </div>
                </nav>
              </header>
		</>
	);
};
export const Navbar10 = () => {
	return (
		<>
			<header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white text-sm dark:bg-bodybg">
                <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                  <div className="flex items-center justify-between">
                    <Link scroll={false} href="/dashboards/sales" className="header-logo">
                      <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
                      <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
                    </Link>
                    <div className="sm:hidden">
                      <SpkButton buttontype="button"
                        customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-transparent transition-all text-sm dark:bg-bodybg dark:hover:bg-black/20 dark:border-white/10 text-textmuted dark:text-textmuted/50 dark:hover:text-white dark:focus:ring-offset-white/10"
                        Collapse="#navbar-image-2" Controls="navbar-image-2"
                        Label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </SpkButton>
                    </div>
                  </div>
                  <div id="navbar-image-2"
                    className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                      <Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Landing</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Account</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Work</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Blog</Link>
                    </div>
                  </div>
                </nav>
              </header>
		</>
	);
};
export const Navbar11 = () => {
	return (
		<>
			<header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white text-sm dark:bg-bodybg">
                <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                  <div className="flex items-center justify-between">
                    <Link scroll={false} href="/dashboards/sales" className="header-logo">
                      <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
                      <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
                    </Link>
                    <div className="sm:hidden">
                      <SpkButton buttontype="button"
                        customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-transparent transition-all text-sm dark:bg-bodybg dark:hover:bg-black/20 dark:border-white/10 text-textmuted dark:text-textmuted/50 dark:hover:text-white dark:focus:ring-offset-white/10"
                        Collapse="#navbar-alignment" Controls="navbar-alignment"
                        Label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </SpkButton>
                    </div>
                  </div>
                  <div id="navbar-alignment"
                    className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                      <Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Landing</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Account</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Work</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Blog</Link>
                    </div>
                  </div>
                </nav>
              </header>
		</>
	);
};
export const Navbar12= () => {
	return (
		<>
			 <header
                className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white text-sm dark:bg-bodybg">
                <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between flex-wrap" aria-label="Global">
                  <div className="flex items-center justify-between">
                    <Link scroll={false} href="/dashboards/sales/" className="header-logo">
                      <Image fill src="../../assets/images/brand-logos/toggle-logo.png" alt="logo" className="dark:hidden block" />
                      <Image fill src="../../assets/images/brand-logos/toggle-dark.png" alt="logo" className="hidden dark:block" />
                    </Link>
                    <div className="sm:hidden">
                      <SpkButton buttontype="button"
                        customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-transparent transition-all text-sm dark:bg-bodybg dark:hover:bg-black/20 dark:border-white/10 text-textmuted dark:text-textmuted/50 dark:hover:text-white dark:focus:ring-offset-white/10"
                        Collapse="#navbar-with-mega-menu" Controls="navbar-with-mega-menu"
                        Label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </SpkButton>
                    </div>
                  </div>
                  <div id="navbar-with-mega-menu"
                    className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                      <Link scroll={false} className="font-medium text-primary" href="#!" aria-current="page">Landing</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Account</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Work</Link>
                      <Link scroll={false} className="font-medium text-gray-600 hover:text-muted text-textmuted dark:text-textmuted/50 dark:hover:text-gray-500 whitespace-nowrap"
                        href="#!">Blog</Link>
                      <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none]">
                        <SpkButton Id="hs-mega-menu-basic-dr1" buttontype="button" customClass="flex items-center w-full text-gray-600 hover:text-muted font-medium dark:text-white/70 dark:hover:text-gray-500">
                          Dropdown
                          <svg className="ms-1 flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                        </SpkButton>

                        <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-bodybg sm:dark:border dark:border-defaultborder/10 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden">
                          <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300" href="#!">
                            About
                          </Link>
                          <div className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none]">
                            <SpkButton buttontype="button" customClass="w-full flex justify-between items-center text-sm text-gray-800 focus:ring-none  rounded-lg py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300">
                              Sub Menu
                              <svg className="sm:-rotate-90 rtl:rotate-90 ms-2 flex-shrink-0 size-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                            </SpkButton>

                            <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg p-2 dark:bg-bodybg sm:dark:border dark:border-defaultborder/10 dark:divide-gray-700 before:absolute sm:border before:-end-5 before:top-0 before:h-full before:w-5 top-0 end-full mt-[4px] !mx-[10px]">
                              <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300" href="#!">
                                About
                              </Link>
                              <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300" href="#!">
                                Downloads
                              </Link>
                              <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300" href="#!">
                                Team Account
                              </Link>
                            </div>
                          </div>

                          <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300" href="#!">
                            Downloads
                          </Link>
                          <Link scroll={false} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-transparent dark:text-gray-400 dark:hover:bg-light dark:hover:text-gray-300" href="#!">
                            Team Account
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </header>
		</>
	);
};
export const Navbar13 = () => {
	return (
		<>
			 <header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-primary text-sm py-4 rounded-sm">
                <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                  <div className="flex items-center justify-between">
                    <Link scroll={false} href="/dashboards/sales" className="header-logo">
                      <Image fill src="../../assets/images/brand-logos/toggle-white.png" alt="logo" className="block" />
                    </Link>
                    <div className="sm:hidden">
                      <SpkButton buttontype="button"
                        customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border border-white/[.25] font-medium bg-primary text-white shadow-sm align-middle hover:bg-primary focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white/10 focus:ring-transparent transition-all text-sm dark:bg-transparent dark:hover:bg-primary dark:border-white/10 text-textmuted dark:text-textmuted/50 dark:hover:text-white dark:focus:ring-offset-white/10"
                        Collapse="#navbar-primary" Controls="navbar-primary" Label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </SpkButton>
                    </div>
                  </div>
                  <div id="navbar-primary"
                    className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                      <Link scroll={false} className="font-medium text-white" href="#!" aria-current="page">Landing</Link>
                      <Link scroll={false} className="font-medium text-gray-300 hover:text-white" href="#!">Account</Link>
                      <Link scroll={false} className="font-medium text-gray-300 hover:text-white" href="#!">Work</Link>
                      <Link scroll={false} className="font-medium text-gray-300 hover:text-white" href="#!">Blog</Link>
                    </div>
                  </div>
                </nav>
              </header>
              <header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-secondary text-sm py-4 rounded-sm">
                <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                  <div className="flex items-center justify-between">
                    <Link scroll={false} href="/dashboards/sales" className="header-logo">
                      <Image fill src="../../assets/images/brand-logos/toggle-white.png" alt="logo" className="block" />
                    </Link>
                    <div className="sm:hidden">
                      <SpkButton buttontype="button"
                        customClass="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-sm border border-white/[.25] font-medium bg-secondary text-white shadow-sm align-middle hover:bg-white/[.15] focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-secondary focus:ring-white transition-all text-sm"
                        Collapse="#navbar-secondary" Controls="navbar-secondary" Label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor"
                          viewBox="0 0 16 16">
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </SpkButton>
                    </div>
                  </div>
                  <div id="navbar-secondary"
                    className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                      <Link scroll={false} className="font-medium text-white" href="#!" aria-current="page">Landing</Link>
                      <Link scroll={false} className="font-medium text-gray-300 hover:text-white" href="#!">Account</Link>
                      <Link scroll={false} className="font-medium text-gray-300 hover:text-white" href="#!">Work</Link>
                      <Link scroll={false} className="font-medium text-gray-300 hover:text-white" href="#!">Blog</Link>
                    </div>
                  </div>
                </nav>
              </header>
		</>
	);
};