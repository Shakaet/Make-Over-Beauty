"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/app/provider/AuthProvider";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Settings,
} from "lucide-react";
import { getOrders } from "@/app/api/orderApi"; // Import the API we fixed earlier
import Link from "next/link";

// ==========================================
// 1. REUSABLE UI COMPONENTS
// ==========================================

const StatCard = ({ title, value, icon, color, link }) => {
  const Icon = icon;
  const bgColors = {
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };
  const selectedColor = bgColors[color] || bgColors.rose;

  return (
    <Link href={link || "#"} className="block group">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1 group-hover:text-rose-600 transition-colors">
              {value}
            </h3>
          </div>
          <div className={`p-3 rounded-xl ${selectedColor}`}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const RecentActivityItem = ({ title, date, status }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 mb-3">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <span
        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          status === "Completed" || status === "Active"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
            : "bg-amber-50 text-amber-700 border border-amber-100"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

// ==========================================
// 2. ROLE SPECIFIC OVERVIEWS
// ==========================================

// --- CUSTOMER OVERVIEW ---
const CustomerOverview = ({ user }) => {
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.email) {
        try {
          const data = await getOrders(user.email);
          setOrderCount(data.length);
        } catch (err) {
          console.error("Failed to fetch customer stats", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.displayName || user?.email?.split("@")[0]}!
        </h1>
        <p className="text-rose-100">
          Here is what's happening with your orders today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Orders"
          value={loading ? "..." : orderCount}
          icon={ShoppingCart}
          color="blue"
          link="/dashboard/my-orders"
        />
        <StatCard
          title="Wishlist"
          value="0"
          icon={Package}
          color="rose"
          link="/"
        />
        <StatCard
          title="Coupons Available"
          value="0"
          icon={DollarSign}
          color="green"
          link="/"
        />
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Recent Activity
        </h3>
        {orderCount === 0 && !loading ? (
          <p className="text-gray-500 text-sm">No recent orders found.</p>
        ) : (
          <p className="text-gray-500 text-sm">
            Your recent orders will appear here.
          </p>
        )}
      </div>
    </div>
  );
};

// --- MANAGER OVERVIEW ---
const ManagerOverview = ({ dbUser }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
        <p className="text-blue-100">
          Manage products, blogs, and orders based on your permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dbUser?.product_access && (
          <StatCard
            title="Manage Products"
            value="Go"
            icon={Package}
            color="rose"
            link="/dashboard/products"
          />
        )}
        {dbUser?.blog_access && (
          <StatCard
            title="Manage Blogs"
            value="Go"
            icon={Settings}
            color="blue"
            link="/dashboard/blogs"
          />
        )}
        {dbUser?.order_access && (
          <StatCard
            title="All Orders"
            value="View"
            icon={ShoppingCart}
            color="green"
            link="/dashboard/allOrders"
          />
        )}
        {dbUser?.siteSetting_access && (
          <StatCard
            title="Settings"
            value="Edit"
            icon={Settings}
            color="amber"
            link="/dashboard/settings"
          />
        )}
      </div>

      {!dbUser?.product_access &&
        !dbUser?.blog_access &&
        !dbUser?.order_access && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
            You currently have no specific access permissions assigned. Please
            contact the Admin.
          </div>
        )}
    </div>
  );
};

// --- ADMIN OVERVIEW ---
const AdminOverview = () => {
  // Placeholder stats - you can replace these with real API calls later
  const stats = [
    {
      title: "Total Revenue",
      value: "৳12,450",
      icon: DollarSign,
      color: "green",
    },
    { title: "Total Orders", value: "24", icon: ShoppingCart, color: "blue" },
    { title: "Total Products", value: "105", icon: Package, color: "rose" },
    { title: "Total Users", value: "84", icon: Users, color: "amber" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-200 to-red-300 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
            <p className="text-gray-400">
              Full control over platform data and settings.
            </p>
          </div>
          <TrendingUp size={48} className="text-gray-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recent Orders
          </h3>
          <RecentActivityItem
            title="INV-83920"
            date="2 mins ago"
            status="Completed"
          />
          <RecentActivityItem
            title="INV-11239"
            date="1 hour ago"
            status="Pending"
          />
          <RecentActivityItem
            title="INV-99102"
            date="3 hours ago"
            status="Completed"
          />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/dashboard/products"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <Package className="text-rose-500 mb-2" />
              <span className="text-sm font-medium">Add Product</span>
            </Link>
            <Link
              href="/dashboard/manage-admins"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <Users className="text-blue-500 mb-2" />
              <span className="text-sm font-medium">Manage Admins</span>
            </Link>
            <Link
              href="/dashboard/users"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <Users className="text-emerald-500 mb-2" />
              <span className="text-sm font-medium">View Users</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <Settings className="text-amber-500 mb-2" />
              <span className="text-sm font-medium">Site Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN CONTROLLER
// ==========================================

export default function DashboardPage() {
  const { user, dbUser, loading } = useContext(Context);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // Determine which overview to show based on role
  const role = dbUser?.role || "customer";

  if (role === "admin") {
    return <AdminOverview />;
  }

  if (role === "manager") {
    return <ManagerOverview dbUser={dbUser} />;
  }

  // Default to Customer
  return <CustomerOverview user={user} />;
}
