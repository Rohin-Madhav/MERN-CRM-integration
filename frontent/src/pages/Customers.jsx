// src/pages/Customers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/Api";
import { Link } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add customer
  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${API_URL}/api/customers`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: "", email: "", company: "" });
      fetchCustomers();
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };

  // Update customer
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.patch(`${API_URL}/api/customer/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: "", email: "", company: "" });
      setEditingId(null);
      fetchCustomers();
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  // Edit customer (populate form)
  const handleEdit = (customer) => {
    setFormData(customer);
    setEditingId(customer._id);
  };

  // Delete customer
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/delcustomer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-green-600 mb-6">
        Customer Management
      </h2>
      <div className="absolute top-4 right-6">
        <Link
          to="/dashboard"
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200 font-medium"
        >
          Dashboard
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={editingId ? handleUpdate : handleAdd}
        className="space-y-4 mb-8"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200"
        >
          {editingId ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      {/* Customer List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg shadow-sm">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr
                key={c._id}
                className={`border-b hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 font-medium">{c.name}</td>
                <td className="py-3 px-4">{c.email}</td>
                <td className="py-3 px-4">{c.company}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-500 transition duration-200 mr-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition duration-200"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
