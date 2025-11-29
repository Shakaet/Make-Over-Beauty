"use client";

import { useContext, useState } from "react";
import { Context } from "../provider/AuthProvider";
import Overview from "./components/Overview";
import OrderHistory from "./orders/page";
import ManageProducts from "./components/ManageProducts";
import Sidebar from "./components/Sidebar";
import Profile from "./profile/page";

export default function DashboardPage() {
    const { user } = useContext(Context);
    const [activeTab, setActiveTab] = useState("overview");

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
        <div className="min-h-screen pt-16 flex bg-gray-100">
            <Sidebar role={'User'} active={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 p-6 ">{renderContent()}</main>
        </div>
    );
}
