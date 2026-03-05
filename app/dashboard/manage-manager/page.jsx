"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, Save, RefreshCw } from "lucide-react";

const ManageManagerPage = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const permissionLabels = {
    product_access: "Product",
    blog_access: "Blog",
    order_access: "Orders",
    siteSetting_access: "Settings",
    customer_access: "Customers",
  };

  // ✅ USING NATIVE FETCH - No external API file
  const fetchManagers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);

      if (!token) {
        toast.error("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://bloomingbeauty.vercel.app/api/users/allmanager",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // If backend sends error message, show it
        throw new Error(data.message || "Failed to fetch managers");
      }

      console.log("Fetched Data:", data);

      // Handle array or object response
      const managerList = Array.isArray(data) ? data : data?.data || [];
      setManagers(managerList);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error(err.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleToggle = (managerId, key) => {
    setManagers((prev) =>
      prev.map((m) => (m._id === managerId ? { ...m, [key]: !m[key] } : m)),
    );
  };

  const handleSave = async (manager) => {
    setSavingId(manager._id);

    const payload = {};
    Object.keys(permissionLabels).forEach((key) => {
      payload[key] = manager[key] || false;
    });

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `https://bloomingbeauty.vercel.app/api/users/update-access/${manager._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success(`Permissions updated for ${manager.username}`);
    } catch (err) {
      toast.error(err.message || "Update failed");
      fetchManagers(); // Revert on error
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin text-red-500 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Managers</h1>
          <p className="text-gray-500 text-sm">
            Assign or revoke access permissions for managers.
          </p>
        </div>
        <button
          onClick={fetchManagers}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Managers List */}
      {managers.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 border shadow-sm">
          <div className="mb-4">
            <User className="w-12 h-12 mx-auto text-gray-300" />
          </div>
          No managers found.
          <p className="text-xs mt-2 text-gray-400">
            Make sure you have invited users and their role is set to 'manager'.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4 px-6 text-left">Manager Info</th>
                  <th className="py-4 px-6 text-center" colSpan="5">
                    Permissions
                  </th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {managers.map((manager) => (
                  <tr key={manager._id} className="hover:bg-gray-50/50">
                    {/* Info Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                          {manager.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {manager.username}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={12} /> {manager.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Permission Toggles */}
                    {Object.keys(permissionLabels).map((key) => (
                      <td key={key} className="py-4 px-4 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={manager[key] || false}
                            onChange={() => handleToggle(manager._id, key)}
                            className="sr-only peer"
                          />
                          <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </td>
                    ))}

                    {/* Action Column */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleSave(manager)}
                        disabled={savingId === manager._id}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition disabled:opacity-50"
                      >
                        {savingId === manager._id ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <Save size={14} />
                        )}
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageManagerPage;
