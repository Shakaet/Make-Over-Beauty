// app/component/LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Top from "./Top";
import Footer from "../footer/Footer";
import Nav from "./Nav";
import ContactIcons from "./ContactIcons";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Check if the current route is the dashboard
  const isDashboard = pathname.startsWith("/dashboard");

  // If it's the dashboard, render only the children (and maybe ContactIcons if you want)
  if (isDashboard) {
    return <>{children}</>;
  }

  // Otherwise, render the full layout with Nav, Top, Footer
  return (
    <>
      <Top
        props={[
          "Black Friday: 10% off storewide",
          "Free shipping on orders above $75",
          "Vegan • Cruelty‑free • Clean beauty",
          "New arrivals in skincare & haircare",
        ]}
      />
      <Nav />
      {children}
      <ContactIcons />
      <Footer />
    </>
  );
}
