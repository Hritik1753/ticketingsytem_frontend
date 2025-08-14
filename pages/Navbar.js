"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    // Clear all saved data from localStorage
    localStorage.clear();

    // Redirect to login page
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        {role === "ADMIN" && (
          <a
            href="/AdminDashboard"
            className="hover:text-yellow-400 font-semibold"
          >
            Ticket
          </a>
        )}

        {role === "ADMIN" && (
          <a href="/User" className="hover:text-yellow-400 font-semibold">
            User
          </a>
        )}
      </div>

      {/* Right Section */}
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

