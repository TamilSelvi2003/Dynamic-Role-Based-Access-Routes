

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import "./route.css"; // Import CSS file

const CreateRoute = () => {
  const navigate = useNavigate();
  const [routeName, setRouteName] = useState("");
  const [routePath, setRoutePath] = useState("");
  const [routes, setRoutes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editRouteId, setEditRouteId] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("https://dynamic-role-based-access-routes.onrender.com/api/routes");
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!routeName.trim() || !routePath.trim()) {
      alert("Please enter both route name and route path.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`https://dynamic-role-based-access-routes.onrender.com/api/routes/${editRouteId}`, {
          path: routePath,
          name: routeName,
        });
        alert("Route updated successfully!");
      } else {
        const response = await axios.post("https://dynamic-role-based-access-routes.onrender.com/api/routes", {
          path: routePath,
          name: routeName,
        });
        setRoutes([...routes, response.data]);
        alert("Route added successfully!");
      }

      setRouteName("");
      setRoutePath("");
      setIsEditing(false);
      setEditRouteId(null);
    } catch (error) {
      console.error("Error submitting route:", error);
      alert("An error occurred while adding or updating the route.");
    }
  };

  const handleEdit = (route) => {
    setRouteName(route.name);
    setRoutePath(route.path);
    setIsEditing(true);
    setEditRouteId(route._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dynamic-role-based-access-routes.onrender.com/api/routes/${id}`);
      setRoutes(routes.filter((route) => route._id !== id));
      alert("Route deleted successfully!");
    } catch (error) {
      console.error("Error deleting route:", error);
      alert("An error occurred while deleting the route.");
    }
  };

  return (
    <div className="route-container">
      <button className="back-btn" onClick={() => navigate("/admin-dash")}>
        Back
      </button>
      <h3 className="route-title">{isEditing ? "Edit Route" : "Create Route"}</h3>

      <form className="route-form" onSubmit={handleSubmit}>
        <input
          className="route-input"
          type="text"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          placeholder="Enter Route Name"
          required
        />
        <input
          className="route-input"
          type="text"
          value={routePath}
          onChange={(e) => setRoutePath(e.target.value)}
          placeholder="Enter Route Path"
          required
        />
        <button className="route-submit" >
          {isEditing ? "Update Route" : "Add Route"}
        </button>
      </form>

      <table className="route-table">
        <thead>
          <tr>
            <th>Route Name</th>
            <th>Route Path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route._id}>
              <td>{route.name}</td>
              <td>{route.path}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(route)}>
                  <FaEdit />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(route._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateRoute;
