import React, { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  //   Children props
  const { children, roleID, requiredRoleID } = props;
  //   auth from auth Context (use context)
  const { auth } = useContext(AuthContext);

  //   Check auth from user has login or not
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return roleID === requiredRoleID ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
