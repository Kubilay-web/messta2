"use client"
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import React, { FC, Fragment, useEffect } from "react";
import Shepherd from 'shepherd.js';
interface TourProps { }

const Tour: FC<TourProps> = () => {
  useEffect(() => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'class-1 class-2',
        scrollTo: { behavior: 'smooth', block: 'center' }
      },
      useModalOverlay: true
    });

    tour.addStep({
      id: 'step-1',
      title: "Welcome To Our Tour App",
      text: 'Tailor your travel experience with handpicked destinations, activities, and accommodations suited to your preferences.',
      attachTo: {
        element: '#step-1',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Next',
          action: () => {
            tour.next();
          },
        },
      ],
    });

    tour.addStep({
      id: 'step-2',
      title: "Choose a Destination",
      text: 'Select a destination that aligns with the interests and preferences of the group.',
      attachTo: {
        element: '#step-2',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: 'step-3',
      title: "Set a Budget",
      text: 'Determine a budget covering transportation, accommodation, meals, and activities.',
      attachTo: {
        element: '#step-3',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: 'step-4',
      title: "Book Transportation and Accommodation",
      text: 'Secure transportation to and from the destination, and book suitable accommodations.',
      attachTo: {
        element: '#step-4',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: 'step-5',
      title: "Plan Activities",
      text: 'Outline key activities or attractions for each day of the tour.',
      attachTo: {
        element: '#step-5',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: 'step-6',
      title: "Communicate and Confirm",
      text: 'Share the itinerary with participants, confirm bookings, and ensure everyone is prepared for the tour.',
      attachTo: {
        element: '#step-6',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: 'step-7',
      title: "Start Your Journey",
      text: 'Share the itinerary with participants, confirm bookings, and ensure everyone is prepared for the tour.',
      attachTo: {
        element: '#step-7',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Finish',
          action: tour.complete,
        },
      ],
    });

    tour.start();
  }, []);

  return (
    <Fragment>

      {/* <!-- Page Header --> */}
      <Seo title="Tour" />
      <Pageheader Heading="Tour" breadcrumbs={['Advanced Ui']} currentpage="Tour" />
      {/* <!-- Page Header Close --> */}

      {/* <!-- Start:: row-1 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-12 col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="box-title">
                SHEPHERD JS
              </div>
            </div>
            <div className="box-body !p-[3rem] text-center">
              <div className="grid grid-cols-12 gap-x-6 justify-center">
                <div className="xl:col-span-2 col-span-12"></div>
                <div className="xl:col-span-8 col-span-12 mb-[3rem]">
                  <span className="avatar avatar-xl">
                  <Image fill src="../../assets/images/company-logos/7.png" alt="" id="step-1" />
                  </span>
                  <h5 className="font-medium">Welcome to Tour App</h5>
                  <span className="text-textmuted dark:text-textmuted/50">Embark on a journey of discovery with our exclusive tour experiences. Whether you're a solo adventurer, a couple seeking romance, or a group of friends ready for excitement, we've curated the perfect tours for you. Create memories that last a lifetime.</span>
                </div>
                <div className="xl:col-span-2 col-span-12"></div>
              </div>
              <div className="grid grid-cols-12 sm:gap-x-6 flex-wrap justify-center">
                <div className="xl:col-span-1 col-span-12"></div>
                <div className="xl:col-span-10 col-span-12">
                  <div className="grid grid-cols-12 sm:gap-x-6">
                    <div className="xl:col-span-4 col-span-12">
                      <div className="box shadow-none !bg-primary/[0.15]">
                        <div className="box-body !p-[3rem] text-center">
                          <div className="mb-3">
                            <span className="avatar avatar-xl avatar-rounded bg-primary/[0.15] text-primary svg-primary" id="step-2">
                              <svg className="w-6 h-6 !fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M188.92,40a59.29,59.29,0,0,0-43.08,18.75A65.47,65.47,0,0,0,128,104L232,58.75A59.28,59.28,0,0,0,188.92,40Z" opacity="0.2" /><path d="M176.56,98.18A64.2,64.2,0,0,0,128,104.52L221.81,176a63,63,0,0,0-6.39-48.22A63.73,63.73,0,0,0,176.56,98.18Z" opacity="0.2" /><path d="M110.16,58.75a58.87,58.87,0,0,0-86.16,0L128,104A65.47,65.47,0,0,0,110.16,58.75Z" opacity="0.2" /><path d="M79.44,98.18a63.73,63.73,0,0,0-38.86,29.6A63,63,0,0,0,34.19,176L128,104.52A64.2,64.2,0,0,0,79.44,98.18Z" opacity="0.2" /><path d="M128,104a65.47,65.47,0,0,1,17.84-45.25,58.87,58.87,0,0,1,86.16,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M128,104.52a64.26,64.26,0,0,1,87.42,23.26A63,63,0,0,1,221.81,176Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M128,104a65.47,65.47,0,0,0-17.84-45.25,58.87,58.87,0,0,0-86.16,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M128,104.52a64.26,64.26,0,0,0-87.42,23.26A63,63,0,0,0,34.19,176Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="128" y1="104.52" x2="128" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                            </span>
                          </div>
                          <h6 className="font-medium mb-2">Choose a Destination</h6>
                          <span className="text-[0.875rem] text-textmuted dark:text-textmuted/50">Explore destinations, reviews, and user favorites for your next adventure.</span>
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-4 col-span-12">
                      <div className="box shadow-none !bg-secondary/[0.15]">
                        <div className="box-body !p-[3rem]">
                          <div className="mb-3">
                            <span className="avatar avatar-xl avatar-rounded bg-secondary/[0.15] text-secondary svg-secondary" id="step-3">
                              <svg className="w-6 h-6 !fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48Z" opacity="0.2" /><path d="M204,56a28,28,0,0,0-12,2.71h0A28,28,0,1,0,176,85.29h0A28,28,0,1,0,204,56Z" opacity="0.2" /><circle cx="204" cy="84" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M48,208H16a8,8,0,0,1-8-8V160a8,8,0,0,1,8-8H48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M112,160h32l67-15.41a16.61,16.61,0,0,1,21,16h0a16.59,16.59,0,0,1-9.18,14.85L184,192l-64,16H48V152l25-25a24,24,0,0,1,17-7H140a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M176,85.29A28,28,0,1,1,192,58.71" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                            </span>
                          </div>
                          <h6 className="font-medium mb-2">Set a Budget</h6>
                          <span className="text-[0.875rem] text-textmuted dark:text-textmuted/50">Estimate expenses, find exclusive deals, and plan within your budget.</span>
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-4 col-span-12">
                      <div className="box shadow-none !bg-success/[0.15]">
                        <div className="box-body !p-[3rem]">
                          <div className="mb-3">
                            <span className="avatar avatar-xl avatar-rounded bg-success/[0.15] text-success svg-success" id="step-4">
                              <svg className="w-6 h-6 !fill-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M88,224l24-24V176l24-24,48,72,24-24-32-88,33-31A24,24,0,0,0,175,47L144,80,56,48,32,72l72,48L80,144H56L32,168l40,16Z" opacity="0.2" /><path d="M88,224l24-24V176l24-24,48,72,24-24-32-88,33-31A24,24,0,0,0,175,47L144,80,56,48,32,72l72,48L80,144H56L32,168l40,16Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                            </span>
                          </div>
                          <h6 className="font-medium mb-2">Book Transportation</h6>
                          <span className="text-[0.875rem] text-textmuted dark:text-textmuted/50">Secure travel and stay with diverse options and special discounts.</span>
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-2 col-span-12"></div>
                    <div className="xl:col-span-4 col-span-12">
                      <div className="box shadow-none !bg-orangemain/[0.15]">
                        <div className="box-body !p-[3rem]">
                          <div className="mb-3">
                            <span className="avatar avatar-xl avatar-rounded bg-orangemain/[0.15] text-orangemain svg-orange" id="step-5">
                              <svg className="w-6 h-6 !fill-orangemain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M60.06,195.91a96,96,0,0,1-.12-135.65h0a95.7,95.7,0,0,1,28,67.76,95.74,95.74,0,0,1-28,67.77Z" opacity="0.2" /><path d="M196.06,195.91a96,96,0,0,1-.12-135.65h0a96,96,0,0,1,0,135.53Z" opacity="0.2" /><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M60,60.24A95.7,95.7,0,0,1,88,128a95.7,95.7,0,0,1-28,67.76" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M196,60.24a96,96,0,0,0,0,135.52" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="32" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="128" y1="32" x2="128" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                            </span>
                          </div>
                          <h6 className="font-medium mb-2">Plan Activities</h6>
                          <span className="text-[0.875rem] text-textmuted dark:text-textmuted/50">Discover attractions, create itineraries, and explore local highlights.</span>
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-4 col-span-12">
                      <div className="box shadow-none !bg-info/[0.15]">
                        <div className="box-body !p-[3rem]">
                          <div className="mb-3">
                            <span className="avatar avatar-xl avatar-rounded bg-info/[0.15] text-info svg-info" id="step-6">
                              <svg className="w-6 h-6 !fill-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M60.06,195.91a96,96,0,0,1-.12-135.65h0a95.7,95.7,0,0,1,28,67.76,95.74,95.74,0,0,1-28,67.77Z" opacity="0.2" /><path d="M196.06,195.91a96,96,0,0,1-.12-135.65h0a96,96,0,0,1,0,135.53Z" opacity="0.2" /><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M60,60.24A95.7,95.7,0,0,1,88,128a95.7,95.7,0,0,1-28,67.76" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M196,60.24a96,96,0,0,0,0,135.52" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="32" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="128" y1="32" x2="128" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                            </span>
                          </div>
                          <h6 className="font-medium mb-2">Confirm Bookings</h6>
                          <span className="text-[0.875rem] text-textmuted dark:text-textmuted/50">Stay connected, receive real-time updates, and confirm bookings.</span>
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-2 col-span-12"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-footer">
              <div className="sm:flex justify-end">
                <SpkButton variant="primary" customClass="ti-btn m-1">Cancel Journey</SpkButton>
                <SpkButton variant="success" customClass="ti-btn m-1" Id="step-7">Start Your Journey</SpkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End:: row-1 --> */}
    </Fragment>
  );
};

export default Tour;