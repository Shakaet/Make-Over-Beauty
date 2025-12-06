"use client";
import React, { use, useContext, useEffect, useState } from "react";
import { Context } from "../provider/AuthProvider";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import ManageProducts from "./components/ManageProducts";
import OrderHistory from "./orders/page";
import Profile from "./profile/page";

const DashboardPage = () => {
    const { user, role, loading } = useContext(Context);
    const [activeTab, setActiveTab] = useState("overview");
    console.log(user, role)

    if (loading)
        return (
            <div className="text-center p-6">Loading...</div>
        );

    if (!user)
        return (
            <div className="p-6 text-center">
                <h2 className="text-lg font-semibold">You are not logged in</h2>
            </div>
        );

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <Overview />;
            case "orders":
                return <OrderHistory />;
            case "profile":
                return <Profile />;
            case "products":
                return <ManageProducts />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar role={role} active={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 p-6">{renderContent()}</main>
        </div>
    );
};

export default DashboardPage;
