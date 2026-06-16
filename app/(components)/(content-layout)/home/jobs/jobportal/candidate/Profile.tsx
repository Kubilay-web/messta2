"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Select } from "antd";
const { Option } = Select;
import { useSkillStore } from "@/app/job-portal-store/skill";
import { useLanguageStore } from "@/app/job-portal-store/language";
import { useProfessionStore } from "@/app/job-portal-store/profession";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [searchKeyward, setSearchKeyward] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);

  const { skills, fetchSkillsPublic } = useSkillStore();
  const { languages, fetchLanguagesPublic } = useLanguageStore();
  const { professions, fetchProfessionsPublic } = useProfessionStore();

  useEffect(() => {
    fetchSkillsPublic();
    fetchProfessionsPublic();
    fetchLanguagesPublic();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/profile`,
      );
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const data = await response.json();

      setGender(data?.candidate?.gender || "");
      setMaritalStatus(data?.candidate?.marital_status || "");
      setBio(data?.candidate?.bio || "");
      setStatus(data?.candidate?.status || "");
      setSelectedProfessions(data?.candidate?.professionIds || []);

      // Skill ve Language id'lerini flat şekilde al
      const skillIds = data?.skill?.flatMap((s) => s.skillIds) ?? [];
      const langIds = data?.language?.flatMap((l) => l.langIds) ?? [];

      setSelectedSkill(skillIds);
      setSelectedLanguages(langIds);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gender,
            maritalStatus,
            status,
            bio,
            selectedLanguages,
            selectedProfessions,
            selectedSkill,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.err);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Successfully profile updated");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyward(value);
  };

  const handleProfessionChanges = (value: string[]) => {
    setSelectedProfessions(value);
  };

  const handleSkillChanges = (value: string[]) => {
    setSelectedSkill(value);
  };

  const handleLanguageChanges = (value: string[]) => {
    setSelectedLanguages(value);
  };

  const filteredProfessions = professions.filter((p) =>
    p.name.toLowerCase().includes(searchKeyward.toLowerCase()),
  );

  const filteredSkill = skills.filter((p) =>
    p.name.toLowerCase().includes(searchKeyward.toLowerCase()),
  );

  const filteredLanguage = languages.filter((p) =>
    p.name.toLowerCase().includes(searchKeyward.toLowerCase()),
  );

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
            <h2
              className="mb-1 text-center"
              style={{
                color: "black",
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                padding: "1px",
              }}
            >
              Profile Section
            </h2>

            <form onSubmit={handleSubmit}>
              <select
                className="mb-4"
                placeholder="Enter your gender name"
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
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender*</option>
                <option key="1" value="male">
                  Male
                </option>
                <option key="2" value="female">
                  Female
                </option>
              </select>

              <select
                className="mb-4"
                style={{
                  width: "calc(100% - 20px)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#fff",
                  outline: "none",
                  color: "#333",
                  fontSize: "15px",
                  appearance: "none",
                }}
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <option value="">Select marital status</option>
                <option key="1" value="married">
                  Married
                </option>
                <option key="2" value="single">
                  Single
                </option>
              </select>

              <Select
                className="mb-4"
                mode="multiple"
                style={{
                  width: "calc(100% - 20px)",
                  height: "50px",
                }}
                placeholder="Select professions"
                onChange={handleProfessionChanges}
                value={selectedProfessions}
                onSearch={handleSearch}
                filterOption={false}
                showSearch
              >
                {filteredProfessions.map((profession) => (
                  <Option key={profession.id} value={profession.id}>
                    {profession.name}
                  </Option>
                ))}
              </Select>

              <Select
                className="mb-4"
                mode="multiple"
                style={{
                  width: "calc(100% - 20px)",
                  height: "50px",
                }}
                placeholder="Select skills"
                onChange={handleSkillChanges}
                value={selectedSkill}
                onSearch={handleSearch}
                filterOption={false}
                showSearch
              >
                {filteredSkill.map((skill) => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.name}
                  </Option>
                ))}
              </Select>

              <Select
                className="mb-4"
                mode="multiple"
                style={{
                  width: "calc(100% - 20px)",
                  height: "50px",
                }}
                placeholder="Select language"
                onChange={handleLanguageChanges}
                value={selectedLanguages}
                onSearch={handleSearch}
                filterOption={false}
                showSearch
              >
                {filteredLanguage.map((language) => (
                  <Option key={language.id} value={language.id}>
                    {language.name}
                  </Option>
                ))}
              </Select>

              <select
                className="mb-4"
                style={{
                  width: "calc(100% - 20px)",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  color: "#333",
                  outline: "none",
                  fontSize: "15px",
                  appearance: "none",
                }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select availability</option>
                <option key="1" value="available">
                  Available
                </option>
                <option key="2" value="not available">
                  Not available
                </option>
              </select>

              <textarea
                rows={5}
                cols={120}
                className="mb-4"
                style={{ outline: "none" }}
                placeholder="Enter your bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
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
