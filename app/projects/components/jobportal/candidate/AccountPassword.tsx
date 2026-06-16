"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== cpassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success("Password updated successfully");
        setPassword("");
        setCpassword("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Update Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />

          <input
            type="password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            placeholder="Confirm your password"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />

          <button
            type="submit"
            disabled={loading || !password || !cpassword}
            className={`w-full py-2 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
