// "use client"
// import PrelineScript from '@/app/PrelineScript';
// import Backtotop from '@/shared/layouts-components/backtotop/backtotop';
// import Landingfooter from '@/shared/layouts-components/landingfooter.tsx/landingfooter';
// import Landingsidebar from '@/shared/layouts-components/landingsidebar/landingsidebar';
// import LandingSwitcher from '@/shared/layouts-components/switcher/landing-switcher';
// import store from '@/shared/redux/store';
// import React, { Fragment, useEffect, useRef, useState } from 'react'
// import { ThemeChanger } from "@/shared/redux/action";
// import { connect } from "react-redux";
// import Landingheader from '@/shared/layouts-components/landingheader/landingheader';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// const Layout = ({ children, ThemeChanger ,local_varaiable}: any) => {
//   const Currentpath = usePathname();
//   const pathName = usePathname()
//   const [lateLoad, setlateLoad] = useState(false)


//   useEffect(() => {
//     setlateLoad(true);
//     const theme = store.getState().reducer;
//     ThemeChanger({
//       ...theme,
//       dataNavLayout: "horizontal",
//       dataNavStyle: Currentpath.includes("/landing") || Currentpath.includes("/classified-details") ? "menu-hover" : "menu-hover",
//       dataHeaderStyles: "",
//       dataVerticalStyle: "",
//       body: Currentpath.includes("/single-landing") ? "bg-white dark:!bg-bodybg" : "landing-body ecommerce-landing classified-landing",


//     });

//     return () => {

//       ThemeChanger({
//         ...theme,
//         dataNavStyle: "",
//         dataVerticalStyle: "",
//         dataHeaderStyles: "",
//         dataNavLayout: `${localStorage.mamixlayout == "horizontal" ? "horizontal" : "vertical"
//           }`,
//         body: local_varaiable.body ? local_varaiable.body : "",



//       });
//     };
//   }, []);
//   return (
//     <Fragment>
//       <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
//         <LandingSwitcher />
//         <div className="landing-page-wrapper">
//           {pathName.includes("/domain/domain-details/") || pathName.includes("/domain/landing/") || pathName.includes("/market-place/landing/") || pathName.includes("/real-estate/landing/") ||
//             pathName.includes("/real-estate/search/") ? (
//             <div className="alert alert-warning alert-dismissible text-default fade show !mb-0 text-center lg:block hidden" role="alert" id="dismiss-alert1">
//               <div className="container text-dark">
//                 Get the 20% discount by using the coupon code <strong className="text-warning">3452 *** ***</strong>.
//                 <u>Signup to your account</u>
//                 <Link scroll={false} href="#!" className="ti-btn ti-btn-danger ti-btn-w-md ms-4">Grab it now</Link>
//                 <div className="ms-auto">
//                   <div className=""> <button type="button" className="inline-flex  rounded-sm  text-warning focus:outline-none focus:ring-0 focus:ring-offset-0 absolute top-0 end-0 p-[0.95rem]" data-hs-remove-element="#dismiss-alert1"> <span className="sr-only">Dismiss</span> <svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                     <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"></path>
//                   </svg> </button> </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             ""
//           )}
//           <Landingheader />
//           <Landingsidebar />
//           <div className="main-content landing-main ecommerce-main">
//             {children}
//           </div>
//           <Landingfooter />
//         </div>
//         <Backtotop />
//       </div>
//       <PrelineScript />
//     </Fragment>
//   )
// }

// const mapStateToProps = (state: any) => ({
//   local_varaiable: state.reducer
// });


// export default connect(mapStateToProps, { ThemeChanger })(Layout);






"use client"
import Footer from '@/shared/layouts-components/footer/footer';
import Header from '@/shared/layouts-components/header/header';
import Sidebar from '@/shared/layouts-components/sidebar/sidebar';
import SidebarNew from '@/shared/layouts-components/sidebarnew/layouts/sidebar/page';
import Switcher from '@/shared/layouts-components/switcher/switcher';
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux"
import { ThemeChanger } from "@/shared/redux/action"
import Backtotop from '@/shared/layouts-components/backtotop/backtotop';
import Loader from '@/shared/layouts-components/loader/loader';
import PrelineScript from "@/app/PrelineScript"

const Layout = ({ children, }: any) => {
    const [lateLoad, setlateLoad] = useState(false);
    useEffect(() => {
        setlateLoad(true);
    });
    return (
        <Fragment>
            <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
                <Switcher />
                <Loader />
                <div className='page'>
                    <Header />
                      <Sidebar />  
                    <div className='content main-index'>
                  
                        <div className='main-content'>
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
                <Backtotop />
            </div>
            <PrelineScript/>
        </Fragment>
    )

}

const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
});

export default connect(mapStateToProps, { ThemeChanger })(Layout);

