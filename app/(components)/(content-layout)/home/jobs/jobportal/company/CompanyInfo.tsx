"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Image } from "cloudinary-react";
import ImageResizer from "react-image-file-resizer";

export default function CompanyInfo() {
  const [name, setName] = useState("");
  const [vision, setVision] = useState("");
  const [bio, setBio] = useState("");
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/register`,
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.err);

      setName(data.name);
      setBio(data.bio);
      setVision(data.vision);
      setLogo({
        secure_url: data.logoSecureUrl,
        public_id: data.logoPublicId,
      });
      setBanner({
        secure_url: data.bannerSecureUrl,
        public_id: data.bannerPublicId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            bio,
            vision,
            logo,
            banner,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success("Changes saved successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setLoadings(true);
    ImageResizer.imageFileResizer(
      file,
      1280,
      7200,
      "JPEG",
      100,
      0,
      async (uri) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload/image`,
          {
            method: "POST",
            body: JSON.stringify({ logo: uri }),
          },
        );
        const data = await res.json();
        setLogo(data);
        toast.success("Logo uploaded");
        setLoadings(false);
      },
      "base64",
    );
  };

  const handleDelete = async () => {
    setLoadings(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload/image`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: logo.public_id }),
      },
    );
    setLogo(null);
    toast.success("Logo deleted");
    setLoadings(false);
  };

  const handleUploadBanner = async (e) => {
    const file = e.target.files[0];
    setLoadings(true);
    ImageResizer.imageFileResizer(
      file,
      1280,
      7200,
      "JPEG",
      100,
      0,
      async (uri) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload/banner`,
          {
            method: "POST",
            body: JSON.stringify({ banner: uri }),
          },
        );
        const data = await res.json();
        setBanner(data);
        toast.success("Banner uploaded");
        setLoadings(false);
      },
      "base64",
    );
  };

  const handleDeleteBanner = async () => {
    setLoadings(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload/banner`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: banner.public_id }),
      },
    );
    setBanner(null);
    toast.success("Banner deleted");
    setLoadings(false);
  };

  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-auto">
          <div className="col p-5 shadow">
            <h2 className="mb-4 text-center">Company Info</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3 text-center">
                <label
                  className={`btn btn-primary col-12 ${loading ? "disabled" : ""}`}
                >
                  {loading ? "Processing..." : "Upload Logo"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleUpload}
                  />
                </label>
                {logo?.secure_url && (
                  <div>
                    <Image
                      src={logo.secure_url}
                      alt="Logo"
                      width="500"
                      height="300"
                    />
                    <button type="button" onClick={handleDelete}>
                      ❌
                    </button>
                  </div>
                )}
              </div>

              <div className="form-group mb-3 text-center">
                <label
                  className={`btn btn-primary col-12 ${loading ? "disabled" : ""}`}
                >
                  {loading ? "Processing..." : "Upload Banner"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleUploadBanner}
                  />
                </label>
                {banner?.secure_url && (
                  <div>
                    <Image
                      src={banner.secure_url}
                      alt="Banner"
                      width="500"
                      height="300"
                    />
                    <button type="button" onClick={handleDeleteBanner}>
                      ❌
                    </button>
                  </div>
                )}
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3"
                placeholder="Company Name"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-control mb-3"
                placeholder="Company Bio"
                rows={3}
              />
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="form-control mb-3"
                placeholder="Company Vision"
                rows={3}
              />

              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
