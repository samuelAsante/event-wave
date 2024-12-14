import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || String(user.role)?.toLowerCase() !== "admin") {
    return <Navigate to='/' />;
  }

  return children;
};

export default AdminRoute;
