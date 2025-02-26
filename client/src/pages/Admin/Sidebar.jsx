import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

const Sidebar = () => {
  const navigate = useNavigate();
 
  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <button className="sidebtn" onClick={() => navigate("/")}>X</button>
      <ul>
        <li><Link to="/admin">ViewUser</Link></li>
        <li><Link to="/role">Create Role</Link></li>
        <li><Link to="/route">Create Route</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
