import React from "react";
import AuthPagesWrapper from "../auth-wrapper/AuthPagesWrapper";
import ResetPasswordForm from "./components/ResetPasswordForm";

function ResetPassword() {
  return (
    <AuthPagesWrapper title="Reset your password" subTitle="Enter new password">
      <ResetPasswordForm />
    </AuthPagesWrapper>
  );
}

export default ResetPassword;
