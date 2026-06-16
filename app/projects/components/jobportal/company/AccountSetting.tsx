"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { UserInfo } from "@/app/queries/user";

export default function Register() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserInfo();
      setUser(userData);
    };
    fetchUser();
  }, []);

  let username = user?.username;
  let useremail = user?.email;
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(useremail);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/account`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success(data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Update Detail
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter user name"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Please Wait..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
