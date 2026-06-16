import React from "react";
import { PropertiesFormStepProps } from ".";
import { facingTypes, parkingTypes, furnishingTypes } from "@/app/(components)/(content-layout)/realestate/constants";

function Amenities({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const [formData, setFormData] = React.useState({
    bedrooms: finalValues.amenities?.bedrooms || "",
    bathrooms: finalValues.amenities?.bathrooms || "",
    balconies: finalValues.amenities?.balconies || "",
    parking: finalValues.amenities?.parking || "",
    furnishing: finalValues.amenities?.furnishing || "",
    floors: finalValues.amenities?.floors || "",
    area: finalValues.amenities?.area || "",
    facing: finalValues.amenities?.facing || "",
    age: finalValues.amenities?.age || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFinalValues({ ...finalValues, amenities: formData });
    setCurrentStep(currentStep + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: string, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="box">
      <div className="box-header">
        <div className="box-title">
          <i className="ri-home-gear-line me-2 text-primary"></i>
          Amenities & Specifications
        </div>
        <div className="box-subtitle">
          Step {currentStep + 1} of 4
        </div>
      </div>
      
      <div className="box-body">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bedrooms */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-bed-line me-2 text-primary"></i>
                Bedrooms <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                name="bedrooms"
                className="form-control"
                placeholder="Enter number of bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Bathrooms */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-shower-line me-2 text-primary"></i>
                Bathrooms <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                name="bathrooms"
                className="form-control"
                placeholder="Enter number of bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Balconies */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-building-2-line me-2 text-primary"></i>
                Balconies <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                name="balconies"
                className="form-control"
                placeholder="Enter number of balconies"
                value={formData.balconies}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Parking */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-parking-box-line me-2 text-primary"></i>
                Parking <span className="text-danger">*</span>
              </label>
              <select
                name="parking"
                className="form-control"
                value={formData.parking}
                onChange={handleInputChange}
                required
              >
                <option value="">Select parking type</option>
                {parkingTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Furnishing */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-sofa-line me-2 text-primary"></i>
                Furnishing <span className="text-danger">*</span>
              </label>
              <select
                name="furnishing"
                className="form-control"
                value={formData.furnishing}
                onChange={handleInputChange}
                required
              >
                <option value="">Select furnishing type</option>
                {furnishingTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Floors */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-building-line me-2 text-primary"></i>
                Floors <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                name="floors"
                className="form-control"
                placeholder="Enter total floors"
                value={formData.floors}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Area */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-ruler-line me-2 text-primary"></i>
                Area (Sq.ft) <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="number"
                  name="area"
                  className="form-control"
                  placeholder="Enter area in square feet"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                />
                <span className="input-group-text">Sq.ft</span>
              </div>
            </div>

            {/* Facing */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-compass-3-line me-2 text-primary"></i>
                Facing <span className="text-danger">*</span>
              </label>
              <select
                name="facing"
                className="form-control"
                value={formData.facing}
                onChange={handleInputChange}
                required
              >
                <option value="">Select facing direction</option>
                {facingTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Age */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-calendar-line me-2 text-primary"></i>
                Age (Years) <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  placeholder="Enter property age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
                <span className="input-group-text">Years</span>
              </div>
            </div>
          </div>

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
                <h6 className="text-default mb-0">Tips for filling amenities</h6>
                Provide accurate details about your property's features. This information helps potential buyers/renters make informed decisions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Amenities;