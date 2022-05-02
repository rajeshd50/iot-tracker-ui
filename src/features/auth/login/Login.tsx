import React from "react";
import LoginForm from "./components/LoginForm";

import AuthPagesWrapper from "../auth-wrapper/AuthPagesWrapper";

function Login() {
  
  return (
    <AuthPagesWrapper>
      <LoginForm/>
    </AuthPagesWrapper>
  );
}

export default Login;
