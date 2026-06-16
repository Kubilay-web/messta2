"use client";

import React, { useRef } from "react";
import { PropertiesFormStepProps } from ".";
import Image from "next/image";

// Cloudinary bilgileri .env'den gelsin
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

function Media({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const [tempFiles, setTempFiles] = React.useState<any[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Upload Cloudinary
  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload only image files');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.secure_url) {
        // save secure_url + delete_token
        setTempFiles((prev) => [...prev, data]);
        setFinalValues({
          ...finalValues,
          media: {
            newlyUploadedFiles: [...tempFiles, data],
            images: [...finalValues.media.images, data.secure_url],
          },
        });
        alert("Upload successful!");
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setUploading(false);
    }
  };

  // ✅ File input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  // ✅ Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ Delete Cloudinary (frontend)
  const handleDelete = async (imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    const fileToDelete = tempFiles.find((f) => f.secure_url === imageUrl);

    if (!fileToDelete || !fileToDelete.delete_token) {
      // eski resimse sadece local array'den sil
      const filteredImages = finalValues.media.images.filter((img) => img !== imageUrl);
      setFinalValues({
        ...finalValues,
        media: { ...finalValues.media, images: filteredImages },
      });
      return;
    }

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/delete_by_token`,
        {
          method: "POST",
          body: JSON.stringify({ token: fileToDelete.delete_token }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.result === "ok") {
        // silindikten sonra güncelle
        const updatedImages = finalValues.media.images.filter((img) => img !== imageUrl);
        setFinalValues({
          ...finalValues,
          media: { ...finalValues.media, images: updatedImages },
        });
        setTempFiles((prev) => prev.filter((f) => f.secure_url !== imageUrl));
        alert("Deleted successfully!");
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Delete error");
    }
  };

  const onFinish = () => {
    if (finalValues.media.images.length === 0) {
      alert("Please upload at least one image before proceeding");
      return;
    }

    setFinalValues({
      ...finalValues,
      media: {
        newlyUploadedFiles: tempFiles,
        images: finalValues.media.images,
      },
    });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="box">
      <div className="box-header">
        <div className="box-title">
          <i className="ri-image-line me-2 text-primary"></i>
          Property Images
        </div>
        <div className="box-subtitle">
          Step {currentStep + 1} of 4 - Upload property photos
        </div>
      </div>
      
      <div className="box-body">
        {/* Upload Area */}
        <div className="mb-6">
          <div 
            className="border-2 border-dashed border-defaultborder dark:border-defaultborder/10 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={handleUploadClick}
          >
            <div className="mb-4">
              <i className="ri-upload-cloud-2-line text-4xl text-primary"></i>
            </div>
            <h5 className="font-semibold mb-2">Click to upload property images</h5>
            <p className="text-textmuted dark:text-textmuted/50 mb-3">
              Upload high-quality photos of your property. JPG, PNG, WebP up to 5MB
            </p>
            <button
              type="button"
              className="ti-btn ti-btn-primary ti-btn-wave"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <i className="ri-loader-4-line align-middle me-1 inline-flex animate-spin"></i>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="ri-upload-line me-1"></i>
                  Choose Files
                </>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              multiple
            />
          </div>
        </div>

        {/* Uploaded Images */}
        {finalValues.media.images.length > 0 ? (
          <>
            <div className="mb-4">
              <h6 className="font-semibold mb-3">
                <i className="ri-gallery-line me-2"></i>
                Uploaded Images ({finalValues.media.images.length})
              </h6>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {finalValues.media.images.map((image: string, index: number) => (
                  <div
                    key={image}
                    className="relative border border-defaultborder dark:border-defaultborder/10 rounded-lg overflow-hidden group"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={image}
                        alt={`Property image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        className="ti-btn ti-btn-danger ti-btn-sm"
                        onClick={() => handleDelete(image)}
                      >
                        <i className="ri-delete-bin-line me-1"></i>
                        Delete
                      </button>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {index === 0 ? "Cover" : index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Tips */}
            <div className="alert alert-info bg-info/10 border-info/20 mb-6">
              <div className="flex">
                <i className="ri-lightbulb-flash-line text-info text-lg me-2"></i>
                <div>
                  <h6 className="text-default mb-0">Image Tips</h6>
                  <ul className="text-sm mb-0 mt-1">
                    <li>First image will be used as the cover photo</li>
                    <li>Drag and drop to reorder images</li>
                    <li>Upload at least 3-5 high-quality photos for best results</li>
                    <li>Include photos of all rooms, exterior, and amenities</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <i className="ri-image-2-line text-5xl text-gray-300 mb-4"></i>
            <h5 className="text-gray-500 mb-2">No images uploaded yet</h5>
            <p className="text-gray-400">Upload property photos to continue</p>
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
            type="button"
            className="ti-btn ti-btn-primary ti-btn-wave"
            onClick={onFinish}
            disabled={finalValues.media.images.length === 0}
          >
            Next Step
            <i className="ri-arrow-right-line ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Media;