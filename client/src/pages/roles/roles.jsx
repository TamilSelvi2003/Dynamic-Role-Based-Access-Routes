import React, { useState, useEffect } from "react";
import axios from "axios";
import './role.css';
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons

const RoleManagement = () => {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(`https://dynamic-role-based-access-routes.onrender.com/api/routes`);
        setAvailableRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`https://dynamic-role-based-access-routes.onrender.com/api/roles`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleRouteChange = (event) => {
    const { value, checked } = event.target;
    setSelectedRoutes((prevRoutes) =>
      checked ? [...prevRoutes, value] : prevRoutes.filter((route) => route !== value)
    );
  };

  const handleAddOrUpdateRole = async () => {
    if (roleName.trim() === "" || selectedRoutes.length === 0) {
      alert("Please enter a role name and select at least one route.");
      return;
    }

    const roleData = { role: roleName, routes: selectedRoutes };

    try {
      if (editingRoleId) {
        await axios.put(`https://dynamic-role-based-access-routes.onrender.com/api/roles/${editingRoleId}`, roleData);
        alert("Role updated successfully!");
      } else {
        await axios.post(`http://localhost:4000/api/roles`, roleData);
        alert("Role added successfully!");
      }

      const updatedRoles = await axios.get(`https://dynamic-role-based-access-routes.onrender.com/api/roles`);
      setRoles(updatedRoles.data);

      setRoleName("");
      setSelectedRoutes([]);
      setDropdownOpen(false);
      setEditingRoleId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await axios.delete(`https://dynamic-role-based-access-routes.onrender.com/api/roles/${roleId}`);
      const updatedRoles = await axios.get(`http://localhost:4000/api/roles`);
      setRoles(updatedRoles.data);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleEditRole = (role) => {
    setRoleName(role.role);
    setSelectedRoutes(role.routes || []);
    setEditingRoleId(role._id);
    setShowForm(true);
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>

      <button className="add-role-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Role"}
      </button>
      
      <button className="back-button" onClick={() => navigate("/admin-dash")}>X</button>

      {showForm && (
        <div className="role-form">
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          <div className="dropdown-container">
            <button className="toggle-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {dropdownOpen ? "Hide Routes" : "Select Routes"}
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                {availableRoutes.length > 0 ? (
                  availableRoutes.map((route) => (
                    <label key={route._id} className="route-item">
                      <input
                        type="checkbox"
                        value={route.path}
                        checked={selectedRoutes.includes(route.path)}
                        onChange={handleRouteChange}
                      />
                      {route.path}
                    </label>
                  ))
                ) : (
                  <p>Loading routes...</p>
                )}
              </div>
            )}
          </div>

          <button className="add-role-button" onClick={handleAddOrUpdateRole}>
            {editingRoleId ? "Update Role" : "Save Role"}
          </button>
        </div>
      )}

      <table className="roles-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Routes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td>{role.role}</td>
              <td>{role.routes ? role.routes.join(", ") : "No routes assigned"}</td>
              <td className="action-buttons">
                <button className="edit-button" onClick={() => handleEditRole(role)}>
                  <FaEdit /> {/* Edit icon */}
                </button>
                <button className="delete-button" onClick={() => handleDeleteRole(role._id)}>
                  <FaTrash /> {/* Delete icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
