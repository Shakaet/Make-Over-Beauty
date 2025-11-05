"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.init";

function ForgetPassContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams?.get("email") || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const emailValue = email.trim();
    if (!emailValue) {
      setError("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(emailValue)) {
      setError("Invalid email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, emailValue);
      setMessage("Password reset email sent! Redirecting to Gmail...");
      setTimeout(() => {
        window.location.href = "https://mail.google.com";
      }, 1200);
    } catch (err) {
      setError(err?.message || "Failed to send password reset email.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50 overflow-hidden">
      <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="w-full max-w-md relative shadow-xl rounded-2xl p-6 md:p-8 bg-white border border-black/10">
        <div className="mb-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#E8D8C0] to-[#dec5a4] text-gray-900 shadow">
            ✉️
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-black mb-1">
          Forgot Password
        </h3>
        <p className="text-sm text-gray-600 mb-5">
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black/50 rounded-md bg-white px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition placeholder:text-gray-400"
              placeholder="you@example.com"
            />
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            {message && <p className="text-xs text-green-600 mt-1">{message}</p>}
          </div>
          <button
            type="submit"
            className="w-full rounded-full shadow transition bg-gradient-to-r from-[#E8D8C0] to-[#dec5a4] hover:from-[#dec5a4] hover:to-[#E8D8C0] text-gray-900 font-medium px-6 py-2"
          >
            Reset Password
          </button>
          <p className="text-xs text-gray-500">We’ll never share your email.</p>
        </form>
      </div>
    </div>
  );
}

export default function ForgetPass() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgetPassContent />
    </Suspense>
  );
}
