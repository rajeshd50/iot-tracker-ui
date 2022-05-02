import {
  TextField,
  Grid,
  Link,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ROUTES } from "../../../../constants";
import styles from "./ForgetPasswordForm.module.scss";
import {
  ForgetPasswordData,
  UserService,
} from "../../../../services/user.service";

const forgetPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  })
  .required();

function ForgetPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordData>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgetPasswordSchema),
  });
  const [isForgetPasswordLoading, setIsForgetPasswordLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onLoginSubmit = async (data: ForgetPasswordData) => {
    setIsForgetPasswordLoading(true);
    try {
      await UserService.forgetPassword(data);
      enqueueSnackbar(
        "If email exists in our system, a reset password email will be sent",
        {
          variant: "success",
        }
      );
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message
          ? e.message
          : "Unable to send email to reset password, please try again",
        {
          variant: "error",
        }
      );
    } finally {
      setIsForgetPasswordLoading(false);
      setTimeout(() => {
        navigate(ROUTES.AUTH.LOGIN);
      }, 1000);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.LoginFormContainer}
      onSubmit={handleSubmit(onLoginSubmit)}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} mb={1}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                type="email"
                placeholder="Email address"
                label="Email address"
                disabled={isForgetPasswordLoading}
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} textAlign="right">
          <Link component={RouterLink} to={ROUTES.AUTH.LOGIN}>
            Back to login
          </Link>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isForgetPasswordLoading}
          >
            {isForgetPasswordLoading && (
              <CircularProgress
                size="1rem"
                color="primary"
                sx={{
                  marginRight: "8px",
                }}
              />
            )}
            Send reset password email
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgetPasswordForm;
