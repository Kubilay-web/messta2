"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Image } from "cloudinary-react";
import ImageResizer from "react-image-file-resizer";

export default function CompanyInfo() {
  const [name, setName] = useState("");
  const [vision, setVision] = useState("");
  const [bio, setBio] = useState("");
  const [logo, setLogo] = useState<any>(null);
  const [banner, setBanner] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/register`
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        }
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

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    setLoadings(true);
    ImageResizer.imageFileResizer(
      file,
      1280,
      720,
      "JPEG",
      100,
      0,
      async (uri) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload/image`,
          {
            method: "POST",
            body: JSON.stringify({ logo: uri }),
          }
        );
        const data = await res.json();
        setLogo(data);
        toast.success("Logo uploaded");
        setLoadings(false);
      },
      "base64"
    );
  };

  const handleDelete = async () => {
    setLoadings(true);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload/image`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: logo.public_id }),
    });
    setLogo(null);
    toast.success("Logo deleted");
    setLoadings(false);
  };

  const handleUploadBanner = async (e: any) => {
    const file = e.target.files[0];
    setLoadings(true);
    ImageResizer.imageFileResizer(
      file,
      1280,
      720,
      "JPEG",
      100,
      0,
      async (uri) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload/banner`,
          {
            method: "POST",
            body: JSON.stringify({ banner: uri }),
          }
        );
        const data = await res.json();
        setBanner(data);
        toast.success("Banner uploaded");
        setLoadings(false);
      },
      "base64"
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
      }
    );
    setBanner(null);
    toast.success("Banner deleted");
    setLoadings(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Company Info
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div className="text-center">
            <label className="w-full flex flex-col items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg shadow cursor-pointer hover:bg-blue-700 transition">
              {loadings ? "Processing..." : "Upload Logo"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleUpload}
                disabled={loadings}
              />
            </label>
            {logo?.secure_url && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <Image
                  src={logo.secure_url}
                  alt="Logo"
                  width="300"
                  height="200"
                  className="rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌ Delete Logo
                </button>
              </div>
            )}
          </div>

          {/* Banner Upload */}
          <div className="text-center">
            <label className="w-full flex flex-col items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg shadow cursor-pointer hover:bg-indigo-700 transition">
              {loadings ? "Processing..." : "Upload Banner"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleUploadBanner}
                disabled={loadings}
              />
            </label>
            {banner?.secure_url && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <Image
                  src={banner.secure_url}
                  alt="Banner"
                  width="500"
                  height="250"
                  className="rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={handleDeleteBanner}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌ Delete Banner
                </button>
              </div>
            )}
          </div>

          {/* Inputs */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Company Name"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Company Bio"
            rows={3}
          />

          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Company Vision"
            rows={3}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-green-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
