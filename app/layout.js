import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./component/Nav";
import Top from "./component/Top";
import Splash from "./component/Splash";
import AuthProvider from "./provider/AuthProvider";
import Footer from "./footer/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LILAC - Pure Beauty & Premium Cosmetics",
  description: "Discover LILAC's premium beauty products. Vegan, cruelty-free cosmetics with clean ingredients.",
};

export default function RootLayout({ children }) {

  const ANNOUNCEMENTS = [
    "Black Friday: 10% off storewide",
    "Free shipping on orders above $75",
    "Vegan • Cruelty‑free • Clean beauty",
    "New arrivals in skincare & haircare",
  ]
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Splash />
          <Top props={ANNOUNCEMENTS}></Top>
          <Nav></Nav>
          <Toaster position="top-center" />
          {children}

          <Footer ></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}
