// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// interface Company {
//   id: string;
//   name: string;
//   slug: string;
//   logoSecureUrl: string;
//   bannerSecureUrl: string;
//   city?: { name: string };
//   country?: { name: string };
//   industryType?: { name: string };
//   teamType?: { name: string };
//   isProfileVerified: boolean;
//   totalViews: number;
// }

// export default function Page() {
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company`);
//         if (!res.ok) throw new Error("Failed to fetch companies");
//         const data = await res.json();
//         setCompanies(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
//         Companies
//       </h1>

//       {loading ? (
//         <p className="text-gray-700 dark:text-gray-300">Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {companies.map((company) => (
//             <div
//               key={company.id}
//               className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col"
//             >
//               {/* Banner */}
//               {/* <div className="relative w-full h-32">
//                 <Image
//                   src={
//                     company.bannerSecureUrl ||
//                     "/assets/images/company-banners/default-banner.png"
//                   }
//                   alt={company.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div> */}

//               <div className="p-4 flex flex-col flex-grow">
//                 <div className="flex items-center gap-4">
//                   {/* Logo */}
//                   <div className="w-16 h-16 relative flex-shrink-0 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
//                     <Image
//                       src={
//                         company.logoSecureUrl ||
//                         "/assets/images/company-logos/default-company.png"
//                       }
//                       alt={company.name}
//                       fill
//                       className="object-cover h-12"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <Link
//                       href={`/company/${company.slug}`}
//                       className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
//                     >
//                       {company.name}
//                       {company.isProfileVerified && (
//                         <span
//                           title="Verified Company"
//                           className="ml-1 text-blue-500"
//                         >
//                           ✔
//                         </span>
//                       )}
//                     </Link>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {company.city?.name || "Unknown city"},{" "}
//                       {company.country?.name || "Unknown country"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
//                   <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded-full">
//                     {company.industryType?.name || "N/A"}
//                   </span>
//                   <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
//                     {company.teamType?.name || "Team size N/A"}
//                   </span>
//                   <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
//                     Views: {company.totalViews || 0}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
//                 <Link
//                   href={`/apps/jobs/company/${company.slug}`}
//                   className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-md"
//                 >
//                   View Profile
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Briefcase,
  Users,
  Eye,
  CheckCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  slug: string;
  logoSecureUrl: string;
  bannerSecureUrl: string;
  city?: { name: string };
  country?: { name: string };
  industryType?: { name: string };
  teamType?: { name: string };
  isProfileVerified: boolean;
  totalViews: number;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [industries, setIndustries] = useState<string[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company`,
      );
      if (!res.ok) throw new Error("Failed to fetch companies");
      const data = await res.json();
      setCompanies(data);

      // Extract unique industries for filter
      const uniqueIndustries = [
        ...new Set(
          data.map((c: Company) => c.industryType?.name).filter(Boolean),
        ),
      ];
      setIndustries(uniqueIndustries as string[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter companies based on search and industry
  useEffect(() => {
    let filtered = [...companies];

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.city?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.industryType?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedIndustry !== "all") {
      filtered = filtered.filter(
        (c) => c.industryType?.name === selectedIndustry,
      );
    }

    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedIndustry, companies]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium animate-pulse">
            Loading companies...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Companies</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Discover amazing companies and find your dream job
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 sticky top-4 z-10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by company name, location, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Industry Filter */}
            <div className="relative min-w-[200px]">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer appearance-none"
              >
                <option value="all">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <TrendingUp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold text-blue-600">
              {filteredCompanies.length}
            </span>{" "}
            companies
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Companies Grid */}
        {currentCompanies.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No companies found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCompanies.map((company, index) => (
              <div
                key={company.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Banner */}
                <div className="relative h-24 bg-gradient-to-r from-blue-400 to-purple-500">
                  {company.bannerSecureUrl && (
                    <Image
                      src={company.bannerSecureUrl}
                      alt={company.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Verified Badge */}
                  {company.isProfileVerified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                <div className="relative px-6 pb-6">
                  {/* Logo */}
                  <div className="relative -mt-12 mb-4">
                    <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-white">
                      <Image
                        src={
                          company.logoSecureUrl ||
                          "/assets/images/company-logos/default-company.png"
                        }
                        alt={company.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="text-center mb-4">
                    <Link
                      href={`/company/${company.slug}`}
                      className="text-xl font-bold text-gray-800 hover:text-blue-600 transition line-clamp-1"
                    >
                      {company.name}
                    </Link>

                    {/* Location */}
                    {(company.city?.name || company.country?.name) && (
                      <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {company.city?.name && company.city.name}
                          {company.city?.name && company.country?.name && ", "}
                          {company.country?.name && company.country.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {company.industryType?.name && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                        <Briefcase className="w-3 h-3" />
                        {company.industryType.name}
                      </span>
                    )}
                    {company.teamType?.name && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                        <Users className="w-3 h-3" />
                        {company.teamType.name}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                      <Eye className="w-3 h-3" />
                      {company.totalViews || 0} views
                    </span>
                  </div>

                  {/* View Profile Button */}
                  <Link
                    href={`/home/jobs/company/${company.slug}`}
                    className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => {
                  if (
                    number === 1 ||
                    number === totalPages ||
                    (number >= currentPage - 1 && number <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-10 h-10 rounded-lg font-medium transition ${
                          currentPage === number
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                      >
                        {number}
                      </button>
                    );
                  }

                  if (
                    number === currentPage - 2 ||
                    number === currentPage + 2
                  ) {
                    return (
                      <span
                        key={number}
                        className="w-10 h-10 flex items-center justify-center text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }

                  return null;
                },
              )}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}

        {/* Statistics */}
        {filteredCompanies.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredCompanies.length)} of{" "}
            {filteredCompanies.length} companies
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
