// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";

// const ViewBlog = () => {

//     const params = useParams();
//   const id = params?.id as string;
//   const [blog, setBlog] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     fetchBlog();
//   }, [id]);

//   const fetchBlog = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/blog/${id}`);
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Failed to fetch blog");
//       }
//       const data = await res.json();
//       setBlog(data.blog);
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-lg animate-pulse">Loading blog...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );

//   if (!blog)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-lg">Blog not found</p>
//       </div>
//     );

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         {blog.image && (
//           <div className="relative w-full h-64 md:h-96">
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}
//         <div className="p-8 md:p-12">
//           <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 text-center">
//             {blog.title}
//           </h1>
//           <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
//             {blog.description}
//           </p>
//           <p className="text-gray-400 text-sm text-right">
//             Created at: {new Date(blog.createdAt).toLocaleDateString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewBlog;

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ViewBlog = () => {
  const params = useParams();
  const id = params?.id as string;

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/blog/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Blog yüklenemedi");
      }

      setBlog(data.blog);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 text-red-600 px-6 py-4 rounded-xl shadow">
          {error}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {blog.image && (
            <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[450px] overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          <div className="p-6 sm:p-8 md:p-12">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center leading-tight">
              {blog.title}
            </h1>

            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-8 whitespace-pre-line">
              {blog.description}
            </p>

            <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
              <span className="text-gray-800 text-sm">
                Created At:{" "}
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <Link
                href={"/home/jobs/blog"}
                className="px-5 py-2 rounded-xl bg-black text-white text-sm hover:bg-gray-800 transition"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
