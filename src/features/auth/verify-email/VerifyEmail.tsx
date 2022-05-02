import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { UserService } from "../../../services/user.service";
import AuthPagesWrapper from "../auth-wrapper/AuthPagesWrapper";

function VerifyEmail() {
  const queryParams = useQueryParams();
  const [verifyApiCalling, setVerifyApiCalling] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const verifyEmail = async (token: string | null) => {
    if (!token) {
      navigate(ROUTES.AUTH.LOGIN);
    }
    setVerifyApiCalling(true);
    try {
      await UserService.verifyEmail({ emailVerifyToken: token || "" });
      enqueueSnackbar("Email successfully verified", {
        variant: "success",
      });
      navigate(ROUTES.AUTH.LOGIN);
    } catch (error: any) {
      enqueueSnackbar(
        error && error.message ? error.message : "Invalid verification link",
        {
          variant: "error",
        }
      );
      navigate(ROUTES.AUTH.LOGIN);
    }
  };

  useEffect(() => {
    verifyEmail(queryParams.get("token"));
  }, [queryParams]);

  return (
    <AuthPagesWrapper
      title="Please wait while we verify your email"
      subTitle="You will be redirected to login/dashboard once done"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        {verifyApiCalling && <CircularProgress size="2rem" color="primary" />}
      </Box>
    </AuthPagesWrapper>
  );
}

export default VerifyEmail;
