"use client"
import SpkJobdetails from "@/shared/@spk-reusable-components/apps/spk-jobdetails";
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useSearchParams, useRouter } from "next/navigation";

// Filtreleme için interface'ler
interface FilterOptions {
  categories: string[];
  jobTypes: string[];
  salaryRange: [number, number];
  qualifications: string[];
  experiences: string[];
  skills: string[];
  sortBy: string;
  search: string;
  page: number;
  limit: number;
}

interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo: string;
  };
  job_category: {
    id: string;
    name: string;
  };
  job_type: {
    id: string;
    name: string;
  };
  min_salary: number;
  max_salary: number;
  city: {
    id: string;
    name: string;
  };
  state: {
    id: string;
    name: string;
  };
  country: {
    id: string;
    name: string;
  };
  featured: boolean;
  highlight: boolean;
  createdAt: string;
  total_views: number;
  jobcount: number;
  description: string;
  job_benefits: Array<{
    id: string;
    name: string;
  }>;
  job_skills: Array<{
    id: string;
    name: string;
  }>;
}

interface ApiResponse {
  jobs: Job[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const SearchJobs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // State for filter options
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    jobTypes: [],
    salaryRange: [0, 100000],
    qualifications: [],
    experiences: [],
    skills: [],
    sortBy: "newest",
    search: searchParams.get('search') || '',
    page: 1,
    limit: 12
  });
  
  // State for jobs data
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for available options (for filter dropdowns)
  const [categories, setCategories] = useState<{id: string, name: string, count: number}[]>([]);
  const [jobTypes, setJobTypes] = useState<{id: string, name: string, count: number}[]>([]);
  const [qualifications, setQualifications] = useState<{id: string, name: string, count: number}[]>([]);
  const [experiences, setExperiences] = useState<{id: string, name: string, count: number}[]>([]);
  const [skills, setSkills] = useState<{id: string, name: string, count: number}[]>([]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/filteroptions`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
          setJobTypes(data.jobTypes || []);
          setQualifications(data.qualifications || []);
          setExperiences(data.experiences || []);
          setSkills(data.skills || []);
        }
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Fetch jobs based on filters
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        
        // Add all filter parameters
        if (filters.categories.length > 0) {
          filters.categories.forEach(cat => queryParams.append('categories', cat));
        }
        if (filters.jobTypes.length > 0) {
          filters.jobTypes.forEach(type => queryParams.append('jobTypes', type));
        }
        if (filters.qualifications.length > 0) {
          filters.qualifications.forEach(qual => queryParams.append('qualifications', qual));
        }
        if (filters.experiences.length > 0) {
          filters.experiences.forEach(exp => queryParams.append('experiences', exp));
        }
        if (filters.skills.length > 0) {
          filters.skills.forEach(skill => queryParams.append('skills', skill));
        }
        
        queryParams.append('minSalary', filters.salaryRange[0].toString());
        queryParams.append('maxSalary', filters.salaryRange[1].toString());
        queryParams.append('sortBy', filters.sortBy);
        queryParams.append('search', filters.search);
        queryParams.append('page', filters.page.toString());
        queryParams.append('limit', filters.limit.toString());
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/search?${queryParams}`);
        
        if (response.ok) {
          const data: ApiResponse = await response.json();
          setJobs(data.jobs);
          setTotalJobs(data.totalCount);
          setTotalPages(data.totalPages);
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('An error occurred while fetching jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [filters]);

  // Handle filter changes
  const handleCategoryChange = (categoryId: string) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      
      return { ...prev, categories: newCategories, page: 1 };
    });
  };

  const handleJobTypeChange = (jobTypeId: string) => {
    setFilters(prev => {
      const newJobTypes = prev.jobTypes.includes(jobTypeId)
        ? prev.jobTypes.filter(id => id !== jobTypeId)
        : [...prev.jobTypes, jobTypeId];
      
      return { ...prev, jobTypes: newJobTypes, page: 1 };
    });
  };

  const handleSalaryChange = (event: Event, newValue: number | number[]) => {
    setFilters(prev => ({
      ...prev,
      salaryRange: newValue as [number, number],
      page: 1
    }));
  };

  const handleQualificationChange = (qualificationId: string) => {
    setFilters(prev => {
      const newQualifications = prev.qualifications.includes(qualificationId)
        ? prev.qualifications.filter(id => id !== qualificationId)
        : [...prev.qualifications, qualificationId];
      
      return { ...prev, qualifications: newQualifications, page: 1 };
    });
  };

  const handleExperienceChange = (experienceId: string) => {
    setFilters(prev => {
      const newExperiences = prev.experiences.includes(experienceId)
        ? prev.experiences.filter(id => id !== experienceId)
        : [...prev.experiences, experienceId];
      
      return { ...prev, experiences: newExperiences, page: 1 };
    });
  };

  const handleSkillChange = (skillId: string) => {
    setFilters(prev => {
      const newSkills = prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId];
      
      return { ...prev, skills: newSkills, page: 1 };
    });
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the useEffect to fetch new results
    setFilters(prev => ({ ...prev }));
  };

  // Custom slider styles
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

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, filters.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Previous button
    items.push(
      <li key="prev">
        <button 
          className={`page-link ${filters.page === 1 ? 'disabled' : ''}`}
          onClick={() => filters.page > 1 && handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
        >
          Previous
        </button>
      </li>
    );
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i}>
          <button
            className={`page-link ${filters.page === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    
    // Next button
    items.push(
      <li key="next">
        <button
          className={`page-link ${filters.page === totalPages ? 'disabled' : ''}`}
          onClick={() => filters.page < totalPages && handlePageChange(filters.page + 1)}
          disabled={filters.page === totalPages}
        >
          Next
        </button>
      </li>
    );
    
    return items;
  };

  return (
    <Fragment>
      {/* <!-- Page Header --> */}
      <Seo title="Search Jobs" />
      <Pageheader Heading="Search Jobs" breadcrumbs={['Apps', 'Jobs']} currentpage="Search Jobs" />
      {/* <!-- Page Header Close --> */}

      <div className="container">
        {/* <!-- Start::row-1 --> */}
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-12 col-span-12">
            <div className="box custom-box">
              <div className="box-body p-3">
                <div className="grid grid-cols-12 items-center">
                  <div className="lg:col-span-8 col-span-12">
                    <div className="flex">
                      <h5 className="font-semibold mb-0">
                        <span className="font-normal">Showing</span> {totalJobs} Jobs
                      </h5>
                    </div>
                  </div>
                  <div className="lg:col-span-4 col-span-12 text-end">
                    <SpkDropdown 
                      Toggletext={`Sort By: ${filters.sortBy}`} 
                      Arrowicon={true} 
                      Customclass="btn-group" 
                      CustomToggleclass="ti-btn  btn-wave ti-btn-outline-light !text-dark  !border dark:border-defaultborder/10 dropdown-toggle"
                    >
                      <li>
                        <button 
                          className="ti-dropdown-item" 
                          onClick={() => handleSortChange('featured')}
                        >
                          Featured
                        </button>
                      </li>
                      <li>
                        <button 
                          className="ti-dropdown-item" 
                          onClick={() => handleSortChange('newest')}
                        >
                          Newest
                        </button>
                      </li>
                      <li>
                        <button 
                          className="ti-dropdown-item" 
                          onClick={() => handleSortChange('relevant')}
                        >
                          Most Relevant
                        </button>
                      </li>
                      <li>
                        <button 
                          className="ti-dropdown-item" 
                          onClick={() => handleSortChange('rated')}
                        >
                          Best Rated
                        </button>
                      </li>
                    </SpkDropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--End::row-1 --> */}

        {/* <!-- Start::row-2 --> */}
        <div className="grid grid-cols-12 gap-6">
          <div className="xxl:col-span-4 lg:col-span-5 col-span-12">
            <div className="box custom-box products-navigation-box">
              <div className="box-body !p-0">
                {/* Search Input */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <div className="relative">
                    <input
                      type="text"
                      className="form-control !pl-10"
                      placeholder="Search jobs..."
                      value={filters.search}
                      onChange={handleSearchChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                    />
                    {/* <span className="absolute left-3 top-2.5">
                      <i className="ti ti-search"></i>
                    </span> */}
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="!p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Categories</h6>
                  <div className="px-2 py-3 pb-0">
                    {categories.map((category) => (
                      <div className="form-check !mb-2 font-medium !flex items-center" key={category.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={filters.categories.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                          id={`c-${category.id}`}
                        />
                        <label className="form-check-label" htmlFor={`c-${category.id}`}>
                          {category.name}
                        </label>
                        <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
                          {category.count}
                        </SpkBadge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Type Filter */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Job Type</h6>
                  <div className="px-2 py-3 pb-0">
                    {jobTypes.map((jobType) => (
                      <div className="form-check !mb-2 font-medium !flex items-center" key={jobType.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={filters.jobTypes.includes(jobType.id)}
                          onChange={() => handleJobTypeChange(jobType.id)}
                          id={`j-${jobType.id}`}
                        />
                        <label className="form-check-label" htmlFor={`j-${jobType.id}`}>
                          {jobType.name}
                        </label>
                        <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
                          {jobType.count}
                        </SpkBadge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary Range Filter */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Salary Range</h6>
                  <div className="px-2 py-3 pb-0">
                    <div id="nonlinear">
                      <AirbnbSlider
                        slots={{ thumb: AirbnbThumbComponent }}
                        getAriaLabel={(index) => (index === 0 ? 'Minimum salary' : 'Maximum salary')}
                        value={filters.salaryRange}
                        onChange={handleSalaryChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100000}
                        valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                      />
                      <div className="flex justify-between mt-2">
                        <span>${filters.salaryRange[0].toLocaleString()}</span>
                        <span>${filters.salaryRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Qualification Filter */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Qualification</h6>
                  <div className="px-2 py-3 pb-0">
                    {qualifications.map((qualification) => (
                      <div className="form-check !mb-2 font-medium !flex items-center" key={qualification.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={filters.qualifications.includes(qualification.id)}
                          onChange={() => handleQualificationChange(qualification.id)}
                          id={`q-${qualification.id}`}
                        />
                        <label className="form-check-label" htmlFor={`q-${qualification.id}`}>
                          {qualification.name}
                        </label>
                        <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
                          {qualification.count}
                        </SpkBadge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Experience</h6>
                  <div className="px-2 py-3 pb-0">
                    {experiences.map((experience) => (
                      <div className="form-check !mb-2 font-medium !flex items-center" key={experience.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={filters.experiences.includes(experience.id)}
                          onChange={() => handleExperienceChange(experience.id)}
                          id={`e-${experience.id}`}
                        />
                        <label className="form-check-label" htmlFor={`e-${experience.id}`}>
                          {experience.name}
                        </label>
                        <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
                          {experience.count}
                        </SpkBadge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Filter */}
                <div className="p-6">
                  <h6 className="font-semibold mb-0">Skills</h6>
                  <div className="px-2 py-3 pb-0">
                    {skills.slice(0, 5).map((skill) => (
                      <div className="form-check !mb-2 font-medium !flex items-center" key={skill.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={filters.skills.includes(skill.id)}
                          onChange={() => handleSkillChange(skill.id)}
                          id={`s-${skill.id}`}
                        />
                        <label className="form-check-label" htmlFor={`s-${skill.id}`}>
                          {skill.name}
                        </label>
                        <SpkBadge variant="light" customClass="text-default font-500 float-end ms-auto">
                          {skill.count}
                        </SpkBadge>
                      </div>
                    ))}
                    {skills.length > 5 && (
                      <button className="ecommerce-more-link inline-flex items-center gap-x-2 text-primary">
                        MORE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xxl:col-span-8 lg:col-span-7 col-span-12">
            {loading ? (
              <div className="text-center py-10">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading jobs...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <>
                <div className="grid grid-cols-12 gap-x-6">
                  {jobs.map((job) => (
                    <div className="xl:col-span-6 col-span-12" key={job.id}>
                      <SpkJobdetails job={job} />
                    </div>
                  ))}
                  
                  {jobs.length === 0 && (
                    <div className="col-span-12 text-center py-10">
                      <h5>No jobs found</h5>
                      <p>Try adjusting your filters to find more jobs.</p>
                    </div>
                  )}

                  {/* <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                      <div className="box-body">
                        <div className="">
                          <h5 className="font-medium mb-3">Get Latest Job Alerts</h5>
                          <p className="mb-4">Latest jobs updates on the go to recieved direct to your
                            email. Stay updated with your latest new jobs.</p>
                          <div className="input-group mb-3">
                            <input type="text" className="form-control !border-s"
                                  placeholder="Email Here" aria-label="blog-email"
                                  aria-describedby="blog-subscribe" />
                            <button className="ti-btn ti-btn-primary !m-0" type="button" id="blog-subscribe">Subscribe</button>
                          </div>
                          <label className="form-check-label">
                            By Subscribing you accept to <Link scroll={false} href="#!" className="text-success"><u>privacy policy</u></Link>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                
                {totalPages > 1 && (
                  <nav className="overflow-auto mb-4 float-end !bg-white dark:!bg-bodybg !rounded-md">
                    <ul className="ti-pagination">
                      {renderPaginationItems()}
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
        {/* <!-- End::row-2 --> */}
      </div>
    </Fragment>
  );
};

export default SearchJobs;