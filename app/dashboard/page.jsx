"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../provider/AuthProvider";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import OrderHistory from "./orders/page";
import Profile from "./profile/page";
import ProductDashboard from "./products/page";
import UsersPage from "./users/page";
import AllOrdersPage from "./allOrders/page";
import SiteSettings from "./siteSettings/page";
import CategoryAndBrand from "./categoryAndBrand/page";
import UserDashboardPage from "./overview/userOverview/page";
import AdminDashboardPage from "./overview/adminOverview/page";

const DashboardPage = () => {
    const router = useRouter();
    const { user, role, loading } = useContext(Context);

    const [activeTab, setActiveTab] = useState(
        role === "admin" ? "adminOverview" : "userOverview"
    );
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ✅ Hook সবসময় call হবে
    useEffect(() => {
        if (!loading && !user) {
            router.push("/my-account");
        }
    }, [user, loading, router]);

    // ✅ conditional return hook এর পরে
    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (!user) return null;

    const renderContent = () => {
        switch (activeTab) {
            case "userOverview": return <UserDashboardPage />;
            case "adminOverview": return <AdminDashboardPage />;
            case "orders": return <OrderHistory />;
            case "profile": return <Profile />;
            case "products": return <ProductDashboard />;
            case "allorders": return <AllOrdersPage />;
            case "users": return <UsersPage />;
            case "categoryAndBrand": return <CategoryAndBrand />;
            case "settings": return <SiteSettings />;
            default:
                return role === "admin" ? <AdminDashboardPage /> : <UserDashboardPage />;
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                role={role}
                active={activeTab}
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                }}
                open={sidebarOpen}
            />

            <div className="flex-1 flex flex-col">
                <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-30">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <h1 className="font-semibold text-lg">Dashboard</h1>
                </header>

                <main className="p-4 md:p-8">{renderContent()}</main>
            </div>
        </div>
    );
};

export default DashboardPage;
