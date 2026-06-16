"use client"
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Faqs = () => {

  return (
    <Fragment>

      {/* <!-- Page Header --> */}
      <Seo title="Faq's" />
      <Pageheader Heading="Faq's" breadcrumbs={['Pages']} currentpage="Faq's" />
      {/* <!-- Page Header Close --> */}

      {/* <!-- Start:: row-1 --> */}
      <div className="grid grid-cols-12">
        <div className="xl:col-span-12 col-span-12">
          <div className="box card-bg-primary border-0 shadow-none faq-banner-card">
            <div className="box-body !p-6">
              <div className="grid grid-cols-12 sm:gap-x-6">
                <div
                  className="xxl:col-span-7 xl:col-span-7 lg:col-span-7 md:col-span-7 sm:col-span-7 col-span-12 my-auto">
                  <div className="faq-text leading-none mb-3">FAQ's</div>
                  <span className="block opacity-80 text-white">Welcome to our FAQ page, your go-to resource for answers
                    to common queries and valuable information about our platform. Whether you're a newcomer or an
                    experienced user, this section aims to address your most pressing questions and concerns.</span>
                </div>
                <div
                  className="xxl:col-span-5 xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-5 sm:block hidden my-auto">
                  <Image width={342} height={250} src="../../assets/images/media/media-65.png" alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End:: row-1 --> */}

      {/* <!-- Start:: row-2 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-3 col-span-12">
          <div className="box">
            <div className="box-body">
              <nav aria-label="Tabs" className="md:flex block !flex-col !justify-start whitespace-nowrap" role="tablist">
                <Link scroll={false} className="m-1 block text-wrap w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 flex-grow  text-[0.8rem] font-medium rounded-sm hover:text-primary active"
                  id="tab-1" role="tab" data-hs-tab="#tab1" href="#!" >
                  Theme Customization
                </Link>
                <Link scroll={false} className="m-1 block text-wrap w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                  id="tab-2" data-hs-tab="#tab2" href="#!">
                  User Management
                </Link>
                <Link scroll={false} className="m-1 block text-wrap w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                  id="tab-3" data-hs-tab="#tab3" href="#!">
                  Data Export and Reports
                </Link>
                <Link scroll={false} className="m-1 block text-wrap w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                  id="tab-4" data-hs-tab="#tab4" href="#!">
                  Security and Authentication
                </Link>
                <Link scroll={false} className="m-1 block text-wrap w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                  id="tab-5" data-hs-tab="#tab5" href="#!">
                  Security and Authentication
                </Link>
                <Link scroll={false} className="m-1 block text-wrap w-full hs-tab-active:bg-primary/10 hs-tab-active:text-primary cursor-pointer text-defaulttextcolor dark:text-defaulttextcolor/80 py-2 px-3 text-[0.8rem] flex-grow font-medium rounded-sm hover:text-primary "
                  id="tab-6" data-hs-tab="#tab6" href="#!">
                  Troubleshooting and Support
                </Link>
              </nav>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <div className="box-title">
                Subscribe To NewsLetter
              </div>
            </div>
            <div className="box-body">
              <div className="text-center">
                <div className="input-group mb-4">
                  <input type="text" className="form-control !border-s" placeholder="Email Here" aria-label="blog-email"
                    aria-describedby="blog-subscribe" />
                  <button className="ti-btn ti-btn-primary !m-0 btn-wave waves-effect waves-light" type="button"
                    id="blog-subscribe">Subscribe</button>
                </div>
                <label className="form-check-label text-textmuted dark:text-textmuted/50 font-medium text-[0.8125rem]">
                  Subscribe to get updates about latest News &amp; Posts
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-9 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-body">
                  <div className="tab-content fqs-accordion">
                    <div className="tab-pane show active border-0 p-0" id="tab1" aria-labelledby="tab-1" role="tabpanel">
                      <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                        id="accordionFAQ1">
                        <div className="hs-accordion-group">
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border dark:border-defaultborder/10-white/10 active"
                            id="faq-one">
                            <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-one"> 1. How can I change the color scheme of the admin
                              template?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-one"
                              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                              aria-labelledby="faq-one" style={{ display: "block" }}>
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">Navigate to the "Theme
                                  Settings" page, where you'll find options to choose a primary color and accent
                                  color. Select your desired colors and save the changes.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-two"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-two">2. Is it possible to upload a custom logo for my admin
                              dashboard?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-two"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-two">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 "> Yes, you can upload a
                                  custom logo. Visit the "Logo & Branding" section and use the upload feature to
                                  replace the default logo with your own. </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-twenty"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-three"> 3. Are there predefined themes available, or can I
                              create a custom theme?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-three"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-twenty">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 "> The admin template
                                  provides both predefined themes and the option to create custom themes. Explore the
                                  "Theme Gallery" for pre-made themes or use the "Customize Theme" feature for a
                                  personalized look. </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-thirty"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-four">4. Can I use my own CSS styles to override the default
                              styles?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-four"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 "> Yes, you can add
                                  custom CSS styles. In the "Advanced Settings," find the "Custom CSS" section and
                                  enter your styles. Ensure compatibility and avoid conflicting with existing styles.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-three"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-five"> 5. How do I enable or disable the dark mode?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-five"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-three">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  To toggle dark mode, go to the "Appearance" settings. Find the "Dark Mode" option
                                  and switch it on or off based on your preference.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane border-0 p-0 hidden" id="tab2" aria-labelledby="tab-2" role="tabpanel">
                      <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                        id="accordionFAQ2">
                        <div className="hs-accordion-group">
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-one2"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-one1">1. What are user roles, and how do they affect access
                              permissions?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-one1"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-one2">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  User roles define the level of access. Visit "User Roles" in the admin settings to
                                  manage roles and customize permissions for each role.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-two2"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-two2">2. Can I reset a user's password as an administrator?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-two2"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-two2">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, as an administrator, you can reset a user's password. Go to the "User
                                  Management" page, select the user, and choose the "Reset Password" option.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-twenty3"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-three3">3. Is there a way to import multiple users
                              simultaneously?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-three3"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-twenty3">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, use the "Bulk Import" feature in the "User Management" section. Prepare a CSV
                                  file with user details and upload it for quick user creation.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-thirty4"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-four4">4. How can I view the login history of a specific
                              user?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-four4"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Access the user's profile in the "User Management" area and navigate to the "Login
                                  History" tab to view a detailed log of their login activities.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-three5"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-five5"> 5. What happens if a user forgets their password?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-five5"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-three5">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Users can reset their passwords by clicking on the "Forgot Password" link on the
                                  login page. An email with instructions for password reset will be sent to their
                                  registered email address.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane border-0 p-0 hidden" id="tab3" aria-labelledby="tab-3" role="tabpanel">
                      <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                        id="accordionFAQ3">
                        <div className="hs-accordion-group">
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-one11"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-one11">1. Can I schedule automatic data exports for specific
                              intervals?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-one11"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-one11">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, you can schedule automatic exports. Explore the "Scheduled Exports" section to
                                  set up recurring exports and choose the data format and destination.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-two22"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-two22">2. What types of data can be exported from the admin
                              template?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-two22"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-two22">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Most data tables in the admin template are exportable, including user data, reports,
                                  and custom datasets. Use the "Export" feature in the respective sections.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-twenty33"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-three33">3. Is there a limit to the size of exported files?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-three33"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-twenty33">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  The export file size limit varies depending on the configuration. Check the "Export
                                  Settings" to view and adjust the size limits if necessary.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-thirty44"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-four44">4. Can I customize the format of exported reports?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-four44"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, you can customize export formats. In the "Export Settings," find options to
                                  choose the file format (CSV, Excel, etc.) and configure additional formatting
                                  options.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-three55"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-five55"> 5. How do I generate and download a quick summary
                              report?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-five55"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-three55">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Navigate to the "Reports" section and use the "Generate Summary Report" button. Once
                                  generated, click on the download link to get the summary report.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane border-0 p-0 hidden" id="tab4" aria-labelledby="tab-4" role="tabpanel">
                      <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                        id="accordionFAQ4">
                        <div className="hs-accordion-group">
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-one111"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-one111">1. Are there security measures in place to protect
                              against unauthorized access?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-one111"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-one111">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, the admin template includes robust security features, including encryption,
                                  secure password hashing, and session management. Regularly update the system and use
                                  strong passwords for enhanced security.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-two222"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-two222">2. Can I enable two-factor authentication for admin
                              accounts?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-two222"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-two222">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, two-factor authentication is available. Access the "Security Settings" to
                                  enable and configure 2FA for added account security.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-twenty333"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-three333">3. What should I do if I suspect a security
                              breach?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-three333"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-twenty333">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  In case of a security concern, immediately change your password and notify the
                                  system administrator. Check the "Security Logs" for any suspicious activities.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-thirty444"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-four444">4. How often should I update the admin template for
                              security patches?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-four444"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  It's advisable to regularly check for updates and apply security patches. Aim to
                                  update the admin template whenever a new version is released to ensure the latest
                                  security measures are in place.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-three555"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-five555"> 5. Can I restrict access to certain features based
                              on user roles?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-five555"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-three555">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, access restrictions can be set based on user roles. Utilize the "Role-based
                                  Access Control" (RBAC) settings to configure specific permissions for different user
                                  roles.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane border-0 p-0 hidden" id="tab5" aria-labelledby="tab-5" role="tabpanel">
                      <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                        id="accordionFAQ5">
                        <div className="hs-accordion-group">
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-one1111"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-one1111">1. How do I rearrange the order of items in the
                              navigation menu?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-one1111"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-one1111">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Visit the "Menu Settings" page, where you can easily drag and drop menu items to
                                  rearrange their order. Save the changes to update the navigation menu.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-two2222"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-two2222">2. Is it possible to customize the dashboard
                              layout?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-two2222"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-two2222">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, you can customize the dashboard layout. Use the "Dashboard Settings" to add or
                                  remove widgets, resize them, and arrange them according to your preferences.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-twenty3333"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-three3333">3. Can I set a default landing page for users
                              after login?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-three3333"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-twenty3333">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, you can set a default landing page. In the "User Settings" or "General
                                  Settings," find the option to specify the default page users will see upon login.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-thirty4444"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-four4444">4. How do I enable or disable email notifications
                              for certain events?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-four4444"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Configure email notification settings in the "Notification Center" or "Email
                                  Settings" section. Specify the events for which you want to receive notifications.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-three5555"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-five5555"> 5. Is there a search feature available to quickly
                              find specific data or settings?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-five5555"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-three5555">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Yes, a search feature is available. Look for the search bar in the header or
                                  navigation menu. Enter keywords to quickly locate specific data, settings, or pages.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane border-0 p-0 hidden" id="tab6" aria-labelledby="tab-6" role="tabpanel">
                      <div className="accordion accordion-customicon1 accordion-primary accordions-items-seperate"
                        id="accordionFAQ6">
                        <div className="hs-accordion-group">
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-one11111"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-one11111">1. What should I do if the admin template is not
                              loading correctly?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-one11111"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-one11111">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  If you encounter loading issues, try clearing your browser cache or accessing the
                                  admin template in an incognito/private browsing window. If the problem persists,
                                  check the browser compatibility in the documentation.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-two22222"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-two22222">2. How can I report a bug or technical issue with
                              the admin template?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-two22222"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-two22222">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Report bugs through the "Support" or "Feedback" section. Provide detailed
                                  information about the issue, including your browser version and steps to reproduce
                                  the problem.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-twenty33333"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-three33333">3. Are there known compatibility issues with
                              certain browsers or devices?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-three33333"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-twenty33333">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Check the documentation for any known compatibility issues. Ensure you are using the
                                  latest browser versions, and report any issues to the support team.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-thirty44444"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-four44444">4. What do I do if I forget my username or
                              encounter issues with login?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-four44444"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  If you forget your username, use the "Forgot Username" link on the login page. If
                                  login issues persist, contact your system administrator or support for assistance.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="hs-accordion bg-white dark:bg-bodybg border dark:border-defaultborder/10 mt-[0.5rem] rounded-sm dark:border-defaultborder/10-white/10"
                            id="faq-three55555"> <button type="button"
                              className="hs-accordion-toggle hs-accordion-active:!text-primary hs-accordion-active:border dark:border-defaultborder/10-b hs-accordion-active:bg-primary/10   dark:border-defaultborder/10 dark:hs-accordion-active:border dark:border-defaultborder/10-white/10 justify-between inline-flex items-center w-full font-semibold text-start text-[0.85rem] transition py-3 px-4 dark:hs-accordion-active:!text-primary dark:text-gray-200 dark:hover:text-white/80"
                              aria-controls="faq-collapse-five55555"> 5. How do I check for updates and apply patches
                              to fix issues?
                              <svg
                                className="hs-accordion-active:hidden hs-accordion-active:!text-primary hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary block w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                                <path d="M8 15.36L8 2.35999" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                              <svg
                                className="hs-accordion-active:block hs-accordion-active:!text-white hs-accordion-active:!bg-primary hs-accordion-active:group-hover:!text-primary hidden w-[1.25rem] h-[1.25rem] p-[3px] rounded-full text-gray-600 bg-light group-hover:text-defaulttextcolor dark:text-defaulttextcolor/80 "
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 8.85999L14.5 8.85998" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"></path>
                              </svg>
                            </button>
                            <div id="faq-collapse-five55555"
                              className="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
                              aria-labelledby="faq-three55555">
                              <div className="p-5">
                                <p className="text-defaulttextcolor dark:text-defaulttextcolor/80 ">
                                  Visit the "Updates" section to check for the latest version. If updates are
                                  available, follow the prompts to apply patches. This can resolve known issues and
                                  enhance system stability.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-12 col-span-12">
                <div className="box !bg-primary/[0.15] border-0 shadow-none">
                  <div className="box-body !p-6">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div>
                        <h5 className="font-semibold mb-2">Still Have questions</h5>
                        <span
                          className="block text-[0.75rem] leading-none font-medium text-textmuted dark:text-textmuted/50">You
                          can post your
                          questions here and our support team is always active</span>
                      </div>
                      <button className="ti-btn btn-wave ti-btn-secondary !m-0" data-hs-overlay="#fqs-modal">Contact US<i className="ti ti-arrow-narrow-right ms-2"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End:: row-2 --> */}
    </Fragment>
  );
};

export default Faqs;