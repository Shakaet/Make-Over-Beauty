"use client";

import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import { useRouter } from "next/navigation";
import { authApi, roleAccessApi } from "../api/authApi";
import axios from "axios";

export let Context = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);       // Firebase user
    const [role, setRole] = useState(null);       // customer / manager / admin
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const provider = new GoogleAuthProvider();

    // Google SignIn
    //const googleSign = () => signInWithPopup(auth, provider);
    const googleSign = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            // Get JWT tokens after Google sign in
            if (result.user?.email) {
                try {
                    const jwtResponse = await authApi.login(result.user.email, "google-oauth");
                    if (jwtResponse.data?.accessToken) {
                        localStorage.setItem("accessToken", jwtResponse.data.accessToken);
                    }
                } catch (err) {
                    console.log("JWT fetch after Google sign in:", err);
                }
            }

            return result;
        } catch (error) {
            console.error("Google sign in error:", error);
            throw error;
        }
    }

    // Register using Firebase auth
    const createRegistered = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    // Login Firebase
    // const loginSetup = (email, password) =>
    //     signInWithEmailAndPassword(auth, email, password);
    const loginSetup = async (email, password) => {
        try {
            const firebaseResult = await signInWithEmailAndPassword(auth, email, password);

            const jwtResponse = await authApi.login(email, password);

            if (jwtResponse?.data?.accessToken) {
                localStorage.setItem("accessToken", jwtResponse.data.accessToken);
            }

            return firebaseResult;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };


    // Logout
    const signOuts = () => {
        setRole(null);
        router.push("/");
        return signOut(auth);
    };

    const updateUserProfile = (user, profileUpdates) =>
        updateProfile(user, profileUpdates);

    // Fetch user role from backend
    const fetchRole = async (email) => {
        try {
            const customer = await axios.get(
                `https://bloomingbeauty.vercel.app/api/users/getCustomer/${email}`
            );
            if (customer.data.customer === true) return "customer";

            const admin = await axios.get(
                `https://bloomingbeauty.vercel.app/api/users/getadmin/${email}`
            );
            if (admin.data.admin === true) return "admin";

            // const manager = await axios.get(
            //     `https://bloomingbeauty.vercel.app/api/users/getmanager/${email}`
            // );
            // if (manager.data.manager === true) return "manager";

            return null;
        } catch (err) {
            console.log("Role fetch error:", err);
            return null;
        }
    };

    // Check auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                const r = await fetchRole(currentUser.email);
                setRole(r);
            } else {
                setRole(null);
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
        user,
        role,
        loading,
    };

    return (
        <Context.Provider value={val}>
            {children}
        </Context.Provider>
    );
};

export default AuthProvider;
