"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import SpkOverlay from "@/shared/@spk-reusable-components/uielements/spk-overlay";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";

// API'den şirket verilerini çekmek için yardımcı fonksiyon
const fetchCompanies = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  // Filtreleri query parametrelerine ekle
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/companies?${queryParams}`);
  if (!response.ok) throw new Error('Şirketler yüklenirken hata oluştu');
  return response.json();
};

// API'den tüm filtre seçeneklerini çekmek için yardımcı fonksiyon
const fetchFilterOptions = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/companyfilters`);
  if (!response.ok) throw new Error('Filtre seçenekleri yüklenirken hata oluştu');
  return response.json();
};

const SearchCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    industries: [],
    organizations: [],
    teams: [],
    countries: [],
    states: [],
    cities: []
  });
  const [filters, setFilters] = useState({
    industryTypeId: '',
    organizationTypeId: '',
    teamTypeId: '',
    countryId: '',
    stateId: '',
    cityId: '',
    searchTerm: '',
    companySize: '',
    jobVacancies: '',
    employmentType: ''
  });
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filtre seçeneklerini yükle
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await fetchFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Filtre seçenekleri yüklenirken hata:', error);
      } finally {
        setFiltersLoading(false);
      }
    };
    
    loadFilterOptions();
  }, []);

  // Şirketleri filtrele
  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true);
      try {
        const data = await fetchCompanies(filters);
        setCompanies(data.companies);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error('Şirketler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCompanies();
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  return (
    <Fragment>
      {/* <!-- Page Header --> */}
      <Seo title="Search Company" />
      <Pageheader Heading="Search Company" breadcrumbs={['Apps', 'Jobs']} currentpage="Search Company" />
      {/* <!-- Page Header Close --> */}

      <div className="container">
        {/* <!-- Start:: row-1 --> */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xxl:col-span-4 lg:col-span-12 col-span-12">
            <div className="box custom-box products-navigation-box">
              <div className="box-body !p-0">
                {/* Endüstri Tipi Filtresi */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Industry Type</h6>
                  <div className="px-0 py-4 pb-0">
                    {filtersLoading ? (
                      <div className="flex justify-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      filterOptions.industries?.map(industry => (
                        <div key={industry.id} className="form-check !flex items-center !mb-2">
                          <input 
                            className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                            type="checkbox" 
                            checked={filters.industryTypeId === industry.id}
                            onChange={(e) => handleFilterChange('industryTypeId', e.target.checked ? industry.id : '')}
                            id={`industry-${industry.id}`} 
                          />
                          <label className="form-check-label" htmlFor={`industry-${industry.id}`}>
                            {industry.name}
                          </label>
                          <SpkBadge variant="light" customClass="text-defaulttextcolor float-end ms-auto">
                            {industry._count?.companies || 0}
                          </SpkBadge>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Lokasyon Filtresi */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Location</h6>
                  <div className="px-0 py-4 pb-0">
                    <div className="mb-3">
                      <label className="form-label">Country</label>
                      <select 
                        className="form-select" 
                        value={filters.countryId}
                        onChange={(e) => handleFilterChange('countryId', e.target.value)}
                        disabled={filtersLoading}
                      >
                        <option value="">Select Country</option>
                        {filterOptions.countries?.map(country => (
                          <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">State</label>
                      <select 
                        className="form-select" 
                        value={filters.stateId}
                        onChange={(e) => handleFilterChange('stateId', e.target.value)}
                        disabled={!filters.countryId || filtersLoading}
                      >
                        <option value="">Select State</option>
                        {filterOptions.states
                          ?.filter(state => state.countryId === filters.countryId)
                          .map(state => (
                            <option key={state.id} value={state.id}>{state.statename}</option>
                          ))
                        }
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <select 
                        className="form-select" 
                        value={filters.cityId}
                        onChange={(e) => handleFilterChange('cityId', e.target.value)}
                        disabled={(!filters.stateId && !filters.countryId) || filtersLoading}
                      >
                        <option value="">Select City</option>
                        {filterOptions.cities
                          ?.filter(city => 
                            (filters.stateId && city.stateId === filters.stateId) ||
                            (filters.countryId && city.countryId === filters.countryId)
                          )
                          .map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>

                {/* Şirket Büyüklüğü Filtresi */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Company Size</h6>
                  <div className="px-2 py-3 pb-0">
                    <div className="form-check !flex items-center !mb-2">
                      <input 
                        className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                        type="radio" 
                        name="companySize"
                        checked={filters.companySize === 'small'}
                        onChange={() => handleFilterChange('companySize', 'small')}
                        id="size-small" 
                      />
                      <label className="form-check-label" htmlFor="size-small">
                        0-50 Employees
                      </label>
                    </div>
                    <div className="form-check !flex items-center !mb-2">
                      <input 
                        className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                        type="radio" 
                        name="companySize"
                        checked={filters.companySize === 'medium'}
                        onChange={() => handleFilterChange('companySize', 'medium')}
                        id="size-medium" 
                      />
                      <label className="form-check-label" htmlFor="size-medium">
                        50-200 Employees
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                        type="radio" 
                        name="companySize"
                        checked={filters.companySize === 'large'}
                        onChange={() => handleFilterChange('companySize', 'large')}
                        id="size-large" 
                      />
                      <label className="form-check-label" htmlFor="size-large">
                        200+ Employees
                      </label>
                    </div>
                  </div>
                </div>

                {/* Organizasyon Tipi Filtresi */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Organization Type</h6>
                  <div className="px-2 py-3 pb-0">
                    {filtersLoading ? (
                      <div className="flex justify-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      filterOptions.organizations?.map(org => (
                        <div key={org.id} className="form-check !flex items-center !mb-2">
                          <input 
                            className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                            type="checkbox" 
                            checked={filters.organizationTypeId === org.id}
                            onChange={(e) => handleFilterChange('organizationTypeId', e.target.checked ? org.id : '')}
                            id={`org-${org.id}`} 
                          />
                          <label className="form-check-label" htmlFor={`org-${org.id}`}>
                            {org.name}
                          </label>
                          <SpkBadge variant="light" customClass="text-default float-end ms-auto">
                            {org._count?.companies || 0}
                          </SpkBadge>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Takım Büyüklüğü Filtresi */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Team Size</h6>
                  <div className="px-2 py-3 pb-0">
                    {filtersLoading ? (
                      <div className="flex justify-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      filterOptions.teams?.map(team => (
                        <div key={team.id} className="form-check !flex items-center !mb-2">
                          <input 
                            className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                            type="checkbox" 
                            checked={filters.teamTypeId === team.id}
                            onChange={(e) => handleFilterChange('teamTypeId', e.target.checked ? team.id : '')}
                            id={`team-${team.id}`} 
                          />
                          <label className="form-check-label" htmlFor={`team-${team.id}`}>
                            {team.name}
                          </label>
                          <SpkBadge variant="light" customClass="text-default float-end ms-auto">
                            {team._count?.companies || 0}
                          </SpkBadge>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* İş İlanı Filtresi */}
                <div className="p-6 border-b dark:border-defaultborder/10">
                  <h6 className="font-semibold mb-0">Job Vacancies</h6>
                  <div className="px-2 py-3 pb-0">
                    <div className="form-check !flex items-center !mb-2">
                      <input 
                        className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                        type="radio" 
                        name="jobVacancies"
                        checked={filters.jobVacancies === '0-5'}
                        onChange={() => handleFilterChange('jobVacancies', '0-5')}
                        id="vacancies-1" 
                      />
                      <label className="form-check-label" htmlFor="vacancies-1">
                        0-5 Open Positions
                      </label>
                    </div>
                    <div className="form-check !flex items-center !mb-2">
                      <input 
                        className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                        type="radio" 
                        name="jobVacancies"
                        checked={filters.jobVacancies === '5-20'}
                        onChange={() => handleFilterChange('jobVacancies', '5-20')}
                        id="vacancies-2" 
                      />
                      <label className="form-check-label" htmlFor="vacancies-2">
                        5-20 Open Positions
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input me-2 focus:!shadow-none focus:!ring-0 focus:!ring-offset-0" 
                        type="radio" 
                        name="jobVacancies"
                        checked={filters.jobVacancies === '20+'}
                        onChange={() => handleFilterChange('jobVacancies', '20+')}
                        id="vacancies-3" 
                      />
                      <label className="form-check-label" htmlFor="vacancies-3">
                        20+ Open Positions
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="xxl:col-span-8 lg:col-span-12 col-span-12">
            <div className="grid grid-cols-12 gap-x-6 align-center mb-4">
              <div className="lg:col-span-12 col-span-12">
                <div className="inline-flex !w-full companies-search-input mb-6 lg:!flex-nowrap flex-wrap">
                  <input 
                    type="text"
                    className="form-control !w-auto form-control-lg flex-grow !rounded-e-none"
                    aria-label="Text input with segmented dropdown button"
                    placeholder="Enter company name or keyword"
                    value={filters.searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <SpkSelect 
                    classNameprefix="Select2" 
                    mainClass='rounded-0 custom-select' 
                    name="industry-filter" 
                    option={filterOptions.industries?.map(i => ({ value: i.id, label: i.name })) || []} 
                    placeholder="All industries" 
                    value={filterOptions.industries
                      ?.filter(i => i.id === filters.industryTypeId)
                      .map(i => ({ value: i.id, label: i.name }))[0]}
                    onChange={(selected) => handleFilterChange('industryTypeId', selected?.value || '')}
                    isDisabled={filtersLoading}
                  />
                  <SpkSelect 
                    classNameprefix="Select2" 
                    mainClass='rounded-0 custom-select' 
                    name="location-filter" 
                    option={filterOptions.countries?.map(c => ({ value: c.id, label: c.name })) || []} 
                    placeholder="All locations" 
                    value={filterOptions.countries
                      ?.filter(c => c.id === filters.countryId)
                      .map(c => ({ value: c.id, label: c.name }))[0]}
                    onChange={(selected) => handleFilterChange('countryId', selected?.value || '')}
                    isDisabled={filtersLoading}
                  />
                  <button aria-label="button" type="button" className="ti-btn btn-wave !m-0 ti-btn-primary !rounded-s-none">
                    <i className="ri-search-line"></i>
                  </button>
                </div>
              </div>
              
              <div className="xl:col-span-12 col-span-12">
                <div className="box">
                  <div className="box-body">
                    <div className="flex items-center flex-wrap gap-2">
                      <h5 className="font-medium mb-0 flex-grow">
                        {totalCount} <span className="font-normal text-[1.125rem]">Companies match for your search</span>
                      </h5>
                      <SpkDropdown 
                        Toggletext="Sort By" 
                        Icon={true} 
                        IconClass="ti ti-chevron-down" 
                        Customclass="btn-group"
                        CustomToggleclass="ti-btn ti-btn-outline-light !text-dark !border dropdown-toggle"
                      >
                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Premium</Link></li>
                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Newest</Link></li>
                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Most Relevant</Link></li>
                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Most Rated</Link></li>
                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Most Jobs</Link></li>
                      </SpkDropdown>
                    </div>
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="col-span-12 text-center py-10">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : companies.length === 0 ? (
                <div className="col-span-12 text-center py-10">
                  <p className="text-muted">No companies found matching your criteria.</p>
                </div>
              ) : (
                companies.map(company => (
                  <div key={company.id} className="xl:col-span-6 col-span-12">
                    <div className="box">
                      <div className="box-body">
                        <div className="btn-list float-end">
                          <SpkOverlay>
                            <Link scroll={false} href="#!" className="avatar avatar-rounded bg-light text-default avatar-sm hs-tooltip-toggle">
                              <i className="bi bi-heart"></i>
                              <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                Add to wishlist
                              </span>
                            </Link>
                          </SpkOverlay>
                          <SpkOverlay>
                            <Link scroll={false} href="#!" className="avatar avatar-rounded bg-light text-default avatar-sm hs-tooltip-toggle ms-1">
                              <i className="bi bi-share"></i>
                              <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                Share this company
                              </span>
                            </Link>
                          </SpkOverlay>
                        </div>
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="avatar avatar-xl bg-white shadow-sm border p-2 avatar-rounded dark:bg-bodybg border-defaultborder dark:border-defaultborder/10">
                            <Image 
                              src={company.logoSecureUrl || '/assets/images/company-logo-placeholder.png'} 
                              alt={company.name}
                              width={80}
                              height={80}
                              style={{objectFit: 'contain'}}
                            />
                          </span>
                          <div className="ms-2">
                            <div className="font-medium mb-0 h5 flex items-center">
                              <Link scroll={false} href={`/home/jobs/company/${company.slug}`}>
                                {company.name}
                                {company.isProfileVerified && (
                                  <SpkOverlay>
                                    <span className="p-1 hs-tooltip-toggle">
                                      <i className="bi bi-check-circle-fill text-success !text-[1rem]"></i>
                                      <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                        Verified Company
                                      </span>
                                    </span>
                                  </SpkOverlay>
                                )}
                              </Link>
                            </div>
                            <div className="flex gap-2">
                              <Link scroll={false} href="#!">
                                <i className="bi bi-geo-alt fs-11"></i> 
                                {[company.city?.name, company.state?.statename, company.country?.name].filter(Boolean).join(', ')}
                              </Link>
                              {company.establishmentDate && (
                                <p className="mb-0 text-textmuted dark:text-textmuted/50">
                                  Established - {new Date(company.establishmentDate).getFullYear()}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center text-[0.75rem] text-textmuted dark:text-textmuted/50">
                              <p className="text-[0.75rem] mb-0">Industry: </p>
                              <div className="min-w-fit ms-2">{company.industryType?.name}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box-footer">
                        <div className="flex items-center flex-wrap gap-2">
                          <div className="flex-grow">
                            <SpkOverlay>
                              <Link scroll={false} href="#!" className="badge badge-md !rounded-full bg-info/[0.15] text-info hs-tooltip-toggle me-1">
                                <i className="bi bi-people me-1"></i>
                                {company.teamType?.name || 'Team size not specified'}
                                <span className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                  Team size
                                </span>
                              </Link>
                            </SpkOverlay>
                            <Link scroll={false} href="#!" className="badge badge-md !rounded-full bg-primary/[0.15] text-primary">
                              <i className="bi bi-briefcase me-1"></i>
                              {company._count?.Jobs || 0} Open Positions
                            </Link>
                          </div>
                          <Link scroll={false} href={`/home/jobs/company/${company.slug}`} className="ti-btn btn-wave ti-btn-primary !m-0">
                            View Profile <i className="ri-arrow-right-line align-middle"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Pagination */}
            {companies.length > 0 && (
              <nav className="overflow-auto mb-4 float-end !bg-white dark:!bg-bodybg !rounded-md">
                <ul className="ti-pagination">
                  <li><Link scroll={false} className="page-link" href="#!"> Previous </Link></li>
                  <li><Link scroll={false} className="page-link" href="#!" aria-current="page">1</Link></li>
                  <li><Link scroll={false} className="page-link active" href="#!">2</Link></li>
                  <li><Link scroll={false} className="page-link" href="#!">3</Link></li>
                  <li><Link scroll={false} className="page-link" href="#!"> Next </Link></li>
                </ul>
              </nav>
            )}
          </div>
        </div>
        {/* <!-- End:: row-1 --> */}
      </div>
    </Fragment>
  );
};

export default SearchCompany;