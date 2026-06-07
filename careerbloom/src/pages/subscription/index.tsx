import React from "react";
import axios from "axios";
import Script from "next/script";
import { useSelector } from "react-redux";
import { selectuser } from "@/Feature/Userslice";

const plans = [
  { id: "free", name: "Free", price: 0, limit: "1 internship/month" },
  { id: "bronze", name: "Bronze", price: 100, limit: "3 internships/month" },
  { id: "silver", name: "Silver", price: 300, limit: "5 internships/month" },
  { id: "gold", name: "Gold", price: 1000, limit: "Unlimited internships" },
];

export default function Subscription() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const user = useSelector(selectuser);

  const handleSubscribe = async (plan: any) => {
    try {
      const res = await axios.post(`${API}/api/subscription/create-order`, {
        plan: plan.id,
      });

      if (res.data.free) {
        await axios.post(`${API}/api/subscription/save`, {
          email: user.email,
          plan: plan.id,
          paymentId: "FREE",
          orderId: "FREE",
        });

        alert("Free plan activated");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: res.data.order.amount,
        currency: res.data.order.currency,
        name: "CareerBloom",
        description: `${plan.name} Subscription`,
        order_id: res.data.order.id,
        handler: async function (paymentResponse: any) {
          await axios.post(`${API}/api/subscription/save`, {
            email: user.email,
            plan: plan.id,
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id,
          });

          alert(`${plan.name} plan activated successfully`);
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    // } catch (error: any) {
    //   alert(error.response?.data?.message || "Subscription failed");
    // }
    } catch (error: any) {
  console.log("Subscription error:", error.response?.data || error.message);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Subscription failed"
  );
}
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {plans.map((plan) => (
          <div key={plan.id} className="border rounded-lg p-5 shadow">
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-2xl font-bold mt-3">₹{plan.price}</p>
            <p className="text-gray-600 mt-2">{plan.limit}</p>

            <button
              onClick={() => handleSubscribe(plan)}
              className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}