// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Splash from "./component/Splash";
import AuthProvider from "./provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "./component/LayoutWrapper";
// import LayoutWrapper from "./component/LayoutWrapper"; // Import the wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blooming Beauty By Moon - Pure Beauty & Premium Cosmetics",
  description:
    "Discover Blooming Beauty's premium beauty products. Vegan, cruelty-free cosmetics with clean ingredients.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* Splash is kept outside the wrapper so it shows on the initial load for the site, 
              but you can move it inside LayoutWrapper if you don't want it on the Dashboard at all. */}
          <Splash />

          {/* The wrapper handles hiding Nav/Footer for Dashboard */}
          <LayoutWrapper>{children}</LayoutWrapper>

          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
