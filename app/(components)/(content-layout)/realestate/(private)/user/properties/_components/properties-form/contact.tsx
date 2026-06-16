"use client";

import React from "react";
import { PropertiesFormStepProps } from ".";
import { AddProperty, EditProperty } from "@/app/(components)/(content-layout)/realestate/actions/properties";
import { useRouter, useParams } from "next/navigation";

function Contact({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
  loading,
  setLoading,
  isEdit = false,
}: PropertiesFormStepProps) {
  const { id }: any = useParams();
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    ownerName: finalValues.contact?.ownerName || "",
    ownerEmail: finalValues.contact?.ownerEmail || "",
    ownerPhone: finalValues.contact?.ownerPhone || "",
    showOwnerContact: finalValues.contact?.showOwnerContact || "true",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // Form verilerini finalValues.contact ile birleştir
      const tempFinalValues = { ...finalValues, contact: formData };

      // Veritabanına uygun şekilde tüm alanları formatla
      const valuesAsPerDb = {
        // Basic tabından gelenler
        name: String(tempFinalValues.basic?.name || ""),
        description: String(tempFinalValues.basic?.description || ""),
        type: String(tempFinalValues.basic?.type || ""),
        status: String(tempFinalValues.basic?.status || ""),
        price: parseFloat(tempFinalValues.basic?.price || "0"),
        
        // Location tabından gelenler
        city: String(tempFinalValues.location?.city || ""),
        pincode: String(tempFinalValues.location?.pincode || ""),
        address: String(tempFinalValues.location?.address || ""),
        landmark: String(tempFinalValues.location?.landmark || ""),
        
        // Amenities tabından gelenler
        bedrooms: parseInt(tempFinalValues.amenities?.bedrooms || "0"),
        bathrooms: parseInt(tempFinalValues.amenities?.bathrooms || "0"),
        balconies: parseInt(tempFinalValues.amenities?.balconies || "0"),
        furnishing: String(tempFinalValues.amenities?.furnishing || ""),
        parking: String(tempFinalValues.amenities?.parking || ""),
        floors: parseInt(tempFinalValues.amenities?.floors || "0"),
        area: parseFloat(tempFinalValues.amenities?.area || "0"),
        facing: String(tempFinalValues.amenities?.facing || ""),
        age: parseInt(tempFinalValues.amenities?.age || "0"),
        
        // Contact tabından gelenler
        ownerName: String(formData.ownerName || ""),
        ownerEmail: String(formData.ownerEmail || ""),
        ownerPhone: String(formData.ownerPhone || ""),
        showOwnerContact: formData.showOwnerContact === "true",
        
        // Media tabından gelenler
        images: Array.isArray(tempFinalValues.media.images) 
          ? tempFinalValues.media.images 
          : [],
        
        // Varsayılan değerler
        isActive: true,
      };

      // Debug için konsola yazdır
      console.log("Submitting to database:", valuesAsPerDb);

      let response = null;
      if (isEdit) {
        response = await EditProperty(valuesAsPerDb, id);
      } else {
        response = await AddProperty(valuesAsPerDb);
      }

      if (response.error) throw new Error(response.error);
      
      alert(response.message);

      // Kaydettikten sonra user properties sayfasına yönlendir
      router.push("/realestate/user/properties");
    } catch (error: any) {
      console.error("Error submitting property:", error);
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="box">
      <div className="box-header">
        <div className="box-title">
          <i className="ri-contacts-line me-2 text-primary"></i>
          Contact Information
        </div>
        <div className="box-subtitle">
          Step {currentStep + 1} of 5 - Final Step
        </div>
      </div>
      
      <div className="box-body">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Owner Name */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-user-line me-2 text-primary"></i>
                Owner Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="ownerName"
                className="form-control"
                placeholder="Enter owner's full name"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Owner Email */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-mail-line me-2 text-primary"></i>
                Owner Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="ownerEmail"
                className="form-control"
                placeholder="Enter owner's email address"
                value={formData.ownerEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Owner Phone */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-phone-line me-2 text-primary"></i>
                Owner Phone <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="ri-smartphone-line"></i>
                </span>
                <input
                  type="tel"
                  name="ownerPhone"
                  className="form-control"
                  placeholder="Enter owner's phone number"
                  value={formData.ownerPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Show Owner Contact */}
            <div className="mb-4">
              <label className="form-label">
                <i className="ri-shield-user-line me-2 text-primary"></i>
                Show Contact Information <span className="text-danger">*</span>
              </label>
              <select
                name="showOwnerContact"
                className="form-control"
                value={formData.showOwnerContact}
                onChange={handleInputChange}
                required
              >
                <option value="true">Yes - Show contact details publicly</option>
                <option value="false">No - Hide contact details (use query form)</option>
              </select>
              <div className="text-xs text-textmuted dark:text-textmuted/50 mt-1">
                {formData.showOwnerContact === "true" 
                  ? "Contact information will be visible to all users"
                  : "Users will need to use the query form to contact you"}
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          {formData.showOwnerContact === "true" && (
            <div className="mt-4 mb-6">
              <div className="alert alert-warning bg-warning/10 border-warning/20">
                <div className="flex">
                  <i className="ri-alarm-warning-line text-warning text-lg me-2"></i>
                  <div>
                    <h6 className="text-default mb-0">Privacy Notice</h6>
                    <p className="mb-0">
                      Your contact information will be publicly visible on the property listing. 
                      Consider using the query form option if you prefer privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Property Summary */}
          <div className="mt-6 mb-6">
            <div className="box border border-defaultborder dark:border-defaultborder/10">
              <div className="box-header">
                <div className="box-title">
                  <i className="ri-check-double-line me-2 text-success"></i>
                  Property Summary
                </div>
              </div>
              <div className="box-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-textmuted dark:text-textmuted/50 text-sm mb-1">Property Name</p>
                    <p className="font-semibold">{finalValues.basic?.name || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-textmuted dark:text-textmuted/50 text-sm mb-1">Location</p>
                    <p className="font-semibold">{finalValues.location?.city || "Not set"}, {finalValues.location?.landmark || ""}</p>
                  </div>
                  <div>
                    <p className="text-textmuted dark:text-textmuted/50 text-sm mb-1">Price</p>
                    <p className="font-semibold text-primary">
                      ${finalValues.basic?.price ? parseFloat(finalValues.basic.price).toLocaleString() : "0"}
                      {finalValues.basic?.status === 'FOR_RENT' ? '/month' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-textmuted dark:text-textmuted/50 text-sm mb-1">Property Type</p>
                    <p className="font-semibold">{finalValues.basic?.type || "Not set"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 mb-6">
            <div className="flex justify-between text-sm text-textmuted dark:text-textmuted/50 mb-2">
              <span>Step {currentStep + 1} of 5</span>
              <span>100% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div className="bg-success h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between pt-4 border-t border-defaultborder dark:border-defaultborder/10">
            <button
              type="button"
              className="ti-btn ti-btn-light ti-btn-wave"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <i className="ri-arrow-left-line me-1"></i>
              Back
            </button>
            <button
              type="submit"
              className="ti-btn ti-btn-success ti-btn-wave"
              disabled={loading || !formData.ownerName || !formData.ownerEmail || !formData.ownerPhone}
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line align-middle me-1 inline-flex animate-spin"></i>
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <i className="ri-check-line me-1"></i>
                  {isEdit ? 'Update Property' : 'Create Property'}
                </>
              )}
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
                <h6 className="text-default mb-0">Final Step - Review and Submit</h6>
                <p className="mb-0">
                  Review all the information you've entered. Once submitted, your property will be listed 
                  {isEdit ? ' with updated information' : ' and available for viewing'}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;