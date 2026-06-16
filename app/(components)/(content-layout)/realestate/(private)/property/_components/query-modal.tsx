"use client";

import { AddQuery } from "../../../actions/queriest";
import React from "react";

function QueryModal({ propertyId }: { propertyId: string }) {
  const [showQueryModal, setShowQueryModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    name: "",
    quoteAmount: "",
    message: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Veritabanı schema'sına uygun formatta veri hazırla
      const queryData = {
        name: String(formValues.name || ""),
        phoneNumber: String(formValues.phoneNumber || ""),
        message: String(formValues.message || ""),
        quoteAmount: parseFloat(formValues.quoteAmount || "0"), // Float'a çevir
        propertyId: String(propertyId || ""),
      };

      console.log("Sending query data:", queryData);

      const response = await AddQuery(queryData);
      if (response.error) throw new Error(response.error);
      alert("Query Sent Successfully");
      setShowQueryModal(false);
      setFormValues({
        name: "",
        quoteAmount: "",
        message: "",
        phoneNumber: "",
      });
    } catch (error: any) {
      console.error("Error sending query:", error);
      alert(error.message || "Failed to send query");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-7">
      {/* Query Button */}
      <button
        className="ti-btn ti-btn-lg ti-btn-primary w-full"
        onClick={() => setShowQueryModal(true)}
        type="button"
      >
        <i className="ri-message-3-line me-2"></i>
        Query For More Info
      </button>

      {/* Modal */}
      {showQueryModal && (
        <div className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 fixed top-0 start-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto">
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-7 opacity-100 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="box flex flex-col bg-white shadow-xl rounded-xl dark:bg-bodybg">
              {/* Modal Header */}
              <div className="flex justify-between items-center py-3 px-4 border-b border-defaultborder dark:border-defaultborder/10">
                <h3 className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70">
                  <i className="ri-message-3-line me-2 text-primary"></i>
                  Send a Query to the Owner
                </h3>
                <button
                  type="button"
                  className="ti-btn flex-shrink-0 ti-btn-soft-secondary ti-btn-wave !py-1 !px-2 !text-[0.75rem]"
                  onClick={() => setShowQueryModal(false)}
                  disabled={loading}
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              {/* Modal Body */}
              <div className="box-body p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="ri-user-line me-2 text-primary"></i>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Please enter your name"
                      value={formValues.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Quote Amount Field */}
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="ri-money-dollar-circle-line me-2 text-primary"></i>
                      Quote Amount ($)
                    </label>
                    <input
                      type="number"
                      name="quoteAmount"
                      className="form-control"
                      placeholder="Please enter your quote amount"
                      value={formValues.quoteAmount}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      step="0.01"
                      min="0"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="ri-chat-1-line me-2 text-primary"></i>
                      Message
                    </label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows={3}
                      placeholder="Please enter your message"
                      value={formValues.message}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div className="mb-4">
                    <label className="form-label">
                      <i className="ri-phone-line me-2 text-primary"></i>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="Please enter your phone"
                      value={formValues.phoneNumber}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-defaultborder dark:border-defaultborder/10">
                    <button
                      type="button"
                      className="ti-btn ti-btn-light ti-btn-wave"
                      onClick={() => setShowQueryModal(false)}
                      disabled={loading}
                    >
                      <i className="ri-close-line me-1"></i>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ti-btn ti-btn-primary ti-btn-wave"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <i className="ri-loader-4-line align-middle me-1 inline-flex animate-spin"></i>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-line me-1"></i>
                          Send
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {showQueryModal && (
        <div 
          className="fixed top-0 left-0 z-[60] w-full h-full bg-black/50"
          onClick={() => !loading && setShowQueryModal(false)}
        ></div>
      )}
    </div>
  );
}

export default QueryModal;