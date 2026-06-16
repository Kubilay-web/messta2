"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // global import

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
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/basic`,
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        const profile = Array.isArray(data) && data.length > 0 ? data[0] : {};
        console.log("Fetched data:", data);

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
            : null,
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
        },
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
            },
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
      "base64",
    );
  };

  const handleDelete = async () => {
    if (!logo?.public_id) return;

    try {
      setLoading(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/upload/image`,
        {
          method: "PUT",
          body: JSON.stringify({ public_id: logo.public_id }),
          headers: { "Content-Type": "application/json" },
        },
      );
      setLogo(null);
      toast.success("Image deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12 bg-light rounded p-4 shadow-lg">
          <h2 className="mb-4 text-center">Basic Profile</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Upload Resume (PDF)</label>
              <div className="d-flex">
                <input
                  type="file"
                  accept=".pdf"
                  className="form-control"
                  onChange={handleFileChange}
                />
                <button
                  className="btn btn-success ms-2"
                  onClick={handleUploadpdf}
                  type="button"
                >
                  Upload
                </button>
              </div>
              {pdfname && <p className="mt-2">Uploaded: {pdfname}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Picture</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleUpload}
                disabled={loading}
              />
              {logo?.secure_url && (
                <div className="mt-3">
                  <img
                    src={logo.secure_url}
                    alt="Uploaded"
                    className="img-fluid rounded"
                    style={{ maxHeight: "200px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={handleDelete}
                  >
                    ❌ Delete Image
                  </button>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <DatePicker
                onChange={(date) => setDob(date)}
                value={dob}
                style={{ width: "100%", height: "38px" }}
                format="YYYY-MM-DD"
                allowClear
              />
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <label htmlFor="fullname">Full Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title">Title</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="experience"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <label htmlFor="experience">Experience Label</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                id="website"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <label htmlFor="website">Website</label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
