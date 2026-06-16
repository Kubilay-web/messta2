// import HeadLines from "@/app/projects/components/newsportal/Headlines";
// import DetailsNews from "@/app/projects/components/newsportal/news/DetailsNews";
// import DetailsNewsCol from "@/app/projects/components/newsportal/news/DetailsNewsCol";
// import DetailsNewsRow from "@/app/projects/components/newsportal/news/DetailsNewsRow";
// import NewsCard from "@/app/projects/components/newsportal/news/item/NewsCard";
// import SimpleNewsCard from "@/app/projects/components/newsportal/news/item/SimpleNewsCard";
// import LatestNews from "@/app/projects/components/newsportal/news/LatestNews";
// import PopularNews from "@/app/projects/components/newsportal/news/PopularNews";
// import RecentNews from "@/app/projects/components/newsportal/news/RecentNews";
// import Title from "@/app/projects/components/newsportal/Title";

// export const dynamic = "force-dynamic";

// const News = async () => {
//   let news = {};

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/all`,
//       {
//         next: {
//           revalidate: 5,
//         },
//       },
//     );

//     if (!res.ok) {
//       throw new Error("Veri alınamadı.");
//     }

//     const json = await res.json();
//     news = json.news || {};
//   } catch (error) {
//     console.error("Haber verisi alınırken hata:", error);
//   }

//   return (
//     <div>
//       <main>
//         <HeadLines news={news} />
//         <div className="bg-slate-100">
//           <div className="px-4 py-8 md:px-8">
//             <div className="flex flex-wrap">
//               <div className="w-full lg:w-6/12">
//                 <LatestNews />
//               </div>

//               <div className="mt-5 w-full lg:mt-5 lg:w-6/12">
//                 <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
//                   <Title title="Technology" />
//                   <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
//                     {news["Technology"].map((item, i) => {
//                       if (i < 4) {
//                         return <SimpleNewsCard item={item} key={i} />;
//                       }
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <PopularNews type="Popular News" />

//             {/* first Section  */}
//             <div className="w-full">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-8/12">
//                   <DetailsNewsRow
//                     category="Sports"
//                     type="details_news"
//                     news={news["Sports"]}
//                   />

//                   <DetailsNews category="Health" news={news["Health"]} />
//                 </div>

//                 <div className="w-full lg:w-4/12">
//                   <DetailsNewsCol
//                     news={news["Education"]}
//                     category="Education"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* 2nd Section  */}
//             <div className="w-full">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-4/12">
//                   <div className="pl-3">
//                     <DetailsNewsCol
//                       category="Business"
//                       news={news["Business"]}
//                     />
//                   </div>
//                 </div>

//                 <div className="w-full lg:w-8/12">
//                   <div className="pl-3">
//                     <DetailsNewsRow
//                       category="Travel"
//                       type="details_news"
//                       news={news["Travel"]}
//                     />

//                     <DetailsNews
//                       category="International"
//                       news={news["International"]}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 3nd Section  */}
//             <div className="w-full">
//               <div className="flex flex-wrap">
//                 <div className="w-full lg:w-8/12">
//                   <DetailsNewsRow
//                     category="Technology"
//                     news={news["Technology"]}
//                     type="details_news"
//                   />
//                 </div>

//                 <div className="w-full lg:w-4/12">
//                   <div className="pl-3">
//                     <RecentNews />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default News;












import HeadLines from "@/app/projects/components/newsportal/Headlines";
import DetailsNews from "@/app/projects/components/newsportal/news/DetailsNews";
import DetailsNewsCol from "@/app/projects/components/newsportal/news/DetailsNewsCol";
import DetailsNewsRow from "@/app/projects/components/newsportal/news/DetailsNewsRow";
import NewsCard from "@/app/projects/components/newsportal/news/item/NewsCard";
import SimpleNewsCard from "@/app/projects/components/newsportal/news/item/SimpleNewsCard";
import LatestNews from "@/app/projects/components/newsportal/news/LatestNews";
import PopularNews from "@/app/projects/components/newsportal/news/PopularNews";
import RecentNews from "@/app/projects/components/newsportal/news/RecentNews";
import Title from "@/app/projects/components/newsportal/Title";

export const dynamic = "force-dynamic";

// Varsayılan boş nesne yapısı
const defaultNewsStructure = {
  Technology: [],
  Sports: [],
  Health: [],
  Education: [],
  Business: [],
  Travel: [],
  International: [],
  Politics: [],
  Entertainment: [],
  Science: []
};

const News = async () => {
  let newsData = defaultNewsStructure;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/all`,
      {
        next: {
          revalidate: 5,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Veri alınamadı.");
    }

    const json = await res.json();
    // API'den gelen veriyi güvenli bir şekilde birleştir
    newsData = {
      ...defaultNewsStructure,
      ...(json.news || {})
    };
  } catch (error) {
    console.error("Haber verisi alınırken hata:", error);
  }

  // Güvenli erişim için yardımcı fonksiyon
  const getNewsByCategory = (category: string) => {
    return newsData[category as keyof typeof newsData] || [];
  };

  return (
    <div>
      <main>
        <HeadLines news={newsData} />
        <div className="bg-slate-100">
          <div className="px-4 py-8 md:px-8">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <LatestNews />
              </div>

              <div className="mt-5 w-full lg:mt-5 lg:w-6/12">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <Title title="Technology" />
                  <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                    {/* Güvenli map işlemi */}
                    {getNewsByCategory("Technology").slice(0, 4).map((item, i) => (
                      <SimpleNewsCard item={item} key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <PopularNews type="Popular News" />

            {/* first Section  */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <DetailsNewsRow
                    category="Sports"
                    type="details_news"
                    news={getNewsByCategory("Sports")}
                  />

                  <DetailsNews category="Health" news={getNewsByCategory("Health")} />
                </div>

                <div className="w-full lg:w-4/12">
                  <DetailsNewsCol
                    news={getNewsByCategory("Education")}
                    category="Education"
                  />
                </div>
              </div>
            </div>

            {/* 2nd Section  */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12">
                  <div className="pl-3">
                    <DetailsNewsCol
                      category="Business"
                      news={getNewsByCategory("Business")}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-8/12">
                  <div className="pl-3">
                    <DetailsNewsRow
                      category="Travel"
                      type="details_news"
                      news={getNewsByCategory("Travel")}
                    />

                    <DetailsNews
                      category="International"
                      news={getNewsByCategory("International")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd Section  */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <DetailsNewsRow
                    category="Technology"
                    news={getNewsByCategory("Technology")}
                    type="details_news"
                  />
                </div>

                <div className="w-full lg:w-4/12">
                  <div className="pl-3">
                    <RecentNews />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default News;