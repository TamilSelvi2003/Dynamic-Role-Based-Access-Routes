import React, { useState } from "react";
import "./Admin.css";
import Sidebar from "./Sidebar";


const AdminDashboard = () => {
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
  };

  return (
    <>
      <Sidebar selectedRole={selectedRole} onRoleChange={handleRoleChange} />
     
    
        </>
  );
};

export default AdminDashboard;
