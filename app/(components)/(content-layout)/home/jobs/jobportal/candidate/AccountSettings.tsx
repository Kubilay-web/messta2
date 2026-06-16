"use client";
import { useState, useEffect } from "react";
import { useCountryStore } from "@/app/job-portal-store/country";
import { useStateStore } from "@/app/job-portal-store/state";
import { useCityStore } from "@/app/job-portal-store/city";
import toast from "react-hot-toast";
import AccountPassword from "./AccountPassword";

export default function Account() {
  const [address, setAddress] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loadings, setLoadings] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Zustand stores
  const {
    countries,
    fetchCountriesPublic,
    setUpdatingCountry: setCountryId,
  } = useCountryStore();

  const { states, fetchStatesPublic, setSelectedCountryId, setStates } =
    useStateStore();

  const { cities, fetchCitiesPublic, setSelectedStateId, setCities } =
    useCityStore();

  useEffect(() => {
    // Initialize data
    fetchCountriesPublic();
    fetchStatesPublic();
    fetchCitiesPublic();
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/account`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch account data");
      }

      const data = await response.json();

      setSelectedCountry(data?.country?.id || "");
      setSelectedState(data?.state?.id || "");
      setSelectedCity(data?.city?.id || "");
      setAddress(data?.address || "");
      setPrimaryPhone(data?.phone_one || "");
      setSecondaryPhone(data?.phone_two || "");
      setEmail(data?.email || "");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load account data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting:", {
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      phone_one: primaryPhone,
      phone_two: secondaryPhone,
      address,
      email,
    });

    try {
      setLoadings(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            countryId: selectedCountry,
            stateId: selectedState,
            cityId: selectedCity,
            phone_one: primaryPhone,
            phone_two: secondaryPhone,
            address,
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
      } else {
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating profile");
    } finally {
      setLoadings(false);
    }
  };

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedState("");
    setSelectedCity("");
    setCountryId(countryId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/state`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ countryId }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to fetch states");
      } else {
        setStates(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching states");
    }
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity("");
    setSelectedStateId(stateId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/city`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stateId }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to fetch cities");
      } else {
        setCities(data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Error fetching cities");
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
        <div className="row d-flex justify-content-center align-items-center h-auto">
          <div className="col p-5 shadow">
            <h2 className="mb-2">Location</h2>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <select
                    className="mb-4"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "15px",
                      outline: "none",
                      appearance: "none",
                    }}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="mb-4"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "15px",
                      outline: "none",
                      appearance: "none",
                    }}
                    value={selectedState}
                    onChange={handleStateChange}
                    disabled={!selectedCountry}
                  >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.statename}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="mb-4"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "15px",
                      appearance: "none",
                      outline: "none",
                    }}
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <textarea
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "15px",
                  appearance: "none",
                  outline: "none",
                }}
                className="mb-4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />

              <h2 className="mb-5">Contact details</h2>
              <div className="row">
                <div className="col-md-6">
                  <input
                    placeholder="Primary phone"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "15px",
                      appearance: "none",
                      outline: "none",
                    }}
                    type="tel"
                    className="mb-4"
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    placeholder="Secondary phone"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "2px solid #ccc",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "15px",
                      appearance: "none",
                      outline: "none",
                    }}
                    type="tel"
                    className="mb-4"
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                  />
                </div>
              </div>

              <input
                placeholder="Email"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "15px",
                  appearance: "none",
                  outline: "none",
                }}
                type="email"
                className="mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={loadings}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {loadings ? "Please wait..." : "Save changes"}
              </button>
            </form>

            <AccountPassword />
          </div>
        </div>
      </div>
    </main>
  );
}
