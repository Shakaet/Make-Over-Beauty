// manageAdmins/page.jsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageAdminsPage = () => {
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState({
    product_access: false,
    blog_access: false,
    order_access: false,
    siteSetting_access: false,
    customer_access: false,
  });

  const handleCheckbox = (key) => {
    setPermissions({ ...permissions, [key]: !permissions[key] });
  };

  const handleInvite = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      // ✅ FIX 1: Use "accessToken" because that is what is in your Application Storage
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("You are not logged in. No token found.");
        return;
      }

      const res = await axios.post(
        "https://bloomingbeauty.vercel.app/api/users/invite-moderator",
        { email, permissions },
        {
          // ✅ FIX 2: Add "Bearer " prefix for the backend middleware
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success(res.data.message);
      setEmail("");
      setPermissions({
        product_access: false,
        blog_access: false,
        order_access: false,
        siteSetting_access: false,
        customer_access: false,
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error sending invite");
    }
  };

  // Helper to format permission labels
  const formatLabel = (key) => {
    return key.replace("_access", "").replace("_", " ");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Invite Moderator
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Assign specific access levels to new team members.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleInvite} className="p-8 space-y-8">
          {/* Email Input Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700 block">
              Grant Permissions
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(permissions).map((key) => (
                <div
                  key={key}
                  onClick={() => handleCheckbox(key)}
                  className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out
                    ${
                      permissions[key]
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="checkbox"
                    name={key}
                    checked={permissions[key]}
                    onChange={() => handleCheckbox(key)}
                    className="sr-only"
                  />

                  {/* Custom Visual Checkbox */}
                  <div
                    className={`mr-3 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors
                    ${permissions[key] ? "bg-red-600 border-red-600" : "border-gray-300 bg-white"}`}
                  >
                    {permissions[key] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <span
                    className={`text-sm font-medium capitalize transition-colors ${permissions[key] ? "text-red-700" : "text-gray-700"}`}
                  >
                    {formatLabel(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-red-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Send Invitation</span>
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAdminsPage;
