import { useState, useEffect } from "react";

const useAuth = () => {
  const [userRole, setUserRole] = useState(null); // 'admin', 'manager', 'customer', or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      setLoading(true);
      setError(null);

      // 1. Get the email from where you stored it after login (e.g., localStorage)
      const email = localStorage.getItem("userEmail");

      if (!email) {
        setUserRole("guest");
        setLoading(false);
        return;
      }

      try {
        // 2. Check if Admin
        const adminRes = await fetch(
          `https://bloomingbeauty.vercel.app/api/users/getadmin/${email}`,
        );
        const adminData = await adminRes.json();

        if (adminData.admin) {
          setUserRole("admin");
          setLoading(false);
          return;
        }

        // 3. Check if Manager
        const managerRes = await fetch(
          `https://bloomingbeauty.vercel.app/api/users/getmanager/${email}`,
        );
        const managerData = await managerRes.json();

        if (managerData.manager) {
          setUserRole("manager");
          setLoading(false);
          return;
        }

        // 4. Check if Customer
        const customerRes = await fetch(
          `https://bloomingbeauty.vercel.app/api/users/getCustomer/${email}`,
        );
        const customerData = await customerRes.json();

        if (customerData.customer) {
          setUserRole("customer");
        } else {
          setUserRole("guest"); // Logged in but no specific role found
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        setError("Failed to verify user role");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { userRole, loading, error };
};

export default useAuth;
