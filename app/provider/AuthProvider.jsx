"use client";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import { useRouter } from "next/navigation";
import { authApi, roleAccessApi } from "../api/authApi";
import axios from "axios";

export let Context = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user object
  const [dbUser, setDbUser] = useState(null); // Backend user object (contains permissions/role)
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const provider = new GoogleAuthProvider();

  // ---------------------------------------------------------
  // 1. HELPER: Fetch User Data from Backend
  // ---------------------------------------------------------
  const fetchUserData = async (email) => {
    try {
      // PREFERRED: Try to fetch the full profile from the /profile endpoint
      // (You need to add this route to your backend as discussed previously)
      const profileRes = await axios.get(
        `https://bloomingbeauty.vercel.app/api/users/profile/${email}`,
      );

      if (profileRes.data) {
        return profileRes.data; // Returns { role, product_access, blog_access, ... }
      }
    } catch (err) {
      // Fallback: If /profile doesn't exist, try the specific boolean endpoints
      console.log(
        "Profile fetch failed, falling back to role checks...",
        err.message,
      );
    }

    // FALLBACK LOGIC (Determine role via specific endpoints)
    try {
      const admin = await axios.get(
        `https://bloomingbeauty.vercel.app/api/users/getadmin/${email}`,
      );
      if (admin.data.admin) return { role: "admin" };

      const manager = await axios.get(
        `https://bloomingbeauty.vercel.app/api/users/getmanager/${email}`,
      );
      if (manager.data.manager) return { role: "manager" };

      const customer = await axios.get(
        `https://bloomingbeauty.vercel.app/api/users/getCustomer/${email}`,
      );
      if (customer.data.customer) return { role: "customer" };

      return { role: "customer" }; // Default fallback
    } catch (error) {
      console.error("Error fetching role fallback:", error);
      return null;
    }
  };

  // ---------------------------------------------------------
  // 2. AUTH ACTIONS
  // ---------------------------------------------------------

  // Google SignIn
  const googleSign = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);

      if (result.user?.email) {
        try {
          // Get JWT tokens
          const jwtResponse = await authApi.login(
            result.user.email,
            "google-oauth",
          );
          if (jwtResponse.data?.accessToken) {
            localStorage.setItem("accessToken", jwtResponse.data.accessToken);
          }

          // Fetch Backend User Data immediately
          const backendUser = await fetchUserData(result.user.email);
          setDbUser(backendUser);
        } catch (err) {
          console.log("JWT/Backend fetch after Google sign in:", err);
        }
      }
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  // Register using Firebase auth
  const createRegistered = (email, password) => {
    setLoading(true);
    // Note: You might want to create the user in your DB here too
    const promise = createUserWithEmailAndPassword(auth, email, password);
    promise.finally(() => setLoading(false));
    return promise;
  };

  const loginSetup = async (email, password) => {
    setLoading(true);
    try {
      const firebaseResult = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const jwtResponse = await authApi.login(email, password);

      if (jwtResponse?.data?.accessToken) {
        localStorage.setItem("accessToken", jwtResponse.data.accessToken);
      }

      // Fetch Backend User Data immediately
      const backendUser = await fetchUserData(email);
      setDbUser(backendUser);

      setLoading(false);
      return firebaseResult;
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout
  const signOuts = () => {
    setDbUser(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    router.push("/");
    return signOut(auth);
  };

  const updateUserProfile = (user, profileUpdates) =>
    updateProfile(user, profileUpdates);

  // ---------------------------------------------------------
  // 3. AUTH STATE OBSERVER
  // ---------------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        // If logged in, fetch the role and permissions from backend
        const backendData = await fetchUserData(currentUser.email);
        setDbUser(backendData);
      } else {
        setDbUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const val = {
    createRegistered,
    loginSetup,
    signOuts,
    googleSign,
    updateUserProfile,
    user, // Firebase User
    dbUser, // Backend User (Needed for Sidebar)
    role: dbUser?.role || null, // Helper for quick role access
    loading,
  };

  return <Context.Provider value={val}>{children}</Context.Provider>;
};

export default AuthProvider;
