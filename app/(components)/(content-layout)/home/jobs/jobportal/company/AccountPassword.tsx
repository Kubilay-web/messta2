"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col p-5 shadow">
            <h2 className="m-4 text-center">Password Update</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
                style={{ outline: "none" }}
                placeholder="Enter your password"
              />

              <input
                type="password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                className="mb-4"
                style={{ outline: "none" }}
                placeholder="Enter your new password"
              />

              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
