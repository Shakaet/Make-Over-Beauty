"use client";

import React, { useState, useContext, useEffect } from "react"; // Import useEffect
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import { Home, Menu, X } from "lucide-react";
import { Context } from "../provider/AuthProvider";
import Loading from "../component/Loading";

// ==========================================
// 1. REAL IMPORTS
// ==========================================
// import Context from "@/provider/AuthProvider";
// import Loading from "@/component/Loading";
// ==========================================

// --- 2. THE SIDEBAR COMPONENT ---

const Sidebar = ({ dbUser, role: roleProp, open, onClose }) => {
  const pathname = usePathname();

  // 1. Determine the role safely
  const role = dbUser?.role || roleProp || "customer";

  // Configuration with added 'href' for routing
  const adminLinkConfig = [
    {
      label: "Overview",
      key: "adminOverview",
      href: "/dashboard",
      permissionKey: null,
    },
    {
      label: "Manage Products",
      key: "products",
      href: "/dashboard/products",
      permissionKey: "product_access",
    },
    {
      label: "Category & Brand",
      key: "categoryAndBrand",
      href: "/dashboard/categoryandbrand",
      permissionKey: "product_access",
    },
    // {
    //   label: "Manage Blogs",
    //   key: "blogs",
    //   href: "/dashboard/blogs",
    //   permissionKey: "blog_access",
    // },
    {
      label: "All Orders",
      key: "allorders",
      href: "/dashboard/allOrders",
      permissionKey: "order_access",
    },
    {
      label: "My Orders",
      key: "allorders",
      href: "/dashboard/my-orders",
      permissionKey: "order_access",
    },
    {
      label: "Users",
      key: "users",
      href: "/dashboard/users",
      permissionKey: "customer_access",
    },
    {
      label: "Site Setting",
      key: "settings",
      href: "/dashboard/settings",
      permissionKey: "siteSetting_access",
    },
    {
      label: "Manage Admins",
      key: "manageAdmins",
      href: "/dashboard/manage-admins",
      roleRequired: "admin",
    },
    {
      label: "Manage Manager",
      key: "manageManager",
      href: "/dashboard/manage-manager",
      roleRequired: "admin",
    },
    {
      label: "Profile",
      key: "profile",
      href: "/dashboard/profile",
      permissionKey: null,
    },
  ];

  const customerLinks = [
    { label: "Overview", key: "userOverview", href: "/dashboard" },
    { label: "Order History", key: "orders", href: "/dashboard/my-orders" },
    { label: "Profile", key: "profile", href: "/dashboard/profile" },
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

  console.log(dbUser);

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
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-600">
          <X size={24} />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center hidden md:block">
        Dashboard
      </h2>

      {/* Navigation */}
      <nav className="space-y-3">
        {roleLinks.length > 0 ? (
          roleLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group
                  ${
                    isActive
                      ? "bg-red-200 text-red-700 font-semibold shadow-inner"
                      : "hover:bg-red-50 hover:text-red-600 text-gray-600"
                  }
                `}
              >
                <span>{link.label}</span>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                )}
              </Link>
            );
          })
        ) : (
          <p className="text-center text-gray-400 text-sm mt-10">
            No access assigned
          </p>
        )}
      </nav>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 mb-6 hover:bg-white text-gray-600 rounded-xl border border-dashed border-gray-200 bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm mt-8"
      >
        <Home size={18} />
        <span className="font-medium">Back to Home</span>
      </Link>
    </aside>
  );
};

// --- 3. THE MAIN LAYOUT COMPONENT ---

export default function DashboardLayout({ children }) {
  const { user, dbUser, loading } = useContext(Context);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Initialize router

  // ==========================================
  // ✅ ACCESS CONTROL LOGIC (THE FIX)
  // ==========================================
  useEffect(() => {
    // Wait until loading is finished and we have user data
    if (loading || !dbUser) return;

    const role = dbUser.role;

    // 1. Customer Guard: Can only access specific pages
    if (role === "customer") {
      const allowedPaths = [
        "/dashboard",
        "/dashboard/my-orders",
        "/dashboard/profile",
      ];

      // If current path is NOT in allowed list, redirect to Overview
      if (!allowedPaths.includes(pathname)) {
        router.replace("/dashboard");
      }
    }

    // 2. Manager Guard: Check specific permissions
    if (role === "manager") {
      // Map paths to the specific permission required
      const permissionMap = {
        "/dashboard/products": "product_access",
        "/dashboard/categoryandbrand": "product_access",
        "/dashboard/blogs": "blog_access",
        "/dashboard/allOrders": "order_access",
        "/dashboard/users": "customer_access",
        "/dashboard/settings": "siteSetting_access",
      };

      const requiredPermission = permissionMap[pathname];

      // If this page requires a permission, check if manager has it
      if (requiredPermission && dbUser[requiredPermission] !== true) {
        router.replace("/dashboard"); // Redirect if no access
      }
    }

    // 3. Admin Guard: Can access everything, so no logic needed here.
  }, [dbUser, loading, pathname, router]);
  // ==========================================

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR (Desktop) */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen">
        <Sidebar
          dbUser={dbUser}
          role={dbUser?.role}
          open={false}
          onClose={() => {}}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-0 left-0 h-full z-50">
        <Sidebar
          dbUser={dbUser}
          role={dbUser?.role}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {dbUser?.name?.charAt(0) || dbUser?.username?.charAt(0) || "U"}
            </div>
            <span className="font-semibold text-sm text-gray-700 capitalize">
              {dbUser?.role || "Guest"}
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 p-1"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 w-full">{children}</main>
      </div>
    </div>
  );
}
