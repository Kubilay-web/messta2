// import Link from "next/link";
// import React from "react";

// const Category = async ({ titleStyle }) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/category/all`,
//     {
//       next: {
//         revalidate: 5,
//       },
//     },
//   );

//   const { categories } = await res.json();

//   return (
//     <div className="flex w-full flex-col gap-y-[14px]">
//       <div
//         className={`text-xl font-bold ${titleStyle} relative pl-3 before:absolute before:-left-0 before:h-full before:w-[4px] before:bg-[#5271ff]`}
//       >
//         Category
//       </div>

//       <div
//         className={`flex flex-col items-start justify-start gap-y-3 text-sm ${titleStyle} pt-1`}
//       >
//         {categories &&
//           categories.length > 0 &&
//           categories.map((item, i) => (
//             <li className="list-none font-semibold" key={i}>
//               <Link href={`/news/category/${item.category}`}>
//                 {" "}
//                 {item.category} ({item.count})
//               </Link>
//             </li>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Category;






import Link from "next/link";
import React from "react";

// Tip tanımlaması
interface Category {
  name: string;
  slug: string;
  count: number;
}

const Category = async ({ titleStyle }: { titleStyle?: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/category/all`,
    {
      next: {
        revalidate: 5,
      },
    },
  );

  const { categories } = await res.json();

  return (
    <div className="flex w-full flex-col gap-y-[14px]">
      <div
        className={`text-xl font-bold ${titleStyle} relative pl-3 before:absolute before:-left-0 before:h-full before:w-[4px] before:bg-[#5271ff]`}
      >
        Category
      </div>

      <div
        className={`flex flex-col items-start justify-start gap-y-3 text-sm ${titleStyle} pt-1`}
      >
        {categories && categories.length > 0 ? (
          categories.map((item: Category, i: number) => (
            <li className="list-none font-semibold" key={i}>
              <Link href={`/news/category/${item.slug}`}>
                {item.name} ({item.count})
              </Link>
            </li>
          ))
        ) : (
          <li className="list-none text-gray-500">No categories found</li>
        )}
      </div>
    </div>
  );
};

export default Category;