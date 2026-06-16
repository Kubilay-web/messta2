// "use client"
// import SpkSearchcandidate from "@/shared/@spk-reusable-components/apps/spk-searchcandidate";
// import dynamic from 'next/dynamic';
// const SpkSelect = dynamic(() => import("@/shared/@spk-reusable-components/spk-packages/spk-reactselect"), { ssr: false });
// import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
// import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
// import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
// import Pageheader from "@/shared/layouts-components/page-header/pageheader";
// import Seo from "@/shared/layouts-components/seo/seo";
// import Link from "next/link";
// import React, { FC, Fragment, useState, useEffect } from "react";
// import Slider, { SliderThumb } from "@mui/material/Slider";
// import { styled } from "@mui/material/styles";

// interface SearchCandidateProps { }

// interface FilterOptions {
//   categories: string[];
//   availability: string[];
//   bondAgreement: string[];
//   languages: string[];
//   jobTypes: string[];
//   qualifications: string[];
//   experiences: string[];
//   skills: string[];
//   salaryRange: [number, number];
//   search: string;
//   location: string;
//   sortBy: string;
//   page: number;
//   limit: number;
// }

// interface Category {
//   id: string;
//   name: string;
//   _count?: { Candidate: number };
// }

// interface Skill {
//   id: string;
//   name: string;
//   _count?: { CandidateSkill: number };
// }

// interface Candidate {
//   id: string;
//   user: {
//     id: string;
//     displayName: string;
//     avatarUrl?: string;
//     email?: string;
//   };
//   title?: string;
//   full_name?: string;
//   experience_lable?: string;
//   status: 'available' | 'not_available';
//   city?: {
//     name: string;
//   };
//   country?: {
//     name: string;
//   };
//   CandidateSkill?: {
//     skill: {
//       name: string;
//     };
//   }[];
//   _count?: {
//     CandidateSkill: number;
//   };
// }

// const SearchCandidate: FC<SearchCandidateProps> = () => {
//   const [filters, setFilters] = useState<FilterOptions>({
//     categories: [],
//     availability: [],
//     bondAgreement: [],
//     languages: [],
//     jobTypes: [],
//     qualifications: [],
//     experiences: [],
//     skills: [],
//     salaryRange: [0, 100000],
//     search: '',
//     location: '',
//     sortBy: 'newest',
//     page: 1,
//     limit: 12
//   });

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [totalCandidates, setTotalCandidates] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [locations, setLocations] = useState<string[]>([]);

//   const AirbnbSlider = styled(Slider)(({ theme }) => ({
//     color: '#546dfe',
//     height: 3,
//     padding: '13px 0',
//     '& .MuiSlider-thumb': {
//       height: 27,
//       width: 27,
//       backgroundColor: '#fff',
//       border: '1px solid currentColor',
//       '&:hover': {
//         boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
//       },
//       '& .airbnb-bar': {
//         height: 9,
//         width: 1,
//         backgroundColor: 'currentColor',
//         marginLeft: 1,
//         marginRight: 1,
//       },
//     },
//     '& .MuiSlider-track': {
//       height: 3,
//     },
//     '& .MuiSlider-rail': {
//       color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
//       opacity: theme.palette.mode === 'dark' ? undefined : 1,
//       height: 3,
//     },
//   }));

//   function AirbnbThumbComponent(props: any) {
//     const { children, ...other } = props;
//     return (
//       <SliderThumb {...other}>
//         {children}
//         <span className="airbnb-bar" />
//         <span className="airbnb-bar" />
//         <span className="airbnb-bar" />
//       </SliderThumb>
//     );
//   }

//   // API'den verileri çek
//   useEffect(() => {
//     const fetchFilterOptions = async () => {
//       try {
//         setLoading(true);
        
//         const [categoriesRes, skillsRes, locationsRes] = await Promise.all([

        
//           fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/candidatedata?type=categories`),
//           fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/candidatedata?type=skills`),
//           fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/candidatedata?type=locations`    )
//         ]);

//         if (categoriesRes.ok) setCategories(await categoriesRes.json());
//         if (skillsRes.ok) setSkills(await skillsRes.json());
//         if (locationsRes.ok) setLocations(await locationsRes.json());

//       } catch (error) {
//         console.error('Filter options fetch error:', error);
//       }
//     };

//     fetchFilterOptions();
//   }, []);

//   // Adayları filtrele
//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         setLoading(true);
        
//         const queryParams = new URLSearchParams();
//         Object.entries(filters).forEach(([key, value]) => {
//           if (Array.isArray(value)) {
//             value.forEach(v => queryParams.append(key, v));
//           } else if (typeof value === 'object') {
//             queryParams.append(key, JSON.stringify(value));
//           } else {
//             queryParams.append(key, value.toString());
//           }
//         });

//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/candidates?${queryParams}`);
        
//         if (response.ok) {
//           const data = await response.json();
//           setCandidates(data.candidates);
//           setTotalCandidates(data.totalCount);
//         }
//       } catch (error) {
//         console.error('Candidates fetch error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCandidates();
//   }, [filters]);

//   const handleFilterChange = (filterType: keyof FilterOptions, value: any) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterType]: value,
//       page: 1
//     }));
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Arama tetiklenir
//     setFilters(prev => ({ ...prev }));
//   };

//   const handleSalaryChange = (event: Event, newValue: number | number[]) => {
//     setFilters(prev => ({
//       ...prev,
//       salaryRange: newValue as [number, number],
//       page: 1
//     }));
//   };

//   const handlePageChange = (newPage: number) => {
//     setFilters(prev => ({ ...prev, page: newPage }));
//   };

//   return (
//     <Fragment>
//       <Seo title="Search Candidate" />
//       <Pageheader Heading="Search Candidate" breadcrumbs={['Apps', 'Jobs']} currentpage="Search Candidate" />

//       <div className="grid grid-cols-12 gap-x-6">
//         <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
//           <div className="box custom-box products-navigation-box">
//             <div className="box-body !p-0">
//               {/* Kategoriler Filtresi */}
//               <div className="!p-6 border-b dark:border-defaultborder/10">
//                 <h6 className="font-semibold mb-0">Categories</h6>
//                 <div className="px-2 py-3 pb-0">
//                   {categories.map((category) => (
//                     <div key={category.id} className="form-check !mb-2 font-medium !flex items-center">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={filters.categories.includes(category.id)}
//                         onChange={() => handleFilterChange('categories', 
//                           filters.categories.includes(category.id)
//                             ? filters.categories.filter(id => id !== category.id)
//                             : [...filters.categories, category.id]
//                         )}
//                         id={`cat-${category.id}`}
//                       />
//                       <label className="form-check-label" htmlFor={`cat-${category.id}`}>
//                         {category.name}
//                       </label>
//                       <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
//                         {category._count?.Candidate || 0}
//                       </SpkBadge>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Müsaitlik Filtresi */}
//               <div className="p-6 border-b dark:border-defaultborder/10">
//                 <h6 className="font-semibold mb-0">Availability</h6>
//                 <div className="px-2 py-3 pb-0">
//                   {['Immediate', '30 Days', '3 Months'].map((availability, index) => (
//                     <div key={index} className="form-check !mb-2 font-medium !flex items-center">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={filters.availability.includes(availability)}
//                         onChange={() => handleFilterChange('availability', 
//                           filters.availability.includes(availability)
//                             ? filters.availability.filter(a => a !== availability)
//                             : [...filters.availability, availability]
//                         )}
//                         id={`available-${index}`}
//                       />
//                       <label className="form-check-label" htmlFor={`available-${index}`}>
//                         {availability}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Maaş Aralığı Filtresi */}
//               <div className="p-6 border-b dark:border-defaultborder/10">
//                 <h6 className="font-semibold mb-0">Salary Range ($)</h6>
//                 <div className="px-2 py-3 pb-0">
//                   <AirbnbSlider
//                     slots={{ thumb: AirbnbThumbComponent }}
//                     value={filters.salaryRange}
//                     onChange={handleSalaryChange}
//                     valueLabelDisplay="auto"
//                     min={0}
//                     max={100000}
//                     valueLabelFormat={(value) => value.toLocaleString()}
//                   />
//                   <div className="flex justify-between mt-2">
//                     <span>${filters.salaryRange[0].toLocaleString()}</span>
//                     <span>${filters.salaryRange[1].toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Beceriler Filtresi */}
//               <div className="p-6">
//                 <h6 className="font-semibold mb-0">Skills</h6>
//                 <div className="px-2 py-3 pb-0">
//                   {skills.map((skill) => (
//                     <div key={skill.id} className="form-check !mb-2 font-medium !flex items-center">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={filters.skills.includes(skill.id)}
//                         onChange={() => handleFilterChange('skills', 
//                           filters.skills.includes(skill.id)
//                             ? filters.skills.filter(id => id !== skill.id)
//                             : [...filters.skills, skill.id]
//                         )}
//                         id={`skill-${skill.id}`}
//                       />
//                       <label className="form-check-label" htmlFor={`skill-${skill.id}`}>
//                         {skill.name}
//                       </label>
//                       <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
//                         {skill._count?.CandidateSkill || 0}
//                       </SpkBadge>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
//           {/* Arama Bölümü */}
//           <div className="grid grid-cols-12 gap-x-6 items-center mb-6">
//             <div className="lg:col-span-12 col-span-12">
//               <form onSubmit={handleSearch} className="inline-flex !w-full companies-search-input mb-6 !flex-wrap">
//                 <input
//                   type="text"
//                   className="form-control !w-auto flex-grow !rounded-e-none"
//                   placeholder="Enter your keyword here"
//                   value={filters.search}
//                   onChange={(e) => handleFilterChange('search', e.target.value)}
//                 />
//                 <select
//                   className="form-control !w-auto flex-grow !rounded-none"
//                   value={filters.location}
//                   onChange={(e) => handleFilterChange('location', e.target.value)}
//                 >
//                   <option value="">All Locations</option>
//                   {locations.map((location, index) => (
//                     <option key={index} value={location}>{location}</option>
//                   ))}
//                 </select>
//                 <SpkButton
//                   buttontype="submit"
//                   variant="primary"
//                   customClass="ti-btn btn-wave ti-btn-primary !m-0 !rounded-s-none"
//                 >
//                   <i className="ri-search-line"></i>
//                 </SpkButton>
//               </form>
//             </div>

//             {/* Sonuç Sayısı ve Sıralama */}
//             <div className="lg:col-span-12 col-span-12">
//               <div className="box custom-box">
//                 <div className="box-body">
//                   <div className="sm:flex items-center">
//                     <h5 className="font-semibold mb-0 flex-grow">
//                       {totalCandidates}
//                       <span className="font-normal text-[1.125rem] ms-1 inline-block">
//                         Candidates match your job search
//                       </span>
//                     </h5>
//                     <SpkDropdown
//                       Customclass="btn-group"
//                       CustomToggleclass="ti-btn btn-wave ti-btn-light border dropdown-toggle waves-effect waves-light"
//                       Toggletext={`Sort By: ${filters.sortBy}`}
//                       Icon={true}
//                       IconClass="ti ti-chevron-down"
//                     >
//                       {['Premium', 'Newest', 'Most Relevant', 'Fresher', 'Experienced'].map((sortOption) => (
//                         <li key={sortOption}>
//                           <button
//                             className="ti-dropdown-item"
//                             onClick={() => handleFilterChange('sortBy', sortOption.toLowerCase())}
//                           >
//                             {sortOption}
//                           </button>
//                         </li>
//                       ))}
//                     </SpkDropdown>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Aday Listesi */}
//           <div className="grid grid-cols-12 gap-x-6">
//             {loading ? (
//               <div className="col-span-12 text-center py-10">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//                 <p className="mt-2">Loading candidates...</p>
//               </div>
//             ) : candidates.length === 0 ? (
//               <div className="col-span-12 text-center py-10">
//                 <p>No candidates found matching your criteria.</p>
//               </div>
//             ) : (
//               candidates.map((candidate) => (
//                 <div className="xl:col-span-6 col-span-12" key={candidate.id}>
//                   <div className="box custom-box">
//                     <div className="box-body">
//                       <div className="flex items-center">
//                         <div className="me-4">
//                           <span className="avatar avatar-rounded avatar-lg">
//                             <img
//                               src={candidate.user.avatarUrl || '/assets/images/faces/1.jpg'}
//                               alt=""
//                             />
//                           </span>
//                         </div>
//                         <div className="flex-grow">
//                           <h6 className="font-semibold mb-0">{candidate.user.displayName}</h6>
//                           <p className="text-[#8c9097] dark:text-white/50 mb-1 text-[0.75rem]">
//                             {candidate.title}
//                           </p>
//                           <p className="text-[0.75rem] mb-0">
//                             <i className="ri-map-pin-line me-1 align-middle"></i>
//                             {candidate.city?.name}, {candidate.country?.name}
//                           </p>
//                         </div>
//                         <div className="flex-shrink-0">
//                           <SpkButton
//                             variant={candidate.status === 'available' ? 'primary' : 'light'}
//                             size="sm"
//                           >
//                             {candidate.status === 'available' ? 'Available' : 'Not Available'}
//                           </SpkButton>
//                         </div>
//                       </div>
//                       <div className="mt-4">
//                         <div className="flex flex-wrap gap-1">
//                           {candidate.CandidateSkill?.slice(0, 4).map((skill, index) => (
//                             <SpkBadge key={index} variant="light" customClass="text-default">
//                               {skill.skill.name}
//                             </SpkBadge>
//                           ))}
//                           {candidate.CandidateSkill && candidate.CandidateSkill.length > 4 && (
//                             <SpkBadge variant="light" customClass="text-default">
//                               +{candidate.CandidateSkill.length - 4} more
//                             </SpkBadge>
//                           )}
//                         </div>
//                       </div>
//                       <div className="mt-4 flex justify-between items-center">
//                         <span className="text-[0.875rem] text-[#8c9097] dark:text-white/50">
//                           {candidate.experience_lable}
//                         </span>
                      
//                         <SpkButton variant="primary" size="sm">
//                           View Profile
//                         </SpkButton>
                   
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Sayfalama */}
//           {totalCandidates > filters.limit && (
//             <nav className="overflow-auto mb-4 float-end !bg-white dark:!bg-bodybg !rounded-md">
//               <ul className="ti-pagination">
//                 <li>
//                   <button
//                     className={`page-link ${filters.page === 1 ? 'disabled' : ''}`}
//                     onClick={() => handlePageChange(filters.page - 1)}
//                     disabled={filters.page === 1}
//                   >
//                     Previous
//                   </button>
//                 </li>
//                 {[...Array(Math.ceil(totalCandidates / filters.limit)).keys()].map((page) => (
//                   <li key={page + 1}>
//                     <button
//                       className={`page-link ${filters.page === page + 1 ? 'active' : ''}`}
//                       onClick={() => handlePageChange(page + 1)}
//                     >
//                       {page + 1}
//                     </button>
//                   </li>
//                 ))}
//                 <li>
//                   <button
//                     className={`page-link ${filters.page >= Math.ceil(totalCandidates / filters.limit) ? 'disabled' : ''}`}
//                     onClick={() => handlePageChange(filters.page + 1)}
//                     disabled={filters.page >= Math.ceil(totalCandidates / filters.limit)}
//                   >
//                     Next
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           )}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default SearchCandidate;













"use client"
import SpkSearchcandidate from "@/shared/@spk-reusable-components/apps/spk-searchcandidate";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() => import("@/shared/@spk-reusable-components/spk-packages/spk-reactselect"), { ssr: false });
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { FC, Fragment, useState, useEffect } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface SearchCandidateProps { }

interface FilterOptions {
  categories: string[];
  availability: string[];
  bondAgreement: string[];
  languages: string[];
  jobTypes: string[];
  qualifications: string[];
  experiences: string[];
  skills: string[];
  salaryRange: [number, number];
  search: string;
  location: string;
  sortBy: string;
  page: number;
  limit: number;
}

interface Category {
  id: string;
  name: string;
  _count?: { Candidate: number };
}

interface Skill {
  id: string;
  name: string;
  _count?: { CandidateSkill: number };
}

interface Candidate {
  id: string;
  slug?: string;
  user: {
    id: string;
    displayName: string;
    avatarUrl?: string;
    email?: string;
  };
  title?: string;
  full_name?: string;
  experience_lable?: string;
  status: 'available' | 'not_available';
  city?: {
    name: string;
  };
  country?: {
    name: string;
  };
  CandidateSkill?: {
    skill: {
      name: string;
    };
  }[];
  _count?: {
    CandidateSkill: number;
  };
}

const SearchCandidate: FC<SearchCandidateProps> = () => {
  const router = useRouter();
  
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    availability: [],
    bondAgreement: [],
    languages: [],
    jobTypes: [],
    qualifications: [],
    experiences: [],
    skills: [],
    salaryRange: [0, 100000],
    search: '',
    location: '',
    sortBy: 'newest',
    page: 1,
    limit: 12
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);

  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#546dfe',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
      '& .airbnb-bar': {
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    '& .MuiSlider-track': {
      height: 3,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
      opacity: theme.palette.mode === 'dark' ? undefined : 1,
      height: 3,
    },
  }));

  function AirbnbThumbComponent(props: any) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    );
  }

  // API'den verileri çek
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        
        const [categoriesRes, skillsRes, locationsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/candidatedata?type=categories`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/candidatedata?type=skills`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/candidatedata?type=locations`)
        ]);

        if (categoriesRes.ok) setCategories(await categoriesRes.json());
        if (skillsRes.ok) setSkills(await skillsRes.json());
        if (locationsRes.ok) setLocations(await locationsRes.json());

      } catch (error) {
        console.error('Filter options fetch error:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Adayları filtrele
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else if (typeof value === 'object') {
            queryParams.append(key, JSON.stringify(value));
          } else {
            queryParams.append(key, value.toString());
          }
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/candidates?${queryParams}`);
        
        if (response.ok) {
          const data = await response.json();
          setCandidates(data.candidates);
          setTotalCandidates(data.totalCount);
        }
      } catch (error) {
        console.error('Candidates fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [filters]);

  const handleFilterChange = (filterType: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
      page: 1
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev }));
  };

  const handleSalaryChange = (event: Event, newValue: number | number[]) => {
    setFilters(prev => ({
      ...prev,
      salaryRange: newValue as [number, number],
      page: 1
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleViewProfile = (slug: string) => {
    router.push(`/home/jobs/candidate-details/${slug}`);
  };

  return (
    <Fragment>
      <Seo title="Search Candidate" />
      <Pageheader Heading="Search Candidate" breadcrumbs={['Apps', 'Jobs']} currentpage="Search Candidate" />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
          <div className="box custom-box products-navigation-box">
            <div className="box-body !p-0">
              {/* Kategoriler Filtresi */}
              <div className="!p-6 border-b dark:border-defaultborder/10">
                <h6 className="font-semibold mb-0">Categories</h6>
                <div className="px-2 py-3 pb-0">
                  {categories.map((category) => (
                    <div key={category.id} className="form-check !mb-2 font-medium !flex items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={filters.categories.includes(category.id)}
                        onChange={() => handleFilterChange('categories', 
                          filters.categories.includes(category.id)
                            ? filters.categories.filter(id => id !== category.id)
                            : [...filters.categories, category.id]
                        )}
                        id={`cat-${category.id}`}
                      />
                      <label className="form-check-label" htmlFor={`cat-${category.id}`}>
                        {category.name}
                      </label>
                      <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
                        {category._count?.Candidate || 0}
                      </SpkBadge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Müsaitlik Filtresi */}
              <div className="p-6 border-b dark:border-defaultborder/10">
                <h6 className="font-semibold mb-0">Availability</h6>
                <div className="px-2 py-3 pb-0">
                  {['Immediate', '30 Days', '3 Months'].map((availability, index) => (
                    <div key={index} className="form-check !mb-2 font-medium !flex items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={filters.availability.includes(availability)}
                        onChange={() => handleFilterChange('availability', 
                          filters.availability.includes(availability)
                            ? filters.availability.filter(a => a !== availability)
                            : [...filters.availability, availability]
                        )}
                        id={`available-${index}`}
                      />
                      <label className="form-check-label" htmlFor={`available-${index}`}>
                        {availability}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maaş Aralığı Filtresi */}
              <div className="p-6 border-b dark:border-defaultborder/10">
                <h6 className="font-semibold mb-0">Salary Range ($)</h6>
                <div className="px-2 py-3 pb-0">
                  <AirbnbSlider
                    slots={{ thumb: AirbnbThumbComponent }}
                    value={filters.salaryRange}
                    onChange={handleSalaryChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    valueLabelFormat={(value) => value.toLocaleString()}
                  />
                  <div className="flex justify-between mt-2">
                    <span>${filters.salaryRange[0].toLocaleString()}</span>
                    <span>${filters.salaryRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Beceriler Filtresi */}
              <div className="p-6">
                <h6 className="font-semibold mb-0">Skills</h6>
                <div className="px-2 py-3 pb-0">
                  {skills.map((skill) => (
                    <div key={skill.id} className="form-check !mb-2 font-medium !flex items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={filters.skills.includes(skill.id)}
                        onChange={() => handleFilterChange('skills', 
                          filters.skills.includes(skill.id)
                            ? filters.skills.filter(id => id !== skill.id)
                            : [...filters.skills, skill.id]
                        )}
                        id={`skill-${skill.id}`}
                      />
                      <label className="form-check-label" htmlFor={`skill-${skill.id}`}>
                        {skill.name}
                      </label>
                      <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
                        {skill._count?.CandidateSkill || 0}
                      </SpkBadge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
          {/* Arama Bölümü */}
          <div className="grid grid-cols-12 gap-x-6 items-center mb-6">
            <div className="lg:col-span-12 col-span-12">
              <form onSubmit={handleSearch} className="inline-flex !w-full companies-search-input mb-6 !flex-wrap">
                <input
                  type="text"
                  className="form-control !w-auto flex-grow !rounded-e-none"
                  placeholder="Enter your keyword here"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                <select
                  className="form-control !w-auto flex-grow !rounded-none"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
                <SpkButton
                  buttontype="submit"
                  variant="primary"
                  customClass="ti-btn btn-wave ti-btn-primary !m-0 !rounded-s-none"
                >
                  <i className="ri-search-line"></i>
                </SpkButton>
              </form>
            </div>

            {/* Sonuç Sayısı ve Sıralama */}
            <div className="lg:col-span-12 col-span-12">
              <div className="box custom-box">
                <div className="box-body">
                  <div className="sm:flex items-center">
                    <h5 className="font-semibold mb-0 flex-grow">
                      {totalCandidates}
                      <span className="font-normal text-[1.125rem] ms-1 inline-block">
                        Candidates match your job search
                      </span>
                    </h5>
                    <SpkDropdown
                      Customclass="btn-group"
                      CustomToggleclass="ti-btn btn-wave ti-btn-light border dropdown-toggle waves-effect waves-light"
                      Toggletext={`Sort By: ${filters.sortBy}`}
                      Icon={true}
                      IconClass="ti ti-chevron-down"
                    >
                      {['Premium', 'Newest', 'Most Relevant', 'Fresher', 'Experienced'].map((sortOption) => (
                        <li key={sortOption}>
                          <button
                            className="ti-dropdown-item"
                            onClick={() => handleFilterChange('sortBy', sortOption.toLowerCase())}
                          >
                            {sortOption}
                          </button>
                        </li>
                      ))}
                    </SpkDropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aday Listesi */}
          <div className="grid grid-cols-12 gap-x-6">
            {loading ? (
              <div className="col-span-12 text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2">Loading candidates...</p>
              </div>
            ) : candidates.length === 0 ? (
              <div className="col-span-12 text-center py-10">
                <p>No candidates found matching your criteria.</p>
              </div>
            ) : (
              candidates.map((candidate) => (
                <div 
                  className="xl:col-span-6 col-span-12 cursor-pointer" 
                  key={candidate.id}
                  onClick={() => handleViewProfile(candidate.slug || candidate.id)}
                >
                  <div className="box custom-box hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="box-body">
                      <div className="flex items-center">
                        <div className="me-4">
                          <span className="avatar avatar-rounded avatar-lg">
                            <img
                              src={candidate.user.avatarUrl || '/assets/images/faces/1.jpg'}
                              alt={candidate.user.displayName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          </span>
                        </div>
                        <div className="flex-grow">
                          <h6 className="font-semibold mb-0 hover:text-primary transition-colors">
                            {candidate.user.displayName || candidate.full_name}
                          </h6>
                          <p className="text-[#8c9097] dark:text-white/50 mb-1 text-[0.75rem]">
                            {candidate.title}
                          </p>
                          <p className="text-[0.75rem] mb-0">
                            <i className="ri-map-pin-line me-1 align-middle"></i>
                            {candidate.city?.name}, {candidate.country?.name}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <SpkButton
                            variant={candidate.status === 'available' ? 'primary' : 'light'}
                            size="sm"
                            customClass="cursor-default"
                          >
                            {candidate.status === 'available' ? 'Available' : 'Not Available'}
                          </SpkButton>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1">
                          {candidate.CandidateSkill?.slice(0, 4).map((skill, index) => (
                            <SpkBadge key={index} variant="light" customClass="text-default">
                              {skill.skill.name}
                            </SpkBadge>
                          ))}
                          {candidate.CandidateSkill && candidate.CandidateSkill.length > 4 && (
                            <SpkBadge variant="light" customClass="text-default">
                              +{candidate.CandidateSkill.length - 4} more
                            </SpkBadge>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-[0.875rem] text-[#8c9097] dark:text-white/50">
                          {candidate.experience_lable || "Experience not specified"}
                        </span>
                        <SpkButton 
                          variant="primary" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProfile(candidate.slug || candidate.id);
                          }}
                        >
                          View Profile
                        </SpkButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sayfalama */}
          {totalCandidates > filters.limit && (
            <nav className="overflow-auto mb-4 float-end !bg-white dark:!bg-bodybg !rounded-md mt-6">
              <ul className="ti-pagination">
                <li>
                  <button
                    className={`page-link ${filters.page === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(Math.ceil(totalCandidates / filters.limit)).keys()].map((page) => (
                  <li key={page + 1}>
                    <button
                      className={`page-link ${filters.page === page + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className={`page-link ${filters.page >= Math.ceil(totalCandidates / filters.limit) ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page >= Math.ceil(totalCandidates / filters.limit)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchCandidate;