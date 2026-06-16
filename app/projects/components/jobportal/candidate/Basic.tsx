"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { DatePicker } from "antd";
import ImageResizer from "react-image-file-resizer";

export default function Basic() {
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState(null);
  const [fullname, setFullname] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState(null);
  const [file, setFile] = useState(null);
  const [pdfname, setPdfname] = useState("");
  const [cv, setCV] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/basic`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        const profile = Array.isArray(data) && data.length > 0 ? data[0] : {};

        setFullname(profile.full_name || "");
        setTitle(profile.title || "");
        setExperience(profile.experience_lable || "");
        setWebsite(profile.website || "");
        setLogo(
          profile.image_public_id
            ? {
                public_id: profile.image_public_id,
                secure_url: profile.image_secure_url,
              }
            : null
        );
        setDob(profile.birth_date ? moment(profile.birth_date) : null);
        setCV(profile.cv || "");
        setPdfname(profile.cv ? profile.cv.split("/").pop() : "");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/basic`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: fullname,
            birthDate: dob ? dob.toISOString() : null,
            experienceLabel: experience,
            title,
            imagePublicId: logo?.public_id || "",
            imageSecureUrl: logo?.secure_url || "",
            website,
            cv,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || data.err || "Failed to submit");
      } else {
        toast.success(data.msg || "Success");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid PDF file");
      setFile(null);
    }
  };

  const handleUploadpdf = async () => {
    if (!file) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/candidate/upload/cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.secure_url) {
        setCV(data.secure_url);
        setPdfname(data.original_filename);
        toast.success("PDF uploaded successfully");
      } else {
        toast.error(data.error || "Failed to upload CV");
      }
    } catch (error) {
      console.error("CV Upload Error:", error);
      toast.error("PDF upload failed");
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    ImageResizer.imageFileResizer(
      file,
      1280,
      720,
      "JPEG",
      100,
      0,
      async (uri) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/upload/image`,
            {
              method: "POST",
              body: JSON.stringify({ logo: uri }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json();
          setLogo(data);
          toast.success("Image uploaded");
        } catch (err) {
          console.error(err);
          toast.error("Image upload failed");
        } finally {
          setLoading(false);
        }
      },
      "base64"
    );
  };

  const handleDelete = async () => {
    if (!logo?.public_id) return;

    try {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/upload/image`, {
        method: "PUT",
        body: JSON.stringify({ public_id: logo.public_id }),
        headers: { "Content-Type": "application/json" },
      });
      setLogo(null);
      toast.success("Image deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Basic Profile</h2>

        {/* Upload Resume */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Upload Resume (PDF)</label>
          <div className="flex gap-2">
            <input
              type="file"
              accept=".pdf"
              className="flex-1 px-3 py-2 border rounded-md"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700"
              onClick={handleUploadpdf}
            >
              Upload
            </button>
          </div>
          {pdfname && <p className="text-sm text-gray-600">Uploaded: {pdfname}</p>}
        </div>

        {/* Upload Picture */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Upload Picture</label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleUpload}
            disabled={loading}
          />
          {logo?.secure_url && (
            <div className="mt-2 space-y-2">
              <img src={logo.secure_url} alt="Uploaded" className="w-40 h-40 object-cover rounded-md" />
              <button
                type="button"
                className="px-3 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                onClick={handleDelete}
              >
                ❌ Delete Image
              </button>
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
          <DatePicker
            onChange={(date) => setDob(date)}
            value={dob}
            className="w-full px-3 py-2 border rounded-md"
            format="YYYY-MM-DD"
            allowClear
          />
        </div>

        {/* Text Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Experience Label"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-medium ${
            loading ? "bg-green-300 cursor-not-allowed" : "bg-blue-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </main>
  );
}
