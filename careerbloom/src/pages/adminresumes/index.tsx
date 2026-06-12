import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminResumes = () => {
  const [resumes, setResumes] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/all`)
      .then((res) => setResumes(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-black mb-6">User Resumes</h1>

      <div className="grid gap-6">
        {resumes.map((resume) => (
          <div key={resume._id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-black">{resume.name}</h2>
            <p className="text-gray-700">Email: {resume.email}</p>
            <p className="text-gray-700">Qualification: {resume.qualification}</p>
            <p className="text-gray-700">Experience: {resume.experience}</p>
            <p className="text-gray-700 mt-2">{resume.personalInfo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminResumes;