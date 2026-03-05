"use client";
import React, { Suspense, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Context } from "../provider/AuthProvider";

function LoginForm() {
  let { loginSetup } = useContext(Context);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = (searchParams && searchParams.get("from")) || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (data) => {
    const newErrors = {};
    if (!patterns.email.test(data.email.trim()))
      newErrors.email = "Invalid email.";
    if (!patterns.password.test(data.password))
      newErrors.password = "Invalid password (min 8 with letters and numbers).";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = {
      email: formData.email.trim(),
      password: formData.password,
    };
    const validationErrors = validate(trimmed);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstField = Object.keys(validationErrors)[0];
      const el = e.currentTarget.querySelector(`[name="${firstField}"]`);
      if (el) el.focus();
      return;
    }

    loginSetup(trimmed.email, trimmed.password)
      .then(() => {
        router.replace(from);
      })
      .catch((err) => {
        setErrors((prev) => ({
          ...prev,
          password: "Authentication failed. Please check your credentials.",
        }));
      });
  };

  let handleclick = () => {
    const email = (formData.email || "").trim();
    const query = email ? `?email=${encodeURIComponent(email)}` : "";
    router.replace(`/recovery${query}`);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-black mb-4 ms-5">Login</h3>
      <form
        className=" shadow-lg rounded-2xl p-6 md:p-8 space-y-5"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {" "}
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-2 border-black/50 rounded-md bg-white px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition placeholder:text-gray-300 text-black"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border-2 border-black/50 rounded-md bg-white px-4 py-2 focus:ring-2 focus:ring-[#E8D8C0] focus:outline-none transition placeholder:text-gray-300 text-black"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 border-gray-300 rounded"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={handleclick}
            className="text-sm text-black/70 hover:text-black underline underline-offset-2"
          >
            Lost your password?
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#E8D8C0] hover:bg-[#dec5a4] text-gray-900 font-medium px-6 py-2 rounded-full shadow transition"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
const Login = () => {
  return (
    <Suspense>
      <LoginForm></LoginForm>
    </Suspense>
  );
};

export default Login;
