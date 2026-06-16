"use client";
import { useState, useEffect } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGraduationCap,
  FaMoneyBillWave,
  FaAddressCard,
} from "react-icons/fa";
import { MdDateRange, MdMoreTime, MdWork } from "react-icons/md";
import { ShareSocial } from "react-share-social";
import { IoFileTrayFullSharp } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { GrUserExpert } from "react-icons/gr";
import { LiaCriticalRole } from "react-icons/lia";
import Link from "next/link";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import SwiperComponent from "@/shared/data/apps/jobs/job-details-data";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import { useParams } from "next/navigation";

const JobDetails = () => {
const params = useParams();
const slug = params.slug;
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [job, setJob] = useState(null);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 20 },
    480: { slidesPerView: 1, spaceBetween: 30 },
    640: { slidesPerView: 2, spaceBetween: 40 },
    1440: { slidesPerView: 2, spaceBetween: 40 },
  };

  useEffect(() => {
    if (!slug) return;
    fetchJobData();
    fetchJobApplyStatus();
  }, [slug]);

  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, []);

  async function fetchJobData() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/job/${slug}`
      );
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        toast.error(data.err || "Failed to fetch job data");
      } else {
        setJob(data.job);
        setCount(data.openjobs || 0);
        setTags(data.tags || []);
        setSkills(data.skills || []);
      }
    } catch {
      toast.error("An error occurred");
    }
    setLoading(false);
  }

  async function fetchJobApplyStatus() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobapplycheck/${slug}`
      );
      const data = await res.json();
      if (res.ok) setAlreadyApplied(data.alreadyexists || false);
    } catch {}
    setLoading(false);
  }

  async function handleApply() {
    if (!job?.id) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobapply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: job?.id }),
        }
      );
      const data = await res.json();
      if (!res.ok) toast.error(data.err || "Failed to apply");
      else {
        toast.success("Applied successfully");
        setAlreadyApplied(true);
      }
    } catch {
      toast.error("An error occurred");
    }
    setLoading(false);
  }

  //   if (loading || !job) {
  //     return (
  //       <div className="mx-auto my-10 max-w-5xl p-10 text-center">
  //         <Skeleton active />
  //       </div>
  //     );
  //   }

  return (
    <>
      {/* <!-- Page Header --> */}
      <Seo title="Job Details" />
      <Pageheader
        Heading="Job Details"
        breadcrumbs={["Apps", "Jobs"]}
        currentpage="Job Details"
      />
      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-8 col-span-12">
          <div className="box">
            <div className="box-body">
              <div className="flex flex-wrap items-top justify-between gap-2">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <div>
                      <span className="avatar avatar-rounded avatar-lg">
                        <Image
                          src={
                           job?.company?.logoSecureUrl ||
                            "/assets/images/company-logos/8.png"
                        
                          }
                          width={50}
                          height={50}
                          alt={job?.company?.name ?? "Company"}
                        />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-0 flex items-center">
                        <Link scroll={false} href="#!">
                          {job?.title || "UI Developer - Fresher"}
                        </Link>
                      </h4>
                      <Link scroll={false} href="#!" className="font-medium">
                        <i className="bi bi-building"></i>{" "}
                        {job?.company?.name ||
                          "Spruko Technologies PRIVATE LIMITED"}
                      </Link>
                      <div className="flex text-[0.875rem] mt-4">
                        <div>
                          <p className="mb-1">
                            <i className="bi bi-geo-alt me-1"></i>
                            {job?.city?.name || "Banglore"},{" "}
                            {job?.state?.statename || "Karnataka"}
                          </p>
                          <p>
                            <i className="bi bi-briefcase me-1"></i>
                            {job?.job_experience?.name || "1 - 3+ years"}{" "}
                            Experience
                          </p>
                        </div>
                        <div className="ms-4">
                          <p className="mb-1">
                            <i className="bi bi-coin me-1"></i>
                            <span className="font-medium">
                              {job?.min_salary || "10,000"} -{" "}
                              {job?.max_salary || "20,000"}
                            </span>{" "}
                            / per month{" "}
                            {job?.custom_salary
                              ? `(+${job?.custom_salary} incentives)`
                              : "(+incentives)"}
                          </p>
                          <p>
                            <i className="bi bi-mortarboard me-1"></i>
                            {job?.education?.name || "Graduate"} and Above
                          </p>
                        </div>
                      </div>
                      <div className="popular-tags mt-4">
                        <SpkBadge
                          variant="info/[0.15]"
                          customClass="!rounded-full text-info me-1"
                        >
                          <i className="bi bi-clock me-1"></i>
                          {job?.job_type?.name || "Full Time"}
                        </SpkBadge>
                        <SpkBadge
                          variant="danger/[0.15]"
                          customClass="!rounded-full text-danger"
                        >
                          <i className="bi bi-briefcase me-1"></i>
                          {job?.vacancies || "13"} Openings
                        </SpkBadge>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="btn-list mb-2">
                    {!alreadyApplied ? (
                      <button
                        onClick={handleApply}
                        disabled={loading}
                        className="ti-btn ti-btn-primary me-2"
                      >
                        Apply Now
                      </button>
                    ) : (
                      <span className="ti-btn ti-btn-primary me-2 cursor-default">
                        Applied
                      </span>
                    )}
                    <Link
                      scroll={false}
                      href="#!"
                      className="ti-btn ti-btn-icon ti-btn-soft-primary btn-wave me-2"
                    >
                      <i className="ri-heart-line"></i>
                    </Link>
                    <Link
                      scroll={false}
                      href="#!"
                      className="ti-btn ti-btn-icon ti-btn-soft-primary btn-wave"
                    >
                      <i className="ri-share-line"></i>
                    </Link>
                  </div>
                  {job?.deadline && (
                    <p className="mb-0">
                      <i
                        className="bi bi-info-circle text-danger pr-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`${Math.ceil((new Date(job?.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left`}
                      ></i>
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date(job?.deadline) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days left
                      </span>{" "}
                      to apply this job
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="box-body">
              <div className="box-body">
                <h5 className="font-medium">Job Description</h5>
                <p className="opacity-90 pb-4">
                  {job?.description ||
                    "Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no sed ipsum ipsum nonumy vero sanctus labore.A officiis optio temporibus minima facilis..."}
                </p>

                {job?.Job_benfits && job?.Job_benfits.length > 0 && (
                  <>
                    <h5 className="font-medium">Key Responsibilities</h5>
                    <ol className="ti-list-group !border-0 ti-list-unstyled list-decimal mb-4 ps-[2rem]">
                      {job?.Job_benfits.map((benefit, index) => (
                        <li
                          key={index}
                          className="ti-list-group-item !border-0 !py-1"
                        >
                          {benefit.benfit.name}
                        </li>
                      ))}
                    </ol>
                  </>
                )}

                <h5 className="font-medium">Requirements</h5>
                <ol className="ti-list-group !border-0 ti-list-unstyled list-decimal mb-4 ps-[2rem]">
                  <li className="ti-list-group-item !border-0 !py-1">
                    Design thoughtful, beautiful, and useful software user
                    interfaces and experiences in a team environment..
                  </li>
                  <li className="ti-list-group-item !border-0 !py-1">
                    Create user-centered designs by considering market analysis,
                    customer feedback, site metrics, and usability findings.
                  </li>
                  <li className="ti-list-group-item !border-0 !py-1">
                    Work with stakeholders to plan projects for effective
                    delivery while maintaining high standards for design..
                  </li>
                  <li className="ti-list-group-item !border-0 !py-1">
                    Be a passionate and effective advocate for design with
                    non-design audiences..
                  </li>
                  <li className="ti-list-group-item !border-0 !py-1">
                    Use business requirements, user and market research to
                    assist in developing scenarios, use cases, and high-level
                    requirements..
                  </li>
                </ol>
              </div>
            </div>
          </div>

        </div>

        <div className="xl:col-span-4 col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="box-title">Job Highlights</div>
            </div>
            <div className="box-body">
              <div className="grid grid-cols-12 gap-x-6 gap-y-[3rem]">
                <div className="xxl:col-span-6 xl:col-span-12 md:col-span-6 col-span-12">
                  <p className="text-[0.875rem] mb-4 flex items-center">
                    <span className="avatar avatar-sm border leading-none avatar-rounded me-2 bg-light text-default border-defaultborder dark:border-defaultborder/10">
                      <i className="ri-time-line text-[0.875rem]"></i>
                    </span>
                    09:30 AM - 06:00 PM
                  </p>
                  <p className="text-[0.875rem] mb-0 flex items-center">
                    <span className="avatar avatar-sm border leading-none avatar-rounded me-2 bg-light text-default border-defaultborder dark:border-defaultborder/10">
                      <i className="bi bi-mortarboard text-[0.875rem]"></i>
                    </span>
                    {job?.education?.name || "Graduate"} and Above
                  </p>
                </div>
                <div className="xxl:col-span-6 xl:col-span-12 md:col-span-6 col-span-12">
                  <p className="text-[0.875rem] mb-4 flex items-center">
                    <span className="avatar avatar-sm border leading-none avatar-rounded me-2 bg-light text-default border-defaultborder dark:border-defaultborder/10">
                      <i className="bi bi-calendar text-[0.875rem]"></i>
                    </span>
                    5 Working Days
                  </p>
                  <p className="text-[0.875rem] mb-0 flex items-center">
                    <span className="avatar avatar-sm border leading-none avatar-rounded me-2 bg-light text-default border-defaultborder dark:border-defaultborder/10">
                      <i className="bi bi-person-check text-[0.875rem]"></i>
                    </span>
                    Bachelors Preferred
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="box border">
            <div className="box-header justify-between">
              <div className="box-title">Contact Information</div>
            </div>
            <div className="box-body">
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-lg text-blue-600" />
                  {job?.address}, {job?.city?.name}, {job?.state?.statename}{" "}
                  {job?.country?.name}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-lg text-blue-600" />
                  {job?.company?.phone || "Phone not available"}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-lg text-blue-600" />
                  {job?.company?.email || "Email not available"}
                </p>
                <p className="flex items-center gap-2">
                  <MdDateRange className="text-lg text-blue-600" />
                  Published: {moment(job?.createdAt).format("DD MMM YYYY")}
                </p>
                {job?.deadline && (
                  <p className="flex items-center gap-2">
                    <MdDateRange className="text-lg text-blue-600" />
                    Deadline: {moment(job?.deadline).format("DD MMM YYYY")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End::row-1 --> */}
    </>
  );
};

export default JobDetails;
