// export default function Resume() {
//   return <div>Resume Page</div>;
// }

import React, { useState } from "react";
import axios from "axios";
import Script from "next/script";

export default function Resume() {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    qualification: "",
    experience: "",
    personalInfo: "",
    photo: "",
    resumeFile: null,
  });

  const [otp, setOtp] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//   const sendOtp = () => {
//     alert("OTP will be sent to: " + formData.email);
//   };

const sendOtp = async () => {
  try {
    await axios.post(`${API}/api/otp/send-otp`, {
      email: formData.email,
    });

    alert("OTP sent to your email");
  } catch (error) {
    alert("Failed to send OTP");
    console.log(error);
  }
};

//   const verifyOtp = () => {
//     alert("OTP verified successfully");
//   };

const [isOtpVerified, setIsOtpVerified] = useState(false);

const verifyOtp = async () => {
  try {
    await axios.post(`${API}/api/otp/verify-otp`, {
      email: formData.email,
      otp: otp,
    });
    
    setIsOtpVerified(true);

    alert("OTP verified successfully. Now you can pay ₹50.");
  } catch (error) {
    alert("Invalid OTP");
    console.log(error);
  }
};

const handlePayment = async () => {
  try {
    const response = await axios.post(
      `${API}/api/payment/create-order`
    );

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: response.data.amount,
      currency: response.data.currency,
      name: "CareerBloom",
      description: "Resume Creation Fee",
      order_id: response.data.id,

    //   handler: function (paymentResponse: any) {
    //     alert("Payment Successful!");

    //     console.log(paymentResponse);
    //   },

//     handler: async function (paymentResponse: any) {
//   await axios.post(`${API}/api/resume/create`, {
//     ...formData,
//     paymentId: paymentResponse.razorpay_payment_id,
//     orderId: paymentResponse.razorpay_order_id,
//     status: "paid",
//   });

//   alert("Payment Successful! Resume saved to profile.");
//   window.location.href = `/myresume?name=${formData.name}&email=${formData.email}&qualification=${formData.qualification}&experience=${formData.experience}&personalInfo=${formData.personalInfo}`;
// },
//     };
    handler: async function (paymentResponse: any) {
  const data = new FormData();

  data.append("name", formData.name);
  data.append("email", formData.email);
  data.append("qualification", formData.qualification);
  data.append("experience", formData.experience);
  data.append("personalInfo", formData.personalInfo);
  data.append("photo", formData.photo);
  data.append("paymentId", paymentResponse.razorpay_payment_id);
  data.append("orderId", paymentResponse.razorpay_order_id);
  data.append("status", "paid");

  if (formData.resumeFile) {
    data.append("resumeFile", formData.resumeFile);
  }

  await axios.post(`${API}/api/resume/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  alert("Payment Successful! Resume saved to profile.");
  window.location.href = `/myresume?name=${formData.name}&email=${formData.email}&qualification=${formData.qualification}&experience=${formData.experience}&personalInfo=${formData.personalInfo}`;
},
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.log(error);
    alert("Payment failed");
  }
};

  return (
    
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Resume Creation</h1>
      <p className="mb-6 text-gray-600">
        Premium resume creation fee: ₹50
      </p>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        type="email"
        name="email"
        placeholder="Registered Email"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        type="text"
        name="qualification"
        placeholder="Qualification"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
        type="text"
        name="experience"
        placeholder="Experience"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <textarea
        name="personalInfo"
        placeholder="Personal Information"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />

      <input
  type="file"
  accept=".pdf,.doc,.docx"
  onChange={(e) =>
    setFormData({
      ...formData,
      resumeFile: e.target.files?.[0],
    })
  }
/>

      <input
        type="text"
        name="photo"
        placeholder="Photo URL"
        onChange={handleChange}
        className="border p-3 w-full mb-3"
      />


      <button
        onClick={sendOtp}
        className="bg-green-600 text-white px-6 py-3 rounded mr-3"
      >
        Send OTP
      </button>

      <input
        type="text"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
        className="border p-3 mb-3 mt-4 w-full"
      />

      <button
        onClick={verifyOtp}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Verify OTP
      </button>
      {isOtpVerified && (
  <button 
  onClick={handlePayment}
  className="bg-purple-600 text-white px-6 py-3 rounded mt-4 block">
    Pay ₹50 with Razorpay
  </button>
)}

<Script src="https://checkout.razorpay.com/v1/checkout.js" />

    </div>
  );
}

// import React, { useState } from "react";

// export default function Resume() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     qualification: "",
//     experience: "",
//     personalInfo: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Resume Creation</h1>

//       <input
//         type="text"
//         name="name"
//         placeholder="Full Name"
//         onChange={handleChange}
//         className="border p-3 w-full mb-3"
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//         className="border p-3 w-full mb-3"
//       />

//       <input
//         type="text"
//         name="qualification"
//         placeholder="Qualification"
//         onChange={handleChange}
//         className="border p-3 w-full mb-3"
//       />

//       <input
//         type="text"
//         name="experience"
//         placeholder="Experience"
//         onChange={handleChange}
//         className="border p-3 w-full mb-3"
//       />

//       <textarea
//         name="personalInfo"
//         placeholder="Personal Information"
//         onChange={handleChange}
//         className="border p-3 w-full mb-3"
//       />

//       <button className="bg-blue-600 text-white px-6 py-3 rounded">
//         Generate Resume
//       </button>
//     </div>
//   );
// }