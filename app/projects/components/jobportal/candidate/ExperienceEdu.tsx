"use client";

import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { RiEdit2Line, RiDeleteBin6Line, RiSave2Line, RiCloseLine } from "react-icons/ri";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Experience() {
  const [loading, setLoading] = useState(false);

  // Experience states
  const [experiences, setExperiences] = useState([]);
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [responsibilities, setResponsibilities] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [editedExperience, setEditedExperience] = useState(null);

  // Education states
  const [loadings, setLoadings] = useState(false);
  const [level, setLevel] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState(null);
  const [notes, setNotes] = useState("");
  const [educations, setEducations] = useState([]);
  const [editedEducation, setEditedEducation] = useState(null);

  useEffect(() => {
    fetchData();
    fetchDataEdu();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/experience`);
      if (!res.ok) throw new Error("Failed to fetch experiences");
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataEdu = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/education`);
      if (!res.ok) throw new Error("Failed to fetch education");
      const data = await res.json();
      setEducations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/experience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          department,
          designation,
          start: start?.toISOString(),
          end: end?.toISOString(),
          responsibilities,
          currently_working: currentlyWorking,
        }),
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.err);
      else {
        toast.success("Experience added successfully");
        setCompany(""); setDepartment(""); setDesignation(""); setResponsibilities(""); setStart(null); setEnd(null); setCurrentlyWorking(false);
        fetchData();
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/experience/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) toast.error(data.err);
      else {
        toast.success("Deleted successfully");
        setExperiences(experiences.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/experience/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedExperience),
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.err);
      else {
        toast.success("Experience updated");
        fetchData();
        setEditedExperience(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEduSubmit = async (e) => {
    e.preventDefault();
    setLoadings(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/education`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, degree, year: year?.toISOString(), notes }),
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.err);
      else {
        toast.success("Education added successfully");
        setLevel(""); setDegree(""); setYear(null); setNotes("");
        fetchDataEdu();
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    } finally {
      setLoadings(false);
    }
  };

  const handleSaveEdited = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/education/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedEducation),
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.err);
      else {
        toast.success("Education updated");
        fetchDataEdu();
        setEditedEducation(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteed = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate/education/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) toast.error(data.err);
      else {
        toast.success("Deleted successfully");
        fetchDataEdu();
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-10">
      <ToastContainer />
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-10">
        <h2 className="text-2xl font-bold text-center">Experience & Education</h2>

        {/* Add Experience */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="input-custom"/>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="input-custom"/>
          <input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" className="input-custom"/>
          <DatePicker value={start} onChange={setStart} placeholder="Start Date" className="w-full"/>
          <DatePicker value={end} onChange={setEnd} placeholder="End Date" className="w-full"/>
          <textarea value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} placeholder="Responsibilities" className="col-span-1 md:col-span-2 textarea-custom"/>
          <label className="flex items-center gap-2 col-span-1 md:col-span-2">
            <input type="checkbox" checked={currentlyWorking} onChange={(e) => setCurrentlyWorking(e.target.checked)} className="w-5 h-5"/>
            Currently Working
          </label>
          <button type="submit" className="btn-green col-span-1 md:col-span-2">{loading ? "Please wait..." : "Add Experience"}</button>
        </form>

        {/* Experience Table */}
        <div className="overflow-x-auto">
          <h3 className="font-semibold mb-2">Experience</h3>
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Company</th>
                <th className="p-2">Department</th>
                <th className="p-2">Designation</th>
                <th className="p-2">Start</th>
                <th className="p-2">End</th>
                <th className="p-2">Responsibilities</th>
                <th className="p-2">Currently Working</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id} className="even:bg-gray-50">
                  {editedExperience?.id === exp.id ? (
                    <>
                      <td className="p-2"><input value={editedExperience.company} onChange={(e)=>setEditedExperience({...editedExperience, company:e.target.value})} className="input-custom"/></td>
                      <td className="p-2"><input value={editedExperience.department} onChange={(e)=>setEditedExperience({...editedExperience, department:e.target.value})} className="input-custom"/></td>
                      <td className="p-2"><input value={editedExperience.designation} onChange={(e)=>setEditedExperience({...editedExperience, designation:e.target.value})} className="input-custom"/></td>
                      <td className="p-2"><DatePicker value={moment(editedExperience.start)} onChange={(date)=>setEditedExperience({...editedExperience, start: date})} className="w-full"/></td>
                      <td className="p-2"><DatePicker value={moment(editedExperience.end)} onChange={(date)=>setEditedExperience({...editedExperience, end: date})} className="w-full"/></td>
                      <td className="p-2"><input value={editedExperience.responsibilities} onChange={(e)=>setEditedExperience({...editedExperience, responsibilities:e.target.value})} className="input-custom"/></td>
                      <td className="p-2"><input type="checkbox" checked={editedExperience.currently_working} onChange={(e)=>setEditedExperience({...editedExperience, currently_working:e.target.checked})} className="w-5 h-5"/></td>
                      <td className="p-2 flex gap-2">
                        <button onClick={()=>handleSaveEdit(exp.id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"><RiSave2Line/></button>
                        <button onClick={()=>setEditedExperience(null)} className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500"><RiCloseLine/></button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{exp.company}</td>
                      <td className="p-2">{exp.department}</td>
                      <td className="p-2">{exp.designation}</td>
                      <td className="p-2">{moment(exp.start).format("YYYY-MM-DD")}</td>
                      <td className="p-2">{moment(exp.end).format("YYYY-MM-DD")}</td>
                      <td className="p-2">{exp.responsibilities}</td>
                      <td className="p-2">{exp.currently_working ? "Yes" : "No"}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={() => setEditedExperience(exp)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"><RiEdit2Line/></button>
                        <button onClick={() => handleDelete(exp.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600"><RiDeleteBin6Line/></button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Education */}
        <form onSubmit={handleEduSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level" className="input-custom"/>
          <input value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="Degree" className="input-custom"/>
          <DatePicker picker="year" value={year} onChange={setYear} placeholder="Year" className="w-full"/>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="col-span-1 md:col-span-2 textarea-custom"/>
          <button type="submit" className="btn-green col-span-1 md:col-span-2">{loadings ? "Please wait..." : "Add Education"}</button>
        </form>

        {/* Education Table */}
        <div className="overflow-x-auto">
          <h3 className="font-semibold mb-2">Education</h3>
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Level</th>
                <th className="p-2">Degree</th>
                <th className="p-2">Year</th>
                <th className="p-2">Notes</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((ed) => (
                <tr key={ed.id} className="even:bg-gray-50">
                  {editedEducation?.id === ed.id ? (
                    <>
                      <td className="p-2"><input value={editedEducation.level} onChange={(e)=>setEditedEducation({...editedEducation, level:e.target.value})} className="input-custom"/></td>
                      <td className="p-2"><input value={editedEducation.degree} onChange={(e)=>setEditedEducation({...editedEducation, degree:e.target.value})} className="input-custom"/></td>
                      <td className="p-2"><DatePicker picker="year" value={moment(editedEducation.year)} onChange={(date)=>setEditedEducation({...editedEducation, year:date})} className="w-full"/></td>
                      <td className="p-2"><input value={editedEducation.notes} onChange={(e)=>setEditedEducation({...editedEducation, notes:e.target.value})} className="input-custom"/></td>
                      <td className="p-2 flex gap-2">
                        <button onClick={()=>handleSaveEdited(ed.id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"><RiSave2Line/></button>
                        <button onClick={()=>setEditedEducation(null)} className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500"><RiCloseLine/></button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{ed.level}</td>
                      <td className="p-2">{ed.degree}</td>
                      <td className="p-2">{moment(ed.year).year()}</td>
                      <td className="p-2">{ed.notes}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={() => setEditedEducation(ed)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                        <button onClick={() => handleDeleteed(ed.id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .input-custom { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.375rem; }
        .textarea-custom { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.375rem; min-height: 100px; }
        .btn-green { background-color: #10b981; color: white; padding: 0.5rem; border-radius: 0.375rem; font-weight: 500; text-align: center; }
        .btn-green:hover { background-color: #059669; }
      `}</style>
    </main>
  );
}
