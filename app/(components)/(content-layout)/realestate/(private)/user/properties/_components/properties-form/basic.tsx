import React from "react";
import { PropertiesFormStepProps } from ".";
import { propertyStatuses, propertyTypes } from "@/app/(components)/(content-layout)/realestate/constants";

function Basic({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const [formData, setFormData] = React.useState({
    name: finalValues.basic?.name || "",
    description: finalValues.basic?.description || "",
    type: finalValues.basic?.type || "",
    status: finalValues.basic?.status || "",
    price: finalValues.basic?.price || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFinalValues({ ...finalValues, basic: formData });
    setCurrentStep(currentStep + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="box">
      <div className="box-header">
        <div className="box-title">
          <i className="ri-home-3-line me-2 text-primary"></i>
          Basic Property Information
        </div>
        <div className="box-subtitle">
          Step {currentStep + 1} of 4 - Start with basic details
        </div>
      </div>
      
      <div className="box-body">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Name */}
            <div className="mb-4 col-span-1 lg:col-span-3">
              <label className="form-label">
                <i className="ri-building-2-line me-2 text-primary"></i>
                Property Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter property name (e.g., Modern Villa, Downtown Apartment)"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4 col-span-1 lg:col-span-3">
              <label className="form-label">
                <i className="ri-file-text-line me-2 text-primary"></i>
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                name="description"
                className="form-control"
                rows={6}
                placeholder="Describe your property in detail. Include features, location advantages, nearby amenities, etc."
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <div className="text-xs text-textmuted dark:text-textmuted/50 mt-1">
                Minimum 50 characters recommended
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-home-4-line me-2 text-primary"></i>
                Property Type <span className="text-danger">*</span>
              </label>
              <select
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select property type</option>
                {propertyTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Status */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-award-line me-2 text-primary"></i>
                Status <span className="text-danger">*</span>
              </label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select property status</option>
                {propertyStatuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-money-dollar-circle-line me-2 text-primary"></i>
                Price <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Enter property price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
                <span className="input-group-text">
                  {formData.status === 'FOR_RENT' ? '/month' : 'total'}
                </span>
              </div>
              <div className="text-xs text-textmuted dark:text-textmuted/50 mt-1">
                {formData.status === 'FOR_RENT' 
                  ? 'Monthly rental price' 
                  : 'Total sale price'}
              </div>
            </div>
          </div>

          {/* Price Preview */}
          {formData.price && (
            <div className="mt-4 mb-6">
              <div className="alert alert-success bg-success/10 border-success/20">
                <div className="flex items-center">
                  <i className="ri-checkbox-circle-line text-success text-lg me-2"></i>
                  <div>
                    <h6 className="text-default mb-0">Price Preview</h6>
                    <p className="mb-0">
                      Your property is listed at <span className="font-bold text-success">${parseFloat(formData.price as string).toLocaleString()}</span>
                      {formData.status === 'FOR_RENT' ? ' per month' : ' total'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-8 mb-6">
            <div className="flex justify-between text-sm text-textmuted dark:text-textmuted/50 mb-2">
              <span>Step {currentStep + 1} of 4</span>
              <span>{Math.round(((currentStep + 1) / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between pt-4 border-t border-defaultborder dark:border-defaultborder/10">
            <button
              type="button"
              className="ti-btn ti-btn-light ti-btn-wave"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
            >
              <i className="ri-arrow-left-line me-1"></i>
              Back
            </button>
            <button
              type="submit"
              className="ti-btn ti-btn-primary ti-btn-wave"
              disabled={!formData.name || !formData.description || !formData.type || !formData.status || !formData.price}
            >
              Next Step
              <i className="ri-arrow-right-line ms-1"></i>
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6">
          <div className="alert alert-info bg-info/10 border-info/20">
            <div className="flex">
              <span className="svg-info">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-info" height="24px" viewBox="0 0 24 24" width="24px">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </span>
              <div className="ms-2">
                <h6 className="text-default mb-0">Tips for filling basic information</h6>
                <ul className="text-sm mb-0 mt-1">
                  <li>Use a descriptive name that highlights key features</li>
                  <li>Be detailed in the description - mention unique selling points</li>
                  <li>Select the correct property type and status</li>
                  <li>Set a competitive price based on market rates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basic;