"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "@/app/firebase/firebase.init";
import axios from "axios";
import toast from "react-hot-toast";

// This is your existing component logic.
// We removed "export const dynamic" from here because this is a Client Component.
const VerifyInviteForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      toast.error("Invalid invitation link.");
      setLoading(false);
      return;
    }

    try {
      // 1. Verify Token & Get Email from Backend
      // Note: Ensure this URL is correct for production (not localhost)
      const checkRes = await axios.post(
        "http://localhost:5000/api/users/decode-invite",
        { token },
      );
      const email = checkRes.data.email;

      if (!email) {
        throw new Error("Could not verify invitation.");
      }

      // 2. Create User in Firebase
      await createUserWithEmailAndPassword(auth, email, formData.password);

      // 3. Save User Details to MongoDB
      await axios.post("http://localhost:5000/api/users/verify-invite", {
        token: token,
        username: formData.username,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      });

      toast.success("Account created successfully! Redirecting to login...");
      auth.signOut();

      setTimeout(() => {
        router.push("/my-account");
      }, 1500);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please try logging in.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2.5 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Setup Your Account
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Complete your profile to activate
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="p-8 space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Full Name
            </label>
            <input
              name="username"
              placeholder="John Doe"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+880 1XXXXXXXXX"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Your full address"
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-red-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>Activate Account</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyInviteForm;
