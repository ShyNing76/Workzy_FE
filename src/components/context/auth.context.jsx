import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  appLoading: true,
  loginLoading: true,
  registerLoading: true,
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
  });

  const [appLoading, setAppLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
