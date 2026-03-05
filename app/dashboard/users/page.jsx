"use client";

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Users as UsersIcon,
  RefreshCw,
  Shield,
  User as UserIcon,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserCard from "./UserCard"; // Make sure this path is correct
import { Context } from "@/app/provider/AuthProvider";

export default function UsersPage() {
  const { user, loading: authLoading } = useContext(Context);
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    customers: 0,
    admins: 0,
    managers: 0,
  });

  // ---------------------------------------------------------
  // 1. Main Function: Verify Access & Fetch Data
  // ---------------------------------------------------------
  useEffect(() => {
    const verifyAndFetch = async () => {
      // 1. Wait for Auth Context to finish loading
      if (authLoading) return;

      // 2. If no Firebase user, redirect to login
      if (!user) {
        router.push("/my-account");
        return;
      }

      // 3. Fetch Users from Backend
      try {
        setLoading(true);
        setError(null);

        // Get the Firebase token
        const token = user.accessToken || localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        // Fetch all users from your API
        const res = await axios.get(
          "https://bloomingbeauty.vercel.app/api/users/",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const usersList = res.data.data || [];

        // 4. Check if the current logged-in user is an Admin
        // We find the user in the list that matches the logged-in email
        const currentUserData = usersList.find((u) => u.email === user.email);

        if (!currentUserData || currentUserData.role !== "admin") {
          // If not admin, kick them out
          console.log("Access Denied: User is not admin");
          router.push("/dashboard");
          return;
        }

        // 5. If Admin, populate the state
        setUsers(usersList);
        setFilteredUsers(usersList);
        updateStats(usersList);
      } catch (err) {
        console.error("Fetch Error:", err);
        const msg =
          err.response?.data?.message || err.message || "Failed to fetch users";
        setError(msg);

        // If 401 or 403, force re-login
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("accessToken");
          router.push("/my-account");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyAndFetch();
  }, [user, authLoading, router]);

  // ---------------------------------------------------------
  // 2. Update Stats Helper
  // ---------------------------------------------------------
  const updateStats = (userList) => {
    setStats({
      total: userList.length,
      customers: userList.filter((u) => u.role === "customer").length,
      admins: userList.filter((u) => u.role === "admin").length,
      managers: userList.filter((u) => u.role === "manager").length,
    });
  };

  // ---------------------------------------------------------
  // 3. Delete Handler
  // ---------------------------------------------------------
  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = user.accessToken || localStorage.getItem("accessToken");

      // API Call to Delete
      await axios.delete(
        `https://bloomingbeauty.vercel.app/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Update UI State
      const updatedUsers = users.filter((u) => u._id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      updateStats(updatedUsers);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  // ---------------------------------------------------------
  // 4. Search & Filter Logic
  // ---------------------------------------------------------
  useEffect(() => {
    let filtered = users;

    // Filter by Search Term
    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.username?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by Role Dropdown
    if (roleFilter !== "all") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  // ---------------------------------------------------------
  // 5. UI Render
  // ---------------------------------------------------------

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`${color} rounded-2xl p-6 shadow-sm border border-white/50`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 opacity-80">
            {label}
          </p>
          <p className="text-3xl font-bold mt-1 text-gray-800">{value}</p>
        </div>
        <div className="p-3 bg-white/60 rounded-xl shadow-sm">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
    </motion.div>
  );

  // Global Loading State (Auth or Data)
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="h-14 bg-gray-200 rounded-xl"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in (handled by redirect, but good for safety)
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">
                User Management
              </h1>
              <p className="text-rose-400 pt-2">
                Manage and track all users in one place
              </p>
            </div>
            <button
              onClick={() => window.location.reload()} // Simple refresh to re-trigger useEffect
              className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-white border border-rose-200 rounded-xl text-rose-600 hover:bg-rose-50 transition shadow-sm"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={UsersIcon}
              label="Total Users"
              value={stats.total}
              color="bg-gradient-to-br from-pink-100 to-pink-50"
            />
            <StatCard
              icon={UserIcon}
              label="Customers"
              value={stats.customers}
              color="bg-gradient-to-br from-rose-100 to-rose-50"
            />
            <StatCard
              icon={Shield}
              label="Admins"
              value={stats.admins}
              color="bg-gradient-to-br from-purple-100 to-purple-50"
            />
            <StatCard
              icon={Shield}
              label="Managers"
              value={stats.managers}
              color="bg-gradient-to-br from-blue-100 to-blue-50"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none transition shadow-sm"
              />
            </div>

            <div className="flex items-center space-x-2 px-4 py-3 bg-white border border-rose-200 rounded-xl shadow-sm">
              <Filter className="w-5 h-5 text-rose-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent outline-none text-gray-700 font-medium"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customers</option>
                <option value="admin">Admins</option>
                <option value="manager">Managers</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Users Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {filteredUsers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <UsersIcon className="w-16 h-16 text-rose-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No users found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredUsers.map((userData, index) => (
                <UserCard
                  key={userData._id || index}
                  user={userData}
                  onDelete={handleDelete}
                  index={index}
                  currentUserEmail={user?.email}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-rose-100 flex justify-between text-sm text-rose-400">
          <span>
            Showing <strong>{filteredUsers.length}</strong> of{" "}
            <strong>{users.length}</strong> users
          </span>
        </div>
      </div>
    </div>
  );
}
