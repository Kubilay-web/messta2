"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { FaIndustry, FaPhone, FaAddressCard } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { RiTeamLine } from "react-icons/ri";
import moment from "moment";
import JobsCard from "@/app/projects/components/jobportal/jobs/Card";

export default function CompanyViewPage() {
  const params = useParams();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [company, setCompany] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // GET company
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/${params.slug}`,
          { method: "GET", next: { revalidate: 1 } }
        );
        if (!res.ok) throw new Error("Failed to fetch company");
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCompany(false);
      }
    };
    if (params?.slug) fetchCompany();
  }, [params?.slug]);

  // GET jobs
  useEffect(() => {
    const fetchJobs = async () => {
      if (!company?.id) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/companyjob`, {
          method: "POST",
          next: { revalidate: 1 },
          body: JSON.stringify({ id: company.id }),
        });
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, [company?.id]);

  const scrollToSection = () => sectionRef.current?.scrollIntoView({ behavior: "smooth" });

  if (loadingCompany) return <div className="text-center py-20">Loading company info...</div>;
  if (!company) return <div className="text-center py-20">Company not found.</div>;

  return (
    <div className="w-full">
      {/* Banner */}
      <div
        className="relative h-64 md:h-96 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${company.bannerSecureUrl || '/assets/images/jobportal/dee.jpg'})` }}
      >
        <div className="absolute top-4 left-4 text-white text-sm md:text-base bg-black/40 px-3 py-1 rounded">
          Home &gt; Company &gt; {company.name}
        </div>
      </div>

      {/* Company Header */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto -mt-16 px-4 md:px-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <img
              src={company.logoSecureUrl || '/assets/images/company-logos/default-company.png'}
              alt={company.name}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{company.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">{company.city?.name}, {company.country?.name}</p>
        </div>
        <button
          onClick={scrollToSection}
          className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 hover:bg-green-700 text-white rounded-md transition"
        >
          Open Positions
        </button>
      </div>

      <div className="border-t border-green-600 my-8 max-w-6xl mx-auto"></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="lg:w-2/3 space-y-6">
          {/* About */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">About Us</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{company.bio}</p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Company Vision</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{company.vision}</p>
          </div>

          {/* Jobs */}
          <div ref={sectionRef} className="space-y-4">
            {loadingJobs ? (
              <p className="text-center py-10">Loading jobs...</p>
            ) : jobs.length > 0 ? (
              jobs.map((job, i) => <JobsCard key={i} jobs={job} />)
            ) : (
              <p className="text-center py-10">No jobs found.</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-1/3 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-3">
            <h3 className="text-xl font-bold">{company.name}</h3>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MdLocationOn className="text-blue-600" /> {company.country?.name}
            </p>

            {company.mapLink && (
              <iframe
                src={company.mapLink}
                className="w-full h-72 rounded-lg border-0"
                loading="lazy"
                allowFullScreen
              />
            )}

            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FaIndustry className="text-blue-600" /> Industry: {company.industryType?.name}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <CgOrganisation className="text-blue-600" /> Org Type: {company.organizationType?.name}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FaAddressCard className="text-blue-600" /> Established: {moment(company.establishmentDate).format("MMMM D, YYYY")}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <RiTeamLine className="text-blue-600" /> Size: {company.teamType?.name} employees
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FaAddressCard className="text-blue-600" /> Address: {company.address}, {company.state?.statename}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FaPhone className="text-blue-600" /> Phone: {company.phone}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MdEmail className="text-blue-600" /> Email: {company.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
