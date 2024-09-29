import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  appLoading: true,
  loginLoading: true,
  registerLoading: true,
  roleId: localStorage.getItem("role_id"),
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
  });

  const [appLoading, setAppLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  // Role Id
  const [roleId, setRoleId] = useState(localStorage.getItem("role_id"));

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        appLoading,
        setAppLoading,
        loginLoading,
        setLoginLoading,
        registerLoading,
        setRegisterLoading,
        roleId,
        setRoleId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
