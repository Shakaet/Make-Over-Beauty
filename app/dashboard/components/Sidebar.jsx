"use client";

export default function Sidebar({ role, active, setActiveTab }) {
    const links = {
        customer: [
            { label: "Overview", key: "overview" },
            { label: "Order History", key: "orders" }
        ],

        manager: [
            { label: "Overview", key: "overview" },
            { label: "Manage Products", key: "products" },
            { label: "Orders", key: "orders" },
            { label: "Profile", key: "profile" }
        ],

        admin: [
            { label: "Overview", key: "overview" },
            { label: "All Orders", key: "orders" },
            { label: "Users", key: "users" },
            { label: "Site Setting", key: "settings" },
            { label: "Profile", key: "profile" },
            { label: "Manager Access", key: "AccessManager" }
        ]
    };

    const roleLinks = links[role] || links["customer"];

    return (
        <aside className="w-64 border-r shadow-lg p-6 hidden md:block bg-gradient-to-b from-[#ffe8e6] to-[#fff5f3] rounded-r-xl">
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
