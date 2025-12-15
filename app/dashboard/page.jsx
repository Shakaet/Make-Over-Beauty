"use client";
import React, { useContext, useState } from "react";
import { Context } from "../provider/AuthProvider";
import Sidebar from "./components/Sidebar";

import OrderHistory from "./orders/page";
import Profile from "./profile/page";
import ProductDashboard from "./products/page";
import UsersPage from "./users/page";
import AllOrdersPage from "./allOrders/page";
import SiteSettings from "./siteSettings/page";
import UserDashboardPage from "./overview/userOverview/page";
import AdminDashboardPage from "./overview/adminOverview/page";

import { Menu, X } from "lucide-react";

const DashboardPage = () => {
    const { user, role, loading } = useContext(Context);
    const [activeTab, setActiveTab] = useState(
        role === "admin" ? "adminOverview" : "userOverview"
    );
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (!user) return <div className="p-6 text-center">You are not logged in</div>;

    const renderContent = () => {
        switch (activeTab) {
            case "userOverview": return <UserDashboardPage />;
            case "adminOverview": return <AdminDashboardPage />;
            case "orders": return <OrderHistory />;
            case "profile": return <Profile />;
            case "products": return <ProductDashboard />;
            case "allorders": return <AllOrdersPage />;
            case "users": return <UsersPage />;
            case "settings": return <SiteSettings />;
            default:
                return role === "admin" ? <AdminDashboardPage /> : <UserDashboardPage />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* 📱 Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between">
                <h1 className="text-lg font-bold">Dashboard</h1>
                <button onClick={() => setSidebarOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* 📱 Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                role={role}
                active={activeTab}
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                }}
                open={sidebarOpen}
                close={() => setSidebarOpen(false)}
            />

            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
                {renderContent()}
            </main>
        </div>
    );
};

export default DashboardPage;
