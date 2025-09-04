import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to CRM System
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 mb-8">
        Manage your customers efficiently with our simple CRM.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
