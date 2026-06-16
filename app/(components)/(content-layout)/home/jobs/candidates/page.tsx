// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// type Candidate = {
//   id: string;
//   full_name?: string;
//   title?: string;
//   slug?: string;
//   image_secure_url?: string;
//   city?: { name: string };
//   state?: { name: string };
//   country?: { name: string };
//   createdAt: string;
// };

// export default function CandidatePage() {
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCandidates = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate`,
//       );
//       if (!res.ok) throw new Error("Failed to fetch candidates");
//       const data = await res.json();
//       setCandidates(data.candidates || []);
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCandidates();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-lg animate-pulse">
//           Loading candidates...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );

//   if (candidates.length === 0)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-lg">No candidates found</p>
//       </div>
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-bold text-center mb-10">All Candidates</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {candidates.map((c) => (
//           <Link
//             key={c.id}
//             href={`/home/jobs/candidate-details/${c.slug}`}
//             className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
//           >
//             {c.image_secure_url && (
//               <img
//                 src={c.image_secure_url}
//                 alt={c.full_name}
//                 className="w-full h-48 object-cover"
//               />
//             )}
//             <div className="p-5">
//               <h2 className="text-xl font-semibold">
//                 {c.full_name || "No Name"}
//               </h2>
//               {c.title && <p className="text-gray-600 text-sm">{c.title}</p>}
//               {/* <p className="mt-2 text-gray-800 text-xs">
//                 {c.city?.name} {c.state?.name} {c.country?.name}
//               </p> */}
//               <p className="mt-2 text-gray-800 text-xs">
//                 {[c.city?.name, c.state?.name, c.country?.name]
//                   .filter(Boolean)
//                   .join(", ")}
//               </p>
//               <p className="mt-3 text-gray-800 text-xs">
//                 Joined: {new Date(c.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Briefcase,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Star,
  Filter,
} from "lucide-react";

type Candidate = {
  id: string;
  full_name?: string;
  title?: string;
  slug?: string;
  image_secure_url?: string;
  city?: { name: string };
  state?: { name: string };
  country?: { name: string };
  createdAt: string;
  profile_completion?: boolean;
};

export default function CandidatePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const fetchCandidates = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate`,
      );
      if (!res.ok) throw new Error("Failed to fetch candidates");
      const data = await res.json();
      setCandidates(data.candidates || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Filter and sort candidates
  useEffect(() => {
    let filtered = [...candidates];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.city?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredCandidates(filtered);
    setCurrentPage(1);
  }, [candidates, searchTerm, sortBy]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatLocation = (candidate: Candidate) => {
    const parts = [
      candidate.city?.name,
      candidate.state?.name,
      candidate.country?.name,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Location not specified";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium animate-pulse">
            Loading candidates...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 sticky top-4 z-10">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name, title, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "oldest")
                }
                className="appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>{" "}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold text-blue-600">
              {filteredCandidates.length}
            </span>{" "}
            candidates
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

        {/* Candidates Grid */}
        {currentCandidates.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCandidates.map((c, index) => (
              <Link
                key={c.id}
                href={`/home/jobs/candidate-details/${c.slug}`}
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  {c.image_secure_url ? (
                    <img
                      src={c.image_secure_url}
                      alt={c.full_name || "Candidate"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-20 h-20 text-gray-400" />
                    </div>
                  )}

                  {/* Profile Completion Badge */}
                  {c.profile_completion && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition line-clamp-1">
                    {c.full_name || "Anonymous"}
                  </h2>

                  {c.title && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                      <Briefcase className="w-4 h-4" />
                      <span className="line-clamp-1">{c.title}</span>
                    </div>
                  )}

                  <div className="flex items-start gap-1 text-gray-800 text-xs mb-3">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{formatLocation(c)}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-800 text-xs pt-3 border-t border-gray-100">
                    <Calendar className="w-3 h-3" />
                    <span>
                      Joined {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
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
                  // Show limited page numbers
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

                  // Show dots for gaps
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
        {filteredCandidates.length > 0 && (
          <div className="mt-12 text-center text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredCandidates.length)} of{" "}
            {filteredCandidates.length} candidates
          </div>
        )}
      </div>

      {/* Add these styles to your global CSS or use a CSS-in-JS solution */}
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
