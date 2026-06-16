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

  const { countries, fetchCountriesPublic, setUpdatingCountry: setCountryId } =
    useCountryStore();
  const { states, fetchStatesPublic, setSelectedCountryId, setStates } =
    useStateStore();
  const { cities, fetchCitiesPublic, setSelectedStateId, setCities } =
    useCityStore();

  useEffect(() => {
    fetchCountriesPublic();
    fetchStatesPublic();
    fetchCitiesPublic();
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/account`
      );
      if (!response.ok) throw new Error("Failed to fetch account data");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadings(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/account`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            countryId: selectedCountry,
            stateId: selectedState,
            cityId: selectedCity,
            phone_one: primaryPhone,
            phone_two: secondaryPhone,
            address,
            email,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) toast.error(data.err);
      else toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating profile");
    } finally {
      setLoadings(false);
    }
  };

  const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedState("");
    setSelectedCity("");
    setCountryId(countryId);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/state`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryId }),
      });
      const data = await response.json();
      if (!response.ok) toast.error("Failed to fetch states");
      else setStates(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching states");
    }
  };

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity("");
    setSelectedStateId(stateId);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/city`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stateId }),
      });
      const data = await response.json();
      if (!response.ok) toast.error("Failed to fetch cities");
      else setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Error fetching cities");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Location</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>

            <select
              value={selectedState}
              onChange={handleStateChange}
              disabled={!selectedCountry}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.statename}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <h2 className="text-2xl font-semibold my-4 text-gray-800">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Primary phone"
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="tel"
              placeholder="Secondary phone"
              value={secondaryPhone}
              onChange={(e) => setSecondaryPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loadings}
            className={`w-full py-2 mt-2 rounded-lg text-white font-medium ${
              loadings ? "bg-green-300 cursor-not-allowed" : "bg-blue-600 hover:bg-green-700"
            }`}
          >
            {loadings ? "Please wait..." : "Save changes"}
          </button>
        </form>

        <div className="mt-6">
          <AccountPassword />
        </div>
      </div>
    </main>
  );
}
