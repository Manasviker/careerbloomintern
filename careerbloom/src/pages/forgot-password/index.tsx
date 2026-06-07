import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleReset = async () => {
    try {
      const res = await axios.post(`${API}/api/forgot-password/reset`, {
        email,
        phone,
      });

      setNewPassword(res.data.newPassword);
      alert("Password reset successful");
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter registered email"
        className="border p-3 w-full mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter registered phone number"
        className="border p-3 w-full mb-4"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Reset Password
      </button>

      {newPassword && (
        <div className="mt-5 p-4 border bg-gray-100">
          <p>Your new password is:</p>
          <h2 className="text-xl font-bold">{newPassword}</h2>
        </div>
      )}
    </div>
  );
}