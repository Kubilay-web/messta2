"use client";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkOverlay from "@/shared/@spk-reusable-components/uielements/spk-overlay";
import { PersonalInformation } from "@/shared/data/apps/jobs/candidate-details-data";
import SwiperComponent from "@/shared/data/apps/jobs/candidatedata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

interface candidateDetailsProps {
  candidate?: any;
}

const candidateDetails: React.FC<candidateDetailsProps> = ({ candidate }) => {
  return (
    <Fragment>
      <div className="mb-4">
        <Link
          href="/home/jobs/candidates"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 shadow-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Candidates
        </Link>
      </div>

      {/* <!-- Page Header --> */}
      <Seo title="candidate Details" />
      <Pageheader
        Heading="candidate Details"
        breadcrumbs={["Apps", "Jobs"]}
        currentpage="candidate Details"
      />
      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-2 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-8 col-span-12">
          <div className="box">
            <div className="box-body">
              <div className="flex items-center flex-wrap justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <div>
                    <span className="avatar avatar-xxl avatar-rounded">
                      <Image
                        fill
                        priority
                        src={
                          candidate?.image_secure_url ||
                          "../../../assets/images/faces/1.jpg"
                        }
                        className="rounded-circle img-fluid"
                        alt={candidate?.full_name || "candidate"}
                      />
                    </span>
                  </div>
                  <div className="ms-3">
                    <div className="font-medium mb-0 h4 flex items-center">
                      <Link scroll={false} href="#!">
                        {candidate?.full_name || "candidate Name"}
                        <SpkOverlay customClass="ms-3">
                          <span className="text-success text-[1rem]">
                            <i className="bi bi-check-circle-fill text-success !text-[1rem]"></i>
                            <span
                              className="hs-tooltip-content  ti-main-tooltip-content !border-black py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                              role="tooltip"
                            >
                              Verified candidate
                            </span>
                          </span>
                        </SpkOverlay>
                      </Link>
                    </div>
                    <Link scroll={false} href="#!" className="font-medium">
                      <i className="bi bi-briefcase me-1"></i>
                      {candidate?.title || "Software Developer"}
                    </Link>
                    <div className="flex flex-wrap gap-2 items-center text-[0.6875rem] text-textmuted dark:text-textmuted/50">
                      <p className="text-[0.6875rem] mb-0">Ratings : </p>
                      <div className="min-w-fit ms-2">
                        <span className="text-warning me-1">
                          <i className="bi bi-star-fill"></i>
                        </span>
                        <span className="text-warning me-1">
                          <i className="bi bi-star-fill"></i>
                        </span>
                        <span className="text-warning me-1">
                          <i className="bi bi-star-fill"></i>
                        </span>
                        <span className="text-warning me-1">
                          <i className="bi bi-star-fill"></i>
                        </span>
                        <span className="text-warning">
                          <i className="bi bi-star-half"></i>
                        </span>
                      </div>
                      <Link
                        scroll={false}
                        href="#!"
                        className="ms-1 min-w-fit text-textmuted dark:text-textmuted/50"
                      >
                        <span>(142)</span>
                        <span> Ratings</span>
                      </Link>
                    </div>
                    <div className="flex text-[0.875rem] mt-4 mb-4">
                      <div>
                        <p className="mb-1">
                          <i className="bi bi-geo-alt me-2"></i>
                          {candidate?.city?.name || "Banglore"},{" "}
                          {candidate?.state?.statename || "Karnataka"}
                        </p>
                        <p>
                          <i className="bi bi-briefcase me-2"></i>
                          {candidate?.experience_lable || "1 Year"} Experience
                        </p>
                      </div>
                      <div className="ms-4">
                        <p className="mb-1">
                          <i className="bi bi-coin me-2"></i>
                          Package (Yearly) :
                          <span
                            className="font-medium"
                            data-bs-toggle="tooltip"
                            title="Current Salary"
                          >
                            $10,000
                          </span>{" "}
                          -
                          <span
                            className="font-medium"
                            data-bs-toggle="tooltip"
                            title="Expected Salary"
                          >
                            $20,000
                          </span>
                        </p>
                        <p>
                          <i className="bi bi-mortarboard me-2"></i>
                          Graduate
                        </p>
                      </div>
                    </div>
                    <div className="popular-tags">
                      <Link
                        scroll={false}
                        href="#!"
                        className="badge !rounded-full bg-info/10 text-info me-1"
                      >
                        <i className="bi bi-moon-stars me-1"></i>Full Time
                      </Link>
                      <Link
                        scroll={false}
                        href="#!"
                        className="badge !rounded-full bg-danger/10 text-danger"
                      >
                        <i className="bi bi-clock me-1"></i> Immediate Joinee
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="btn-list">
                  <Link
                    scroll={false}
                    href="#!"
                    className="ti-btn ti-btn-primary me-2"
                  >
                    <i className="bi bi-download me-1"></i> Download CV
                  </Link>
                  <Link
                    scroll={false}
                    href="#!"
                    className="ti-btn ti-btn-icon ti-btn-soft-primary btn-wave me-2"
                  >
                    <i className="ri-heart-line text-[0.8125rem]"></i>
                  </Link>
                  <Link
                    scroll={false}
                    href="#!"
                    className="ti-btn ti-btn-icon ti-btn-soft-primary btn-wave"
                  >
                    <i className="ri-share-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <div className="box-title">candidate Profile Information</div>
            </div>
            <div className="box-body !p-0 candidate?-edu-timeline">
              <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h5 className="font-medium !text-[1.0625rem] flex items-center gap-2">
                  <span className="avatar avatar-rounded bg-primary avatar-sm text-white">
                    <i className="bi bi-briefcase text-[0.8125rem]"></i>
                  </span>
                  Career Objective :
                </h5>
                <div className="ms-6 ps-4">
                  <p className="opacity-90 mb-4">
                    {candidate?.bio ||
                      "Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus minima facilis..."}
                  </p>
                  <p className="mb-0 opacity-90">
                    Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam
                    rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus
                    labore no sed ipsum ipsum nonumy vero sanctus labore..
                  </p>
                </div>
              </div>
              <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h5 className="font-medium  !text-[1.0625rem] flex items-center gap-2">
                  <span className="avatar avatar-rounded bg-primary avatar-sm text-white">
                    <i className="bi bi-mortarboard text-[0.8125rem]"></i>
                  </span>
                  Education :
                </h5>
                <div className="ms-6 ps-4">
                  {candidate?.JobEducation &&
                  candidate?.JobEducation.length > 0 ? (
                    candidate?.JobEducation.map((edu, index) => (
                      <div key={index} className="mb-4">
                        <p className="font-medium text-[0.875rem] mb-0">
                          {edu.degree} in {edu.level}
                        </p>
                        <div className="flex gap-2">
                          <p className="mb-0">
                            {edu.notes || "University Name"}
                          </p>
                          <p className="mb-0 text-textmuted dark:text-textmuted/50">
                            <i className="bi bi-geo-alt text-[0.75rem]"></i>{" "}
                            {edu.year || "Location"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <p className="font-medium text-[0.875rem] mb-0">
                        Bachelors of science in computer science
                      </p>
                      <div className="flex gap-2">
                        <p className="mb-0">Dwayne University</p>
                        <p className="mb-0 text-textmuted dark:text-textmuted/50">
                          <i className="bi bi-geo-alt text-[0.75rem]"></i>{" "}
                          Nellore
                        </p>
                      </div>
                      <p className="mb-4"> (2019 Mar - 2024 Apr)</p>
                      <p className="font-medium text-[0.875rem] mb-0">
                        Intermediate (MPC)
                      </p>
                      <div className="flex gap-2">
                        <p className="mb-0">Sprect College</p>
                        <p className="mb-0 text-textmuted dark:text-textmuted/50">
                          <i className="bi bi-geo-alt text-[0.75rem]"></i>{" "}
                          Warangal
                        </p>
                      </div>
                      <p className="mb-0"> (2017 Mar - 2019 Apr)</p>
                    </>
                  )}
                </div>
              </div>
              <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h5 className="font-medium  !text-[1.0625rem] flex items-center gap-2">
                  <span className="avatar avatar-rounded bg-primary avatar-sm text-white">
                    <i className="bi bi-award text-[0.8125rem]"></i>
                  </span>
                  Certifications :
                </h5>
                <div className="ms-6 ps-4">
                  <p className="font-medium text-[0.875rem] mb-0">
                    Web Development (3 Months)
                  </p>
                  <p className="mb-4">EMC Solutions Pvt Ltd</p>
                  <p className="font-medium text-[0.875rem] mb-0">
                    Python Development (6 Months)
                  </p>
                  <p className="mb-0">Dabre Services Pvt Ltd</p>
                </div>
              </div>
              <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h5 className="font-medium  !text-[1.0625rem] flex items-center gap-2">
                  <span className="avatar avatar-rounded bg-primary avatar-sm text-white">
                    <i className="bi bi-journal-medical text-[0.8125rem]"></i>
                  </span>
                  Publications :
                </h5>
                <div className="ms-4">
                  <ol className="list-group border-0 list-disc ps-6">
                    <li className="border-0 py-1">
                      <span className="font-medium">
                        "One of a Kind Design,"
                      </span>{" "}
                      Web Design Book, Poulin Publishing, 2018
                    </li>
                    <li className="border-0 py-1">
                      <span className="font-medium">
                        "Website Design in 2019,"
                      </span>{" "}
                      A List Apart, June 2019
                    </li>
                    <li className="border-0 py-1">
                      <span className="font-medium">
                        "Usable Information Architecture,"
                      </span>{" "}
                      SitePoint, Feb 2019
                    </li>
                  </ol>
                </div>
              </div>
              <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h5 className="font-medium  !text-[1.0625rem] flex items-center gap-2">
                  <span className="avatar avatar-rounded bg-primary avatar-sm text-white">
                    <i className="bi bi-activity text-[0.8125rem]"></i>
                  </span>
                  Activities and Interests :
                </h5>
                <div className="ms-4">
                  <ol className="list-group border-0 list-disc ps-6">
                    <li className="border-0 py-1">Community Involvement</li>
                    <li className="border-0 py-1">Yoga</li>
                    <li className="border-0 py-1">Travel</li>
                    <li className="border-0 py-1">Art</li>
                  </ol>
                </div>
              </div>
              <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h5 className="font-medium  !text-[1.0625rem] flex items-center gap-2">
                  <span className="avatar avatar-rounded bg-primary avatar-sm text-white">
                    <i className="bi bi-link-45deg text-[0.8125rem]"></i>
                  </span>
                  References :
                </h5>
                <div className="ms-6 ps-4">
                  <p className="mb-4">
                    <span className="font-medium">Name : </span> Nicole Chiu
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Designation : </span> Software
                    Developer
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Company Name : </span> Spotech
                    Technical Solutions
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Mobile : </span> +91
                    7865443679
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Email : </span>{" "}
                    nchiu@email.com
                  </p>
                  <p className="mb-0">
                    <span className="font-medium">Location : </span> Hyderabad
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <div className="box-title">Experience Overview</div>
            </div>
            <div className="box-body !p-0 candidate?-edu-timeline">
              <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h5 className="font-medium  flex items-center gap-2">
                  <span className="avatar avatar-rounded bg-primary avatar-sm text-white">
                    <i className="bi bi-briefcase text-[0.8125rem]"></i>
                  </span>
                  Experience :
                </h5>
                <div className="ms-6 ps-4">
                  {candidate?.Experience && candidate?.Experience.length > 0 ? (
                    candidate?.Experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <p className="font-medium text-[0.875rem] mb-0">
                          {exp.designation} (
                          {exp.start
                            ? new Date(exp.start).toLocaleDateString()
                            : "Start"}{" "}
                          -{" "}
                          {exp.currently_working
                            ? "Present"
                            : exp.end
                              ? new Date(exp.end).toLocaleDateString()
                              : "End"}
                          )
                        </p>
                        <div className="flex gap-2">
                          <p>{exp.company}</p>
                          <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-4">
                            <i className="bi bi-geo-alt text-[0.6875rem]"></i>{" "}
                            {exp.department || "Location"}
                          </p>
                        </div>
                        <p className="font-medium mb-2">Responsibilities :</p>
                        <ol className="list-group border-0 list-disc ps-6">
                          {exp.responsibilities.split("\n").map((item, i) => (
                            <li key={i} className="border-0 py-1">
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))
                  ) : (
                    <>
                      <p className="font-medium text-[0.875rem] mb-0">
                        Full Stack Developer (2019 Mar - 2024 Apr)
                      </p>
                      <div className="flex gap-2">
                        <p>Spotech Technical Solutions</p>
                        <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-4">
                          <i className="bi bi-geo-alt text-[0.6875rem]"></i>{" "}
                          Kondapur, Hyderabad
                        </p>
                      </div>
                      <p className="font-medium mb-2">Responsibilities :</p>
                      <ol className="list-group border-0 list-disc ps-6">
                        <li className="border-0 py-1">
                          Design thoughtful, beautiful, and useful software user
                          interfaces and experiences in a team environment..
                        </li>
                        <li className="border-0 py-1">
                          Create user-centered designs by considering market
                          analysis, customer feedback, and usability findings.
                        </li>
                      </ol>
                    </>
                  )}
                </div>
              </div>
              <div className="p-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h5 className="font-medium  flex items-center gap-2">
                  <span className="avatar avatar-rounded bg-primary avatar-sm text-white">
                    <i className="bi bi-people text-[0.8125rem]"></i>
                  </span>
                  Volunteer Experience :
                </h5>
                <div className="ms-6 ps-4">
                  <p className="font-medium text-[0.875rem] mb-0">
                    Volunteer in the Student Organization
                  </p>
                  <p className="mb-2 text-textmuted dark:text-textmuted/50">
                    <i className="bi bi-geo-alt text-[0.75rem]"></i> Warangal,
                    2015
                  </p>
                  <ol className="list-group border-0 list-disc ps-6">
                    <li className="border-0 py-1">
                      In charge of Organizing activities for approximately 100+
                      internation schools in 2015
                    </li>
                    <li className="border-0 py-1">
                      In charge of Organizing activities for approximately 100+
                      internation schools in 2015
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="box border !bg-primary/[0.15] shadow-none">
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-6 items-center">
                                <div className="lg:col-span-6 col-span-12">
                                    <h5 className="font-medium mb-0">&#128400; Was this profile fit for someone?</h5>
                                </div>
                                <div className="lg:col-span-6 col-span-12 text-end">
                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-success ti-btn-lg" role="button">
                                        <i className="ri-share-line me-2"></i>Share Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
        <div className="xl:col-span-4 col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="box-title">Skills</div>
            </div>
            <div className="box-body">
              <div className="popular-tags">
                {candidate?.candidateSkill &&
                candidate?.candidateSkill.length > 0 ? (
                  candidate?.candidateSkill.map((skillId, index) => (
                    <Link
                      key={index}
                      scroll={false}
                      href="#!"
                      className="badge !rounded-full bg-light text-default me-1"
                    >
                      {skillId}
                    </Link>
                  ))
                ) : (
                  <>
                    <Link
                      scroll={false}
                      href="#!"
                      className="badge !rounded-full bg-light text-default me-1"
                    >
                      HTML{" "}
                    </Link>
                    <Link
                      scroll={false}
                      href="#!"
                      className="badge !rounded-full bg-light text-default me-1"
                    >
                      CSS{" "}
                    </Link>
                    <Link
                      scroll={false}
                      href="#!"
                      className="badge !rounded-full bg-light text-default me-1"
                    >
                      Javascript{" "}
                    </Link>
                    <Link
                      scroll={false}
                      href="#!"
                      className="badge !rounded-full bg-light text-default me-1"
                    >
                      Angular{" "}
                    </Link>
                    <Link
                      scroll={false}
                      href="#!"
                      className="badge !rounded-full bg-light text-default"
                    >
                      React{" "}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="box overflow-hidden">
            <div className="box-header">
              <div className="box-title">Tools Used</div>
            </div>
            <div className="box-body flex flex-wrap gap-2">
              <span className="avatar me-2 avatar-rounded bg-white dark:bg-bodybg  shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                <Image
                  fill
                  src="../../../assets/images/company-logos/1.png"
                  alt=""
                />
              </span>
              <span className="avatar me-2 avatar-rounded bg-white dark:bg-bodybg  shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                <Image
                  fill
                  src="../../../assets/images/company-logos/2.png"
                  alt=""
                />
              </span>
              <span className="avatar me-2 avatar-rounded bg-white dark:bg-bodybg  shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                <Image
                  fill
                  src="../../../assets/images/company-logos/3.png"
                  alt=""
                />
              </span>
              <span className="avatar me-2 avatar-rounded bg-white dark:bg-bodybg  shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                <Image
                  fill
                  src="../../../assets/images/company-logos/4.png"
                  alt=""
                />
              </span>
              <span className="avatar me-2 avatar-rounded bg-white dark:bg-bodybg  shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                <Image
                  fill
                  src="../../../assets/images/company-logos/5.png"
                  alt=""
                />
              </span>
              <span className="avatar avatar-rounded bg-white dark:bg-bodybg  shadow-sm border border-defaultborder dark:border-defaultborder/10 p-2">
                <Image
                  fill
                  src="../../../assets/images/company-logos/6.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <div className="box-title">Languages</div>
            </div>
            <div className="box-body">
              {candidate?.candidateLanguage &&
              candidate?.candidateLanguage.length > 0 ? (
                candidate?.candidateLanguage.map((langId, index) => (
                  <p key={index} className="mb-4">
                    <span className="font-medium">{langId} : </span>Fluent
                  </p>
                ))
              ) : (
                <>
                  <p className="mb-4">
                    <span className="font-medium">English : </span>Fluent
                  </p>
                  <p className="mb-4">
                    <span className="font-medium">Hindi : </span>Intermediate
                  </p>
                  <p className="mb-0">
                    <span className="font-medium">Telugu : </span>Expert
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="box overflow-hidden">
            <div className="box-header">
              <div className="box-title">Personal Information</div>
            </div>
            <div className="box-body p-2">
              <div className="table-responsive">
                <Spktables tableClass="table table-responsive table-borderless">
                  <tr>
                    <td className="w-[50%] !py-3 !px-[1.15rem]">
                      <span className="font-medium">Full Name</span>
                    </td>
                    <td className="!py-3 !px-[1.15rem]">
                      : {candidate?.full_name || "Not specified"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[50%] !py-3 !px-[1.15rem]">
                      <span className="font-medium">Email</span>
                    </td>
                    <td className="!py-3 !px-[1.15rem]">
                      : {candidate?.email || "Not specified"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[50%] !py-3 !px-[1.15rem]">
                      <span className="font-medium">Phone</span>
                    </td>
                    <td className="!py-3 !px-[1.15rem]">
                      : {candidate?.phone_one || "Not specified"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[50%] !py-3 !px-[1.15rem]">
                      <span className="font-medium">Date of Birth</span>
                    </td>
                    <td className="!py-3 !px-[1.15rem]">
                      :{" "}
                      {candidate?.birth_date
                        ? new Date(candidate?.birth_date).toLocaleDateString()
                        : "Not specified"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[50%] !py-3 !px-[1.15rem]">
                      <span className="font-medium">Gender</span>
                    </td>
                    <td className="!py-3 !px-[1.15rem]">
                      : {candidate?.gender || "Not specified"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[50%] !py-3 !px-[1.15rem]">
                      <span className="font-medium">Marital Status</span>
                    </td>
                    <td className="!py-3 !px-[1.15rem]">
                      : {candidate?.marital_status || "Not specified"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[50%] !py-3 !px-[1.15rem]">
                      <span className="font-medium">Address</span>
                    </td>
                    <td className="!py-3 !px-[1.15rem]">
                      : {candidate?.address || "Not specified"}
                    </td>
                  </tr>
                </Spktables>
              </div>
            </div>
            <div className="box-footer">
              <div className="flex items-center">
                <p className="text-[0.9375rem] mb-0 me-4 font-medium">
                  Social :
                </p>
                <div className="btn-list mb-0">
                  <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave waves-effect waves-light mb-xxl-0">
                    <i className="ri-facebook-line"></i>
                  </button>
                  <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave waves-effect waves-light mb-xxl-0">
                    <i className="ri-twitter-x-line"></i>
                  </button>
                  <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning btn-wave waves-effect waves-light mb-xxl-0">
                    <i className="ri-instagram-line"></i>
                  </button>
                  <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-success btn-wave waves-effect waves-light mb-xxl-0">
                    <i className="ri-github-line"></i>
                  </button>
                  <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave waves-effect waves-light mb-xxl-0">
                    <i className="ri-youtube-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="box">
                        <div className="box-body">
                            <div className="">
                                <h5 className="font-medium mb-3">Get Latest Alerts</h5>
                                <p className="mb-3">Latest candidate? updates on the go to recieved direct to your email. Stay updated with your latest new candidate?s list.</p>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control !border-s" placeholder="Email Here" aria-label="blog-email" aria-describedby="blog-subscribe" />
                                    <button className="ti-btn ti-btn-primary !m-0" type="button" id="blog-subscribe">Subscribe</button>
                                </div>
                                <label className="form-check-label">
                                    By Subscribing you accept to  <Link scroll={false} href="#!" className="text-success"><u>privacy policy</u> </Link>
                                </label>
                            </div>
                        </div>
                    </div> */}
          <div>
            <h4 className="font-medium mb-0">Related Profiles</h4>
            <p className="mb-4">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
            <SpkSwiperJs
              spaceBetween={30}
              slides={SwiperComponent}
              navigation={true}
              autoplay={true}
              className="swiper-related-jobs swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
            />
          </div>
        </div>
      </div>
      {/* <!-- End::row-2 --> */}
    </Fragment>
  );
};

export default candidateDetails;
