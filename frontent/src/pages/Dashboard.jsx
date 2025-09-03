import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../api/Api";
import axios from "axios";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/customers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCustomers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);
  if (loading) return <p className="p-6 text-gray-600">Loading customers...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error.message}</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-2xl font-bold text-green-600 mb-8">CRM</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/customers"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium"
          >
            👥 Customers
          </Link>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome Back, Admin 👋
          </h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search customers..."
              className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Customer Dashboard
          </h1>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-600 text-white text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Company</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr
                    key={customer._id}
                    className={`border-b hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {customer.name}
                    </td>
                    <td className="p-3 text-gray-600">{customer.email}</td>
                    <td className="p-3">{customer.company || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
