"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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

  const handleSubmit = async (e) => {
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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success(data.success);
      }
    } catch (error) {
      console.log(error);
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
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col p-5 shadow">
            <h2 className="m-3 text-center">Update Detail</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4"
                style={{ outline: "none" }}
                placeholder="Enter user name"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
                style={{ outline: "none" }}
                placeholder="Enter your email"
              />

              <br />
              <button type="submit">
                {loading ? "Please Wait" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
