import React from "react";
import AuthPagesWrapper from "../auth-wrapper/AuthPagesWrapper";
import ForgetPasswordForm from "./components/ForgetPasswordForm";

function ForgetPassword() {
  return (
    <AuthPagesWrapper
      title="Forget your password?"
      subTitle="Enter your email address, we'll send you an email with instruction"
    >
      <ForgetPasswordForm />
    </AuthPagesWrapper>
  );
}

export default ForgetPassword;
