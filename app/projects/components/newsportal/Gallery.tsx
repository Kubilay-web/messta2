// import React from "react";
// import { IoCloseCircle } from "react-icons/io5";
// import { FaImages } from "react-icons/fa";
// import copy from "copy-text-to-clipboard";
// import toast from "react-hot-toast";

// const Gallery = ({ setShow, images }) => {
//   const copy_url = (url) => {
//     copy(url);
//     toast.success("Image url Coiped success");
//   };

//   return (
//     <div className="fixed left-0 top-0 z-[9999] h-screen w-screen">
//       <div className="relative h-full w-full">
//         <div className="absolute left-0 top-0 z-[998] h-full w-full bg-gray-400 opacity-80">
//           {" "}
//         </div>
//         <div className="absolute left-[50%] top-[50%] z-[999] h-[85vh] w-[50%] -translate-x-[50%] -translate-y-[50%] overflow-y-auto rounded-sm bg-white p-3">
//           <div className="flex w-full items-center justify-between pb-3">
//             <h2>Gallery</h2>
//             <div
//               onClick={() => setShow(false)}
//               className="cursor-pointer text-xl"
//             >
//               <IoCloseCircle />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="images"
//               className={`flex h-[180px] w-full cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed text-[#404040]`}
//             >
//               <div className="flex flex-col items-center justify-center gap-y-2">
//                 <span className="text-2xl">
//                   <FaImages />
//                 </span>
//                 <span>Select Image</span>
//               </div>
//             </label>
//           </div>

//           <div className="mt-4 grid grid-cols-4 gap-x-2">
//             {images.length > 0 &&
//               images.map((img, i) => (
//                 <div
//                   className="cursor-pointer"
//                   key={i}
//                   onClick={() => copy_url(img.url)}
//                 >
//                   <img
//                     src={img.url}
//                     alt="images"
//                     className="h-[100px] w-full"
//                   />
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gallery;









import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";

const Gallery = ({ setShow, images = [] }) => { // Default değer olarak [] ver
  const copy_url = (url) => {
    copy(url);
    toast.success("Image url copied successfully");
  };

  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-screen">
      <div className="relative h-full w-full">
        <div className="absolute left-0 top-0 z-[998] h-full w-full bg-gray-400 opacity-80"></div>
        <div className="absolute left-[50%] top-[50%] z-[999] h-[85vh] w-[50%] -translate-x-[50%] -translate-y-[50%] overflow-y-auto rounded-sm bg-white p-3">
          <div className="flex w-full items-center justify-between pb-3">
            <h2 className="text-lg font-semibold">Gallery</h2>
            <div
              onClick={() => setShow(false)}
              className="cursor-pointer text-2xl text-gray-600 hover:text-gray-800"
            >
              <IoCloseCircle />
            </div>
          </div>

          <div>
            <label
              htmlFor="images"
              className={`flex h-[180px] w-full cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-gray-400 text-[#404040] hover:border-blue-500 transition`}
            >
              <div className="flex flex-col items-center justify-center gap-y-2">
                <span className="text-2xl">
                  <FaImages />
                </span>
                <span>Select Image</span>
              </div>
            </label>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {images && images.length > 0 ? (
              images.map((img, i) => (
                <div
                  className="cursor-pointer group relative"
                  key={i}
                  onClick={() => copy_url(img.url)}
                >
                  <img
                    src={img.url}
                    alt={`Gallery ${i + 1}`}
                    className="h-[100px] w-full object-cover rounded-md transition group-hover:opacity-80"
                  />
                  <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-50 text-white text-xs text-center py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    Click to copy URL
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No images found. Please upload some images first.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
