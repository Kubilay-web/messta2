"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/company/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.err || "Failed to update password");
      } else {
        toast.success(data.success || "Password updated");
        setPassword("");
        setCpassword("");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Password Update
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Password */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Confirm your new password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
