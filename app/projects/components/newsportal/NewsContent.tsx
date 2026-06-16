// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import profile from "../../assets/profile.png";
// import Link from "next/link";
// import { FaEye } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
// import { FaTrashAlt } from "react-icons/fa";
// import { IoIosArrowBack } from "react-icons/io";
// import { IoIosArrowForward } from "react-icons/io";
// import axios from "axios";
// import { convert } from "html-to-text";
// import { validateRequest } from "@/app/auth";
// import { UserInfo } from "@/app/queries/user";
// import toast from "react-hot-toast";

// const NewsContent = () => {
//   const [news, setNews] = useState([]);
//   const [all_news, set_all_news] = useState([]);
//   const [user, setUser] = useState(null);

//   const [parPage, setParPage] = useState(5);
//   const [pages, setPages] = useState(0);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const user = await UserInfo();
//       setUser(user);
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (news.length > 0) {
//       const calculate_page = Math.ceil(news.length / parPage);
//       setPages(calculate_page);
//     }
//   }, [news, parPage]);

//   const get_news = async () => {
//     try {
//       const { data } = await axios.get(`/api/news`, {});
//       set_all_news(data.news);
//       setNews(data.news);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     get_news();
//   }, []);

//   const deleteNews = async (newsId) => {
//     if (window.confirm("Are you sure to delete?")) {
//       try {
//         const { data } = await axios.delete(`/api/news/delete/${newsId}`, {});
//         toast.success(data.message);
//         get_news();
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const search_news = (e) => {
//     const tempNews = all_news.filter(
//       (n) => n.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1,
//     );
//     setNews(tempNews);
//     setPage(1);
//     setParPage(5);
//   };

//   const type_filter = (e) => {
//     if (e.target.value === "") {
//       setNews(all_news);
//       setPage(1);
//       setParPage(5);
//     } else {
//       const tempNews = all_news.filter((n) => n.status === e.target.value);
//       setNews(tempNews);
//       setPage(1);
//       setParPage(5);
//     }
//   };

//   const [res, set_res] = useState({
//     id: "",
//     loader: false,
//   });

//   const update_status = async (status, news_id) => {
//     try {
//       set_res({
//         id: news_id,
//         loader: true,
//       });
//       const { data } = await axios.put(`/api/news/status/${news_id}`, {
//         status,
//       });
//       set_res({
//         id: "",
//         loader: false,
//       });
//       toast.success(data.message);
//       get_news();
//     } catch (error) {
//       set_res({
//         id: "",
//         loader: false,
//       });
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mb-6 flex items-center gap-4">
//         <select
//           onChange={type_filter}
//           name="status"
//           className="w-48 rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 appearance-none bg-none"
//         >
//           <option value="">--- Select Status ---</option>
//           <option value="pending">Pending</option>
//           <option value="active">Active</option>
//           <option value="deactive">Deactive</option>
//         </select>
//         <input
//           onChange={search_news}
//           type="text"
//           placeholder="Search News"
//           className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto overflow-hidden rounded-lg bg-white shadow-lg">
//           <thead className="bg-gray-100 text-sm uppercase text-gray-700">
//             <tr>
//               <th className="px-6 py-4 text-left">No</th>
//               <th className="px-6 py-4 text-left">Title</th>
//               <th className="px-6 py-4 text-left">Image</th>
//               <th className="px-6 py-4 text-left">Category</th>
//               <th className="px-6 py-4 text-left">Description</th>
//               <th className="px-6 py-4 text-left">Date</th>
//               <th className="px-6 py-4 text-left">Status</th>
//               <th className="px-6 py-4 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-600">
//             {news.length > 0 &&
//               news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
//                 <tr key={i} className="border-t">
//                   <td className="px-6 py-4">{i + 1}</td>
//                   <td className="px-6 py-4">{n.title.slice(0, 15)}...</td>
//                   <td className="px-6 py-4">
//                     <img
//                       className="h-10 w-10 rounded-full object-cover"
//                       src={n.image}
//                       alt="news"
//                     />
//                   </td>
//                   <td className="px-6 py-4">{n.category}</td>
//                   <td className="px-6 py-4">
//                     {convert(n.description).slice(0, 15)}...
//                   </td>
//                   <td className="px-6 py-4">{n.date}</td>

//                   {user?.role === "ADMIN" ? (
//                     <td className="px-6 py-4">
//                       {n.status === "pending" && (
//                         <span
//                           onClick={() => update_status("active", n.id)}
//                           className="cursor-pointer rounded-md bg-blue-200 px-2 py-[2px] text-xs text-blue-800"
//                         >
//                           {res.loader && res.id === n.id
//                             ? "Loading.."
//                             : n.status}
//                         </span>
//                       )}

//                       {n.status === "active" && (
//                         <span
//                           onClick={() => update_status("deactive", n._id)}
//                           className="cursor-pointer rounded-md bg-green-200 px-2 py-[2px] text-xs text-blue-800"
//                         >
//                           {res.loader && res.id === n._id
//                             ? "Loading.."
//                             : n.status}
//                         </span>
//                       )}
//                       {n.status === "deactive" && (
//                         <span
//                           onClick={() => update_status("active", n._id)}
//                           className="cursor-pointer rounded-md bg-red-200 px-2 py-[2px] text-xs text-red-800"
//                         >
//                           {res.loader && res.id === n._id
//                             ? "Loading.."
//                             : n.status}
//                         </span>
//                       )}
//                     </td>
//                   ) : (
//                     <td className="px-6 py-4">
//                       {n.status === "pending" && (
//                         <span className="rounded-md bg-blue-200 px-2 py-[2px] text-xs text-blue-800">
//                           {n.status}
//                         </span>
//                       )}
//                       {n.status === "active" && (
//                         <span className="rounded-md bg-blue-200 px-2 py-[2px] text-xs text-blue-800">
//                           {n.status}
//                         </span>
//                       )}
//                       {n.status === "deactive" && (
//                         <span className="rounded-md bg-blue-200 px-2 py-[2px] text-xs text-blue-800">
//                           {n.status}
//                         </span>
//                       )}
//                     </td>
//                   )}

//                   <td className="px-6 py-4">
//                     <div className="flex gap-3 text-gray-500">
//                       <Link
//                         href="#"
//                         className="rounded bg-blue-500 p-2 text-white hover:bg-blue-800"
//                       >
//                         <FaEye />
//                       </Link>
//                       {user?.role === "WRITER" && (
//                         <>
//                           <Link
//                             href={`/dashboards/newsportal/editnews/${n.id}`}
//                             className="rounded bg-yellow-500 p-2 text-white hover:bg-yellow-800"
//                           >
//                             <FaEdit />
//                           </Link>
//                         </>
//                       )}

//                       <button
//                         onClick={() => deleteNews(n.id)}
//                         className="rounded bg-red-500 p-2 text-white hover:bg-red-800"
//                       >
//                         <FaTrashAlt />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between py-6">
//         <div className="flex items-center gap-4">
//           <label className="text-sm font-semibold">News Per Page:</label>
//           <select
//             value={parPage}
//             onChange={(e) => {
//               setParPage(parseInt(e.target.value));
//               setPage(1);
//             }}
//             name="category"
//             id="category"
//             className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="15">15</option>
//             <option value="20">20</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-4 text-sm text-gray-600">
//           <span className="font-bold">
//             {" "}
//             {(page - 1) * parPage + 1}/{news.length} - {pages}{" "}
//           </span>
//           <div className="flex gap-2">
//             <IoIosArrowBack
//               onClick={() => {
//                 if (page > 1) setPage(page - 1);
//               }}
//               className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800"
//             />
//             <IoIosArrowForward
//               onClick={() => {
//                 if (page < pages) setPage(page + 1);
//               }}
//               className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsContent;











"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { convert } from "html-to-text";
import toast from "react-hot-toast";
import { useSession } from "@/app/SessionProvider";

interface NewsItem {
  id: string;
  _id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  date: string;
  status: string;
  writerId: string;
}

interface User {
  id: string;
  role: string;
  email?: string;
}

const NewsContent = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [all_news, set_all_news] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [parPage, setParPage] = useState(5);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  const [res, set_res] = useState({
    id: "",
    loader: false,
  });


  // Haberleri getir
  const get_news = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/news");
      set_all_news(data.news);
      setNews(data.news);
    } catch (error) {
      console.error("News fetch error:", error);
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_news();
  }, []);

  // Sayfalama hesapla
  useEffect(() => {
    if (news.length > 0) {
      const calculate_page = Math.ceil(news.length / parPage);
      setPages(calculate_page);
    }
  }, [news, parPage]);

  // Haber sil
  const deleteNews = async (newsId: string) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;

    try {
      const { data } = await axios.delete(`/api/news/delete/${newsId}`);
      toast.success(data.message);
      get_news();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete news");
    }
  };

  // Haber ara
  const search_news = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempNews = all_news.filter(
      (n) => n.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );
    setNews(tempNews);
    setPage(1);
  };

  // Duruma göre filtrele
  const type_filter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setNews(all_news);
    } else {
      const tempNews = all_news.filter((n) => n.status === e.target.value);
      setNews(tempNews);
    }
    setPage(1);
  };

  // Haber durumunu güncelle
  const update_status = async (status: string, news_id: string) => {
    try {
      set_res({ id: news_id, loader: true });
      const { data } = await axios.put(`/api/news/status/${news_id}`, { status });
      set_res({ id: "", loader: false });
      toast.success(data.message);
      get_news();
    } catch (error) {
      set_res({ id: "", loader: false });
      console.error("Status update error:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-b-transparent"></div>
      </div>
    );
  }

  const user =useSession();


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Filtreler */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <select
          onChange={type_filter}
          className="w-full sm:w-48 rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">--- Select Status ---</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>

        <input
          onChange={search_news}
          type="text"
          placeholder="Search News..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Haber Tablosu */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto overflow-hidden rounded-lg bg-white shadow-lg">
          <thead className="bg-gray-100 text-sm uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">No</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {news.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No news found.
                </td>
              </tr>
            ) : (
              news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
                <tr key={n.id || n._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{(page - 1) * parPage + i + 1}</td>
                  <td className="px-6 py-4 max-w-[200px] truncate">{n.title}</td>
                  <td className="px-6 py-4">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={n.image || "/default-news.jpg"}
                      alt="news"
                    />
                  </td>
                  <td className="px-6 py-4">{n.category}</td>
                  <td className="px-6 py-4 max-w-[150px] truncate">
                    {convert(n.description).slice(0, 50)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{n.date}</td>

                  {/* Status - Admin için tıklanabilir */}
                  <td className="px-6 py-4">
                    {user.user.role === "ADMIN" ? (
                      <>
                        {n.status === "pending" && (
                          <button
                            onClick={() => update_status("active", n.id || n._id)}
                            disabled={res.loader && res.id === (n.id || n._id)}
                            className="cursor-pointer rounded-md bg-yellow-200 px-3 py-1 text-xs font-medium text-yellow-800 hover:bg-yellow-300"
                          >
                            {res.loader && res.id === (n.id || n._id) ? "Loading..." : "Pending"}
                          </button>
                        )}
                        {n.status === "active" && (
                          <button
                            onClick={() => update_status("deactive", n.id || n._id)}
                            disabled={res.loader && res.id === (n.id || n._id)}
                            className="cursor-pointer rounded-md bg-green-200 px-3 py-1 text-xs font-medium text-green-800 hover:bg-green-300"
                          >
                            {res.loader && res.id === (n.id || n._id) ? "Loading..." : "Active"}
                          </button>
                        )}
                        {n.status === "deactive" && (
                          <button
                            onClick={() => update_status("active", n.id || n._id)}
                            disabled={res.loader && res.id === (n.id || n._id)}
                            className="cursor-pointer rounded-md bg-red-200 px-3 py-1 text-xs font-medium text-red-800 hover:bg-red-300"
                          >
                            {res.loader && res.id === (n.id || n._id) ? "Loading..." : "Deactive"}
                          </button>
                        )}
                      </>
                    ) : (
                      <span
                        className={`inline-block rounded-md px-3 py-1 text-xs font-medium ${
                          n.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : n.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {n.status}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* <Link
                        href={`/dashboards/newsportal/news/${n.id || n._id}`}
                        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-800 transition"
                      >
                        <FaEye />
                      </Link> */}

                      {/* Edit - Sadece Admin veya haberin sahibi Writer */}
                      {(user.user.role === "ADMIN" || user.user.role === "WRITER") && (
                        <Link
                          href={`/dashboards/newsportal/editnews/${n.id || n._id}`}
                          className="rounded bg-yellow-500 p-2 text-white hover:bg-yellow-800 transition"
                        >
                          <FaEdit />
                        </Link>
                      )}

                      {/* Delete - Sadece Admin veya haberin sahibi Writer */}
                      {(user.user.role === "ADMIN" || user.user.role === "WRITER") && (
                        <button
                          onClick={() => deleteNews(n.id || n._id)}
                          className="rounded bg-red-500 p-2 text-white hover:bg-red-800 transition"
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold">News Per Page:</label>
            <select
              value={parPage}
              onChange={(e) => {
                setParPage(parseInt(e.target.value));
                setPage(1);
              }}
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {(page - 1) * parPage + 1} - {Math.min(page * parPage, news.length)} of {news.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowBack className="h-6 w-6" />
              </button>
              <button
                onClick={() => page < pages && setPage(page + 1)}
                disabled={page === pages}
                className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowForward className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsContent;
