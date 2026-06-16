import React from "react";
import { PropertiesFormStepProps } from ".";

function Location({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const [formData, setFormData] = React.useState({
    city: finalValues.location?.city || "",
    pincode: finalValues.location?.pincode || "",
    landmark: finalValues.location?.landmark || "",
    address: finalValues.location?.address || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFinalValues({ ...finalValues, location: formData });
    setCurrentStep(currentStep + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="box">
      <div className="box-header">
        <div className="box-title">
          <i className="ri-map-pin-line me-2 text-primary"></i>
          Location Details
        </div>
        <div className="box-subtitle">
          Step {currentStep + 1} of 4 - Where is your property located?
        </div>
      </div>
      
      <div className="box-body">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* City */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-building-3-line me-2 text-primary"></i>
                City <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="Enter city name"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Pincode */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-map-pin-2-line me-2 text-primary"></i>
                Pincode / ZIP Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                placeholder="Enter pincode or ZIP code"
                value={formData.pincode}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Landmark */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-landscape-line me-2 text-primary"></i>
                Landmark <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="landmark"
                className="form-control"
                placeholder="Enter nearby landmark (e.g., near mall, school)"
                value={formData.landmark}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4 col-span-1 lg:col-span-3">
              <label className="form-label">
                <i className="ri-road-map-line me-2 text-primary"></i>
                Full Address <span className="text-danger">*</span>
              </label>
              <textarea
                name="address"
                className="form-control"
                rows={5}
                placeholder="Enter complete address including street, area, etc."
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <div className="text-xs text-textmuted dark:text-textmuted/50 mt-1">
                Be as detailed as possible to help potential buyers/renters locate the property
              </div>
            </div>
          </div>

          {/* Location Preview */}
          {(formData.city || formData.landmark || formData.address) && (
            <div className="mt-4 mb-6">
              <div className="alert alert-success bg-success/10 border-success/20">
                <div className="flex items-center">
                  <i className="ri-map-2-line text-success text-lg me-2"></i>
                  <div>
                    <h6 className="text-default mb-0">Location Preview</h6>
                    <p className="mb-0">
                      {formData.address && <span className="font-semibold">{formData.address}</span>}
                      {formData.landmark && <span>, near {formData.landmark}</span>}
                      {formData.city && <span>, {formData.city}</span>}
                      {formData.pincode && <span> - {formData.pincode}</span>}
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
              disabled={!formData.city || !formData.pincode || !formData.landmark || !formData.address}
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
                <h6 className="text-default mb-0">Tips for filling location details</h6>
                <ul className="text-sm mb-0 mt-1">
                  <li>Be accurate with the city and pincode for better search results</li>
                  <li>Mention nearby landmarks (schools, malls, metro stations)</li>
                  <li>Provide complete address including street name and number</li>
                  <li>Double-check the address for accuracy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;