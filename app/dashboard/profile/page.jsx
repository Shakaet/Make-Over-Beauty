"use client";

import { Context } from "@/app/provider/AuthProvider";
import { useContext } from "react";

export default function Profile() {
    const { user } = useContext(Context);

    if (!user)
        return (
            <p className="p-6 text-center text-gray-500 font-medium">
                No user data available
            </p>
        );

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-[#fff6f0] to-[#fff0e8]">
            <h1 className="text-3xl font-bold mb-6 ">Profile</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto hover:shadow-xl transition-all duration-300">
                <p className="mb-4 text-gray-700">
                    <span className="font-semibold text-gray-900">Name:</span>{" "}
                    {user.name}
                </p>
                <p className="mb-4 text-gray-700">
                    <span className="font-semibold text-gray-900">Email:</span>{" "}
                    {user.email}
                </p>
                {user.phone && (
                    <p className="mb-4 text-gray-700">
                        <span className="font-semibold text-gray-900">Phone:</span>{" "}
                        {user.phone}
                    </p>
                )}
                {user.role && (
                    <p className="text-gray-700">
                        <span className="font-semibold text-gray-900">Role:</span>{" "}
                        {user.role}
                    </p>
                )}
            </div>
        </div>
    );
}
