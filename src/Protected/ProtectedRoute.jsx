import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
