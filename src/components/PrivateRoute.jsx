import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { auth } = useAuth();

  // Check if the user is authenticated
  return auth.isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;