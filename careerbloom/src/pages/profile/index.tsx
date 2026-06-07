// import { selectuser } from "@/Feature/Userslice";
import { selectuser } from "@/Feature/Userslice";
import { ExternalLink, Mail, User } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import axios from "axios";
interface User {
  name: string;
  email: string;
  photo: string;
}
const index = () => {
  // const [user, setuser] = useState<User | null>({
  //   name: "Manasvi",
  //   email: "manasvi@gmail.com",
  //   photo:
  //     "",
  // });
const user=useSelector(selectuser)

const [resumes, setResumes] = useState<any[]>([]);
const [loginHistory, setLoginHistory] = useState<any[]>([]);
const API = process.env.NEXT_PUBLIC_API_URL;

// useEffect(() => {
//   if (user?.email) {
//     axios
//       .get(`${API}/api/resume/user/${user.email}`)
//       .then((res) => setResumes(res.data))
//       .catch((err) => console.log(err));
//   }
// }, [user]);

useEffect(() => {
  if (user?.email) {
    axios
      .get(`${API}/api/resume/user/${user.email}`)
      .then((res) => setResumes(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${API}/api/login-history/${user.email}`)
      .then((res) => setLoginHistory(res.data.history))
      .catch((err) => console.log(err));
  }
}, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              {user?.photo ? (
                <img
                  src={user?.photo}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-800" />
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-8 px-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <div className="mt-2 flex items-center justify-center text-gray-900">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user?.email}</span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <span className="text-blue-600 font-semibold text-2xl">
                    0
                  </span>
                  <p className="text-blue-600 text-sm mt-1">
                    Active Applications
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <span className="text-green-600 font-semibold text-2xl">
                    0
                  </span>
                  <p className="text-green-600 text-sm mt-1">
                    Accepted Applications
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center pt-4">
                <Link
                  href="/userapplication"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View Applications
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8">
  <h2 className="text-xl font-bold mb-4">My Saved Resumes</h2>

  {resumes.length === 0 ? (
    <p>No resume created yet.</p>
  ) : (
    resumes.map((resume) => (
      <div
        key={resume._id}
        className="border rounded-lg p-4 mb-3 bg-gray-50"
      >
        <h3 className="font-bold">{resume.name}</h3>
        <p>{resume.email}</p>
        <p>{resume.qualification}</p>

        <Link
          href={`/myresume?name=${resume.name}&email=${resume.email}&qualification=${resume.qualification}&experience=${resume.experience}&personalInfo=${resume.personalInfo}`}
          className="text-blue-600 underline"
        >
          View Resume
        </Link>
      </div>
    ))
  )}
</div>
<div className="mt-8">
  <h2 className="text-xl font-bold mb-4">Login History</h2>

  {loginHistory.length === 0 ? (
    <p>No login history found.</p>
  ) : (
    loginHistory.map((item) => (
      <div
        key={item._id}
        className="border rounded-lg p-4 mb-3 bg-gray-50"
      >
        <p><strong>Browser:</strong> {item.browser}</p>
        <p><strong>Operating System:</strong> {item.os}</p>
        <p><strong>Device:</strong> {item.deviceType}</p>
        <p><strong>IP Address:</strong> {item.ipAddress}</p>
        <p><strong>Status:</strong> {item.loginStatus}</p>
        <p><strong>Reason:</strong> {item.reason}</p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
    ))
  )}
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
