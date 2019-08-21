import React from "react";

const AuthContext = React.createContext({
  authData: { success: false, token: "" },
  handleAuthDataChange: () => {}
});

export default AuthContext;
