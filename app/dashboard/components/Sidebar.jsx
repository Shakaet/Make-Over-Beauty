"use client";

import Link from "next/link"; // Import Link
import { Home } from "lucide-react"; // Import Icon

export default function Sidebar({
  role: roleProp,
  dbUser,
  active,
  setActiveTab,
  open,
}) {
  // 1. Determine the role safely
  const role = dbUser?.role || roleProp || "customer";

  // Configuration for Admin/Manager links
  const adminLinkConfig = [
    { label: "Overview", key: "adminOverview", permissionKey: null },
    {
      label: "Manage Products",
      key: "products",
      permissionKey: "product_access",
    },
    {
      label: "Category & Brand",
      key: "categoryAndBrand",
      permissionKey: "product_access",
    },
    { label: "Manage Blogs", key: "blogs", permissionKey: "blog_access" },
    { label: "All Orders", key: "allorders", permissionKey: "order_access" },
    { label: "Users", key: "users", permissionKey: "customer_access" },
    {
      label: "Site Setting",
      key: "settings",
      permissionKey: "siteSetting_access",
    },
    { label: "Manage Admins", key: "manageAdmins", roleRequired: "admin" },
    { label: "Manage Manager", key: "manageManager", roleRequired: "admin" },
    { label: "Profile", key: "profile", permissionKey: null },
  ];

  const customerLinks = [
    { label: "Overview", key: "userOverview" },
    { label: "Order History", key: "orders" },
    { label: "Profile", key: "profile" },
  ];

  // 2. Logic to determine which links to show
  let roleLinks = [];

  if (role === "customer") {
    roleLinks = customerLinks;
  } else if (role === "admin") {
    roleLinks = adminLinkConfig;
  } else if (role === "manager") {
    roleLinks = adminLinkConfig.filter((link) => {
      if (link.roleRequired && link.roleRequired !== role) {
        return false;
      }
      if (link.permissionKey) {
        return dbUser?.[link.permissionKey] === true;
      }
      return true;
    });
  }

  return (
    <aside
      className={`
         md:static top-0 left-0 z-50 h-full sticky w-64
        bg-gradient-to-b from-[#ffe8e6] to-[#fff5f3]
        border-r shadow-lg p-6
        transform transition-transform duration-300 overflow-y-auto  
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>

      {/* ----------------------------- */}
      {/* BACK TO HOME LINK */}
      {/* ----------------------------- */}

      <nav className="space-y-3">
        {roleLinks.length > 0 ? (
          roleLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => setActiveTab(link.key)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                active === link.key
                  ? "bg-red-200 text-red-700 font-semibold shadow-inner"
                  : "hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {link.label}
            </button>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm mt-10">
            No access assigned
          </p>
        )}
      </nav>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 mb-6 hover:bg-white text-gray-600 rounded-xl border border-dashed border-gray-200 bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm mt-1"
      >
        <Home size={18} />
        <span className="font-medium">Back to Home</span>
      </Link>
    </aside>
  );
}
