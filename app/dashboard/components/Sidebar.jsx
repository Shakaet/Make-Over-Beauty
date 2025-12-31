"use client";

export default function Sidebar({ role, active, setActiveTab, open }) {
    const links = {
        customer: [
            { label: "Overview", key: "userOverview" },
            { label: "Order History", key: "orders" },
            { label: "Profile", key: "profile" },
        ],
        admin: [
            { label: "Overview", key: "adminOverview" },
            { label: "Manage Products", key: "products" },
            { label: "Category & Brand", key: "categoryAndBrand" },
            { label: "All Orders", key: "allorders" },
            { label: "Users", key: "users" },
            { label: "Site Setting", key: "settings" },
            { label: "Profile", key: "profile" },
        ],
    };

    const roleLinks = links[role] || links.customer;

    return (
        <aside
            className={`
        fixed md:static top-0 left-0 z-50 min-h-screen h-full w-64
        bg-gradient-to-b from-[#ffe8e6] to-[#fff5f3]
        border-r shadow-lg p-6
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
        >
            <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>

            <nav className="space-y-3">
                {roleLinks.map((link) => (
                    <button
                        key={link.key}
                        onClick={() => setActiveTab(link.key)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${active === link.key
                            ? "bg-red-200 text-red-700 font-semibold shadow-inner"
                            : "hover:bg-red-50 hover:text-red-600"
                            }`}
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
