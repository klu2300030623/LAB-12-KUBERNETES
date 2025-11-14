import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Use environment variable instead of hardcoding
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", department: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, form);
        alert("Employee updated successfully!");
      } else {
        await axios.post(API_URL, form);
        alert("Employee added successfully!");
      }
      resetForm();
      await fetchEmployees(); // Refresh after add/update
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Employee deleted successfully!");
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err);
      }
    }
  };

  const resetForm = () => {
    setForm({ id: "", name: "", email: "", department: "" });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
        padding: "40px 0",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#222",
          marginBottom: "30px",
        }}
      >
        Employee Management System
      </h1>

      {/* Form Container */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "10px",
          width: "85%",
          maxWidth: "1200px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            type="text"
            name="department"
            placeholder="Enter Department"
            value={form.department}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: isEditing ? "#f39c12" : "#27ae60",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
        </form>

        {/* Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            fontSize: "1rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>ID</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Email</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Department</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ padding: "15px", color: "#888", backgroundColor: "#f9f9f9" }}
                >
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((emp, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#f2f8ff" : "#ffffff",
                    color: "#333",
                  }}
                >
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{emp.id}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{emp.name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{emp.email}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {emp.department}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleEdit(emp)}
                      style={{
                        backgroundColor: "#f1c40f",
                        color: "white",
                        padding: "6px 10px",
                        border: "none",
                        borderRadius: "5px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        padding: "6px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
