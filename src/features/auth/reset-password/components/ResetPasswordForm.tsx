import {
  TextField,
  Grid,
  Link,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ROUTES } from "../../../../constants";
import styles from "./ResetPasswordForm.module.scss";
import {
  ResetPasswordFormData,
  UserService,
} from "../../../../services/user.service";
import { useQueryParams } from "../../../../hooks/useQueryParams";

const forgetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .min(4, "Password must have minimum 4 characters")
      .required("Password is required"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match"),
  })
  .required();

function ResetPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(forgetPasswordSchema),
  });
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryParams = useQueryParams();

  useEffect(() => {
    if (!queryParams.get("token")) {
      navigate(ROUTES.AUTH.LOGIN);
    }
  }, [queryParams]);

  const onResetPasswordSubmit = async (data: ResetPasswordFormData) => {
    setIsResetPasswordLoading(true);
    try {
      await UserService.resetPassword({
        password: data.password,
        resetPasswordToken: queryParams.get("token") || "",
      });
      enqueueSnackbar(
        "Password reset done, please login using new credentials",
        {
          variant: "success",
        }
      );
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message
          ? e.message
          : "Unable to reset password, please try again",
        {
          variant: "error",
        }
      );
    } finally {
      setIsResetPasswordLoading(false);
      setTimeout(() => {
        navigate(ROUTES.AUTH.LOGIN);
      }, 500);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.LoginFormContainer}
      onSubmit={handleSubmit(onResetPasswordSubmit)}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} mb={1}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                placeholder="Password"
                label="Password"
                disabled={isResetPasswordLoading}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={1}>
          <Controller
            name="retypePassword"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                placeholder="Confirm Password"
                label="Confirm Password"
                disabled={isResetPasswordLoading}
                error={!!errors.retypePassword}
                helperText={errors.retypePassword?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mt={1}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isResetPasswordLoading}
          >
            {isResetPasswordLoading && (
              <CircularProgress
                size="1rem"
                color="primary"
                sx={{
                  marginRight: "8px",
                }}
              />
            )}
            Reset Password
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResetPasswordForm;
