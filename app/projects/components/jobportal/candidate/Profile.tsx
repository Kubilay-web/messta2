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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/profile`);
      if (!response.ok) throw new Error("failed to fetch");
      const data = await response.json();

      setGender(data?.candidate?.gender || "");
      setMaritalStatus(data?.candidate?.marital_status || "");
      setBio(data?.candidate?.bio || "");
      setStatus(data?.candidate?.status || "");
      setSelectedProfessions(data?.candidate?.professionIds || []);

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender,
          maritalStatus,
          status,
          bio,
          selectedLanguages,
          selectedProfessions,
          selectedSkill,
        }),
      });

      const data = await response.json();
      if (!response.ok) toast.error(data?.err);
      else toast.success("Successfully profile updated");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => setSearchKeyward(value);
  const handleProfessionChanges = (value: string[]) => setSelectedProfessions(value);
  const handleSkillChanges = (value: string[]) => setSelectedSkill(value);
  const handleLanguageChanges = (value: string[]) => setSelectedLanguages(value);

  const filteredProfessions = professions.filter((p) =>
    p.name.toLowerCase().includes(searchKeyward.toLowerCase())
  );
  const filteredSkill = skills.filter((p) =>
    p.name.toLowerCase().includes(searchKeyward.toLowerCase())
  );
  const filteredLanguage = languages.filter((p) =>
    p.name.toLowerCase().includes(searchKeyward.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Profile Section
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Gender */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select gender*</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Marital Status */}
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select marital status</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
          </select>

          {/* Professions */}
          <Select
            mode="multiple"
            value={selectedProfessions}
            onChange={handleProfessionChanges}
            onSearch={handleSearch}
            filterOption={false}
            showSearch
            placeholder="Select professions"
            className="w-full"
            style={{ height: "50px" }}
          >
            {filteredProfessions.map((p) => (
              <Option key={p.id} value={p.id}>
                {p.name}
              </Option>
            ))}
          </Select>

          {/* Skills */}
          <Select
            mode="multiple"
            value={selectedSkill}
            onChange={handleSkillChanges}
            onSearch={handleSearch}
            filterOption={false}
            showSearch
            placeholder="Select skills"
            className="w-full"
            style={{ height: "50px" }}
          >
            {filteredSkill.map((s) => (
              <Option key={s.id} value={s.id}>
                {s.name}
              </Option>
            ))}
          </Select>

          {/* Languages */}
          <Select
            mode="multiple"
            value={selectedLanguages}
            onChange={handleLanguageChanges}
            onSearch={handleSearch}
            filterOption={false}
            showSearch
            placeholder="Select languages"
            className="w-full"
            style={{ height: "50px" }}
          >
            {filteredLanguage.map((l) => (
              <Option key={l.id} value={l.id}>
                {l.name}
              </Option>
            ))}
          </Select>

          {/* Availability 
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select availability</option>
            <option value="available">Available</option>
            <option value="not available">Not available</option>
          </select>

          {/* Bio */}
          <textarea
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors"
          >
            {loading ? "Please wait..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
