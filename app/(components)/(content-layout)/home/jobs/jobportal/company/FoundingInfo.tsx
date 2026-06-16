"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useOrganizationStore } from "@/app/job-portal-store/organization";
import { useIndustryStore } from "@/app/job-portal-store/industry";
import { useTeamStore } from "@/app/job-portal-store/team";
import { useCountryStore } from "@/app/job-portal-store/country";
import { useStateStore } from "@/app/job-portal-store/state";
import { useCityStore } from "@/app/job-portal-store/city";

export default function FoundingInfo() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState("");
  const [address, setAddress] = useState("");

  // Selected values
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Zustand stores
  const { organizations, fetchOrganizationsPublic: fetchOrganizationPublic } =
    useOrganizationStore();
  const { industries, fetchIndustriesPublic } = useIndustryStore();
  const { teams, fetchTeamsPublic: fetchTeamPublic } = useTeamStore();
  const { countries, fetchCountriesPublic: fetchCountryPublic } =
    useCountryStore();
  const {
    states,
    fetchStatesPublic: fetchStatePublic,
    setStates: setState,
  } = useStateStore();
  const {
    cities,
    fetchCitiesPublic: fetchCityPublic,
    setCities: setCity,
  } = useCityStore();

  console.log("useCityStore", useCityStore);

  useEffect(() => {
    // Fetch initial data
    fetchIndustriesPublic();
    fetchOrganizationPublic();
    fetchTeamPublic();
    fetchCountryPublic();
    fetchStatePublic();
    fetchCityPublic();
    fetchData();
  }, []);

  const handleCountryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    try {
      const countryId = e.target.value;
      setSelectedCountry(countryId);
      setSelectedState("");
      setSelectedCity("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/state`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ countryId }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error("Failed to fetch states");
      } else {
        setState(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const stateId = e.target.value;
      setSelectedState(stateId);
      setSelectedCity("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/city`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stateId }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error("Failed to fetch cities");
      } else {
        setCity(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/foundinginfo`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch company data");
      }

      const data = await response.json();

      setAddress(data.address || "");
      setMap(data.mapLink || "");
      setSelectedOrganization(data.organizationTypeId || "");
      setSelectedTeam(data.teamTypeId || "");
      setSelectedIndustry(data.industryTypeId || "");
      setStartDate(
        data?.establishmentDate ? new Date(data.establishmentDate) : null,
      );
      setEmail(data.email || "");
      setContact(data.phone || "");
      setWebsite(data.website || "");
      setSelectedCity(data.cityId || "");
      setSelectedCountry(data.countryId || "");
      setSelectedState(data.stateId || "");
    } catch (error) {
      console.log(error);
      toast.error("Failed to load company data");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data to be sent to the API
    const dataToSend = {
      industryTypeId: selectedIndustry,
      organizationTypeId: selectedOrganization,
      teamTypeId: selectedTeam,
      establishmentDate: startDate ? startDate.toISOString() : null,
      website,
      email,
      phone: contact,
      countryId: selectedCountry,
      stateId: selectedState,
      cityId: selectedCity,
      address,
      mapLink: map,
    };

    console.log("Sending data:", dataToSend); // Log the data being sent

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/foundinginfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err || "Failed to save data");
      } else {
        toast.success("Changes saved successfully");
      }
    } catch (error) {
      console.error(error); // Log error for debugging
      toast.error("An error occurred");
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
    <main className="mb-5">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col p-5 shadow">
            <h2 className="mb-4 text-center">Founding info</h2>

            <form onSubmit={handleSubmit}>
              {/* Industry Select */}
              <select
                className="mb-4"
                style={{
                  width: "calc(100% - 20px)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "15px",
                  appearance: "none",
                  outline: "none",
                }}
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                <option value="">Select an industry Type</option>
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                ))}
              </select>

              {/* Organization Select */}
              <select
                className="mb-4"
                style={{
                  width: "calc(100% - 20px)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "15px",
                  appearance: "none",
                  outline: "none",
                }}
                value={selectedOrganization}
                onChange={(e) => setSelectedOrganization(e.target.value)}
              >
                <option value="">Select an Organization type</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>

              {/* Team Size Select */}
              <select
                className="mb-4"
                style={{
                  width: "calc(100% - 20px)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "15px",
                  outline: "none",
                  appearance: "none",
                }}
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="">Select a team size</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              {/* Establishment Date */}
              <div className="datePickerContainer">
                <label htmlFor="establishmentDate">
                  Company establishment date
                </label>
                <input
                  type="date"
                  id="establishmentDate"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    setStartDate(
                      e.target.value ? new Date(e.target.value) : null,
                    )
                  }
                  className="datePickerInput mb-4"
                  style={{
                    outline: "none",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2px solid #ccc",
                    backgroundColor: "#fff",
                  }}
                />
              </div>

              {/* Website */}
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mb-4"
                style={{
                  outline: "none",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                }}
                placeholder="Enter your website URL"
              />

              {/* Email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
                style={{
                  outline: "none",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                }}
                placeholder="Enter your email address"
              />

              {/* Phone */}
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mb-4"
                style={{
                  outline: "none",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                }}
                placeholder="Enter your phone number"
              />

              {/* Country Select */}
              <select
                className="mb-4"
                value={selectedCountry}
                onChange={handleCountryChange}
                style={{
                  width: "calc(100% - 20px)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  outline: "none",
                  fontSize: "15px",
                  appearance: "none",
                }}
              >
                <option value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* State Select */}
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="mb-4"
                style={{
                  width: "calc(100% - 20px)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "15px",
                  outline: "none",
                  appearance: "none",
                }}
                disabled={!selectedCountry}
              >
                <option value="">Select a state</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.statename}
                  </option>
                ))}
              </select>

              {/* City Select */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="mb-4"
                style={{
                  width: "calc(100% - 20px)",
                  padding: "10px",
                  outline: "none",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  fontSize: "15px",
                  appearance: "none",
                }}
                disabled={!selectedState}
              >
                <option value="">Select a city</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Address */}
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mb-4"
                style={{
                  outline: "none",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                }}
                placeholder="Enter your address"
              />

              {/* Map Link */}
              <input
                type="text"
                value={map}
                onChange={(e) => setMap(e.target.value)}
                className="mb-4"
                style={{
                  outline: "none",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                }}
                placeholder="Enter your Map link"
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Please wait..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
