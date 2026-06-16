"use client"
import SpkDatepickr from "@/shared/@spk-reusable-components/spk-packages/datepicker-component";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() => import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'), { ssr: false });
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect } from "react";

// API'den veri çekmek için tipler
interface OptionType {
  value: string;
  label: string;
}

interface JobCategory {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

interface JobType {
  id: string;
  name: string;
  slug: string;
}

interface JobExperience {
  id: string;
  name: string;
  slug: string;
}

interface Education {
  id: string;
  name: string;
  slug: string;
}

interface Skill {
  id: string;
  name: string;
  slug: string;
}

interface Company {
  id: string;
  name: string;
  userId: string;
  user: {
    id: string;
    username: string;
    displayName: string;
  };
}

interface CountryJob {
  id: string;
  name: string;
}

const PostJob = () => {
  const [startDate, setStartDate] = useState<Date | any>();
  const [formData, setFormData] = useState({
    title: "",
    jobCategoryId: "",
    jobExperienceId: "",
    jobTypeId: "",
    educationId: "",
    salaryTypeId: "",
    vacancies: "",
    min_salary: 0,
    max_salary: 0,
    custom_salary: 0,
    salary_mode: "custom" as "range" | "custom",
    deadline: null as Date | null,
    description: "",
    apply_on: "app" as "app" | "email" | "custom_url",
    apply_email: "",
    apply_url: "",
    featured: false,
    highlight: false,
    companyId: "",
    cityId: "",
    stateId: "",
    countryId: "",
    address: "",
    skillIds: [] as string[],
  });

  // API'den gelen veriler
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [countries, setCountries] = useState<CountryJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // API'den verileri çek
  const fetchData = async (type: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal/jobdata?type=${type}`);
      if (!response.ok) {
        console.error(`Failed to fetch ${type}:`, response.status, response.statusText);
        throw new Error(`Failed to fetch ${type}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const [
          categories, 
          types, 
          experiences, 
          educationsData, 
          skillsData, 
          companiesData,
          countriesData
        ] = await Promise.all([
          fetchData('categories'),
          fetchData('jobtypes'),
          fetchData('experiences'),
          fetchData('educations'),
          fetchData('skills'),
          fetchData('companies'),
          fetchData('countries')
        ]);

        setJobCategories(categories || []);
        setJobTypes(types || []);
        setJobExperiences(experiences || []);
        setEducations(educationsData || []);
        setSkills(skillsData || []);
        setCompanies(companiesData || []);
        setCountries(countriesData || []);

      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setFormData(prev => ({ ...prev, deadline: date }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name: string, selectedOptions: any[]) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prev => ({ ...prev, [name]: values }));
  };




  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    console.log('Gönderilen veri:', formData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobsfinal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        // deadline'ı ISO string'e çevir
        deadline: formData.deadline ? formData.deadline.toISOString() : null
      }),
    });

    const responseData = await response.json();
    
    console.log('API yanıtı:', responseData);

    if (response.ok) {
      alert('İş ilanı başarıyla oluşturuldu!');
      // Formu temizle
      setFormData({
        title: "",
        jobCategoryId: "",
        jobExperienceId: "",
        jobTypeId: "",
        educationId: "",
        salaryTypeId: "",
        vacancies: "",
        min_salary: 0,
        max_salary: 0,
        custom_salary: 0,
        salary_mode: "custom",
        deadline: null,
        description: "",
        apply_on: "app",
        apply_email: "",
        apply_url: "",
        featured: false,
        highlight: false,
        companyId: "",
        cityId: "",
        stateId: "",
        countryId: "",
        address: "",
        skillIds: [],
      });
    } else {
      throw new Error(responseData.error || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Hata:', error);
    alert(error instanceof Error ? error.message : 'İş ilanı oluşturulurken bir hata oluştu');
  } finally {
    setSubmitting(false);
  }
};



  // Select option'larını dönüştür
  const categoryOptions = jobCategories.map(cat => ({ value: cat.id, label: cat.name }));
  const typeOptions = jobTypes.map(type => ({ value: type.id, label: type.name }));
  const experienceOptions = jobExperiences.map(exp => ({ value: exp.id, label: exp.name }));
  const educationOptions = educations.map(edu => ({ value: edu.id, label: edu.name }));
  const skillOptions = skills.map(skill => ({ value: skill.id, label: skill.name }));
  const companyOptions = companies.map(company => ({ 
    value: company.id, 
    label: `${company.name} (${company.user?.displayName || company.user?.username || 'Unknown'})` 
  }));
  const countryOptions = countries.map(country => ({ value: country.id, label: country.name }));

  if (loading) {
    return (
      <Fragment>
        <Seo title="Post Job" />
        <Pageheader Heading="Post Job" breadcrumbs={['Apps', 'Jobs']} currentpage="Post Job" />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3">Loading...</span>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Seo title="Post Job" />
      <Pageheader Heading="Post Job" breadcrumbs={['Apps', 'Jobs']} currentpage="Post Job" />

      <div className="grid grid-cols-12 gap-6">
        <div className="xxl:col-span-9 xl:col-span-8 col-span-12">
          <form onSubmit={handleSubmit}>
            <div className="box custom-box">
              <div className="box-header justify-between">
                <div className="box-title">Post New Job</div>
              </div>
              <div className="box-body">
                <div className="grid grid-cols-12 sm:gap-6 mb-4">
                  <div className="xl:col-span-6 col-span-12">
                    <label htmlFor="job-title" className="ti-form-label">Job Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="job-title" 
                      name="title"
                      placeholder="Job Title" 
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="xl:col-span-6 col-span-12">
                    <label className="ti-form-label">Job Category</label>
                    <SpkSelect 
                      name="jobCategoryId"
                      options={categoryOptions}
                      mainClass="basic-multi-select" 
                      classNamePrefix="Select2" 
                      value={categoryOptions.find(opt => opt.value === formData.jobCategoryId)}
                      onChange={(selected) => handleSelectChange('jobCategoryId', selected?.value)}
                      required
                    />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label className="ti-form-label">Working Experience</label>
                    <SpkSelect 
                      name="jobExperienceId"
                      options={experienceOptions}
                      mainClass="basic-multi-select" 
                      classNamePrefix="Select2" 
                      value={experienceOptions.find(opt => opt.value === formData.jobExperienceId)}
                      onChange={(selected) => handleSelectChange('jobExperienceId', selected?.value)}
                    />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label className="ti-form-label">Job Type</label>
                    <SpkSelect 
                      name="jobTypeId"
                      options={typeOptions}
                      mainClass="basic-multi-select" 
                      classNamePrefix="Select2" 
                      value={typeOptions.find(opt => opt.value === formData.jobTypeId)}
                      onChange={(selected) => handleSelectChange('jobTypeId', selected?.value)}
                    />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label className="ti-form-label">Education Level</label>
                    <SpkSelect 
                      name="educationId"
                      options={educationOptions}
                      classNamePrefix='Select2' 
                      menuPlacement='auto' 
                      mainClass="multi-select" 
                      value={educationOptions.find(opt => opt.value === formData.educationId)}
                      onChange={(selected) => handleSelectChange('educationId', selected?.value)}
                    />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label className="ti-form-label">Vacancies</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="vacancies"
                      placeholder="Number of vacancies" 
                      value={formData.vacancies}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label className="ti-form-label">Salary Mode</label>
                    <select 
                      className="form-control" 
                      name="salary_mode"
                      value={formData.salary_mode}
                      onChange={handleInputChange}
                    >
                      <option value="custom">Custom Salary</option>
                      <option value="range">Salary Range</option>
                    </select>
                  </div>

                  {formData.salary_mode === 'range' ? (
                    <>
                      <div className="xl:col-span-3 col-span-12">
                        <label className="ti-form-label">Minimum Salary ($)</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          name="min_salary"
                          placeholder="Min Salary" 
                          value={formData.min_salary}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="xl:col-span-3 col-span-12">
                        <label className="ti-form-label">Maximum Salary ($)</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          name="max_salary"
                          placeholder="Max Salary" 
                          value={formData.max_salary}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="xl:col-span-6 col-span-12">
                      <label className="ti-form-label">Custom Salary ($)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="custom_salary"
                        placeholder="Custom Salary" 
                        value={formData.custom_salary}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>
                  )}

                  <div className="xl:col-span-6 col-span-12">
                    <label className="ti-form-label">Skills</label>
                    <SpkSelect 
                      isMulti
                      name="skillIds"
                      options={skillOptions}
                      mainClass="basic-multi-select" 
                      classNamePrefix="Select2"
                      value={skillOptions.filter(opt => formData.skillIds.includes(opt.value))}
                      onChange={(selected) => handleMultiSelectChange('skillIds', selected || [])}
                    />
                  </div>

                  <div className="xl:col-span-6 col-span-12 job-deadline-placeholder">
                    <label htmlFor="Job-Deadline" className="ti-form-label">Job Deadline</label>
                    <SpkDatepickr 
                      className="form-control" 
                      placeholderText='Job Deadline' 
                      selected={formData.deadline} 
                      onChange={handleDateChange}
                      minDate={new Date()}
                    />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <label className="ti-form-label">Application Method</label>
                    <select 
                      className="form-control" 
                      name="apply_on"
                      value={formData.apply_on}
                      onChange={handleInputChange}
                    >
                      <option value="app">Through App</option>
                      <option value="email">By Email</option>
                      <option value="custom_url">Custom URL</option>
                    </select>
                  </div>

                  {formData.apply_on === 'email' && (
                    <div className="xl:col-span-6 col-span-12">
                      <label className="ti-form-label">Application Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        name="apply_email"
                        placeholder="application@email.com" 
                        value={formData.apply_email}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {formData.apply_on === 'custom_url' && (
                    <div className="xl:col-span-6 col-span-12">
                      <label className="ti-form-label">Application URL</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        name="apply_url"
                        placeholder="https://apply-here.com" 
                        value={formData.apply_url}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  <div className="xl:col-span-12 col-span-12">
                    <label className="ti-form-label">Job Description</label>
                    <textarea 
                      className="form-control" 
                      id="job-description" 
                      name="description"
                      rows={6} 
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter detailed job description..."
                      required
                    />
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        id="featured-checkbox"
                      />
                      <label className="form-check-label" htmlFor="featured-checkbox">
                        Featured Job
                      </label>
                    </div>
                  </div>

                  <div className="xl:col-span-6 col-span-12">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="highlight"
                        checked={formData.highlight}
                        onChange={handleInputChange}
                        id="highlight-checkbox"
                      />
                      <label className="form-check-label" htmlFor="highlight-checkbox">
                        Highlight Job
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-footer text-end">
                <button 
                  type="submit" 
                  className="ti-btn btn-wave ti-btn-primary !m-0 btn-wave"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus-circle"></i> Post Job
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="xxl:col-span-3 xl:col-span-4 col-span-12">
          <div className="box custom-box">
            <div className="box-header">
              <div className="box-title">Assign To Company</div>
            </div>
            <div className="box-body">
              <div className="xl:col-span-12 col-span-12">
                <label className="ti-form-label">Company</label>
                <SpkSelect 
                  name="companyId"
                  options={companyOptions}
                  mainClass="basic-multi-select" 
                  classNamePrefix="Select2" 
                  value={companyOptions.find(opt => opt.value === formData.companyId)}
                  onChange={(selected) => handleSelectChange('companyId', selected?.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="box custom-box">
            <div className="box-header">
              <div className="box-title">Location Details</div>
            </div>
            <div className="box-body">
              <div className="grid grid-cols-12 gap-4">
                <div className="xl:col-span-12 col-span-12">
                  <label className="ti-form-label">Country</label>
                  <SpkSelect 
                    name="countryId"
                    options={countryOptions}
                    mainClass="basic-multi-select" 
                    classNamePrefix="Select2" 
                    value={countryOptions.find(opt => opt.value === formData.countryId)}
                    onChange={(selected) => handleSelectChange('countryId', selected?.value)}
                  />
                </div>
                <div className="xl:col-span-12 col-span-12">
                  <label htmlFor="address" className="ti-form-label">Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    className="form-control" 
                    name="address"
                    placeholder="Company Address" 
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostJob;