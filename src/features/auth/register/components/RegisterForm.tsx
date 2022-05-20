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
import styles from "./RegisterForm.module.scss";
import { useAppDispatch } from "../../../../store/hooks";
import { setLoggedIn } from "../../../../store/reducers/userSlice";
import {
  LoginData,
  RegisterData,
  UserService,
} from "../../../../services/user.service";

const registerSchema = yup
  .object({
    firstName: yup
      .string()
      .max(60, "First name should be within 60 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .max(60, "Last name should be within 60 characters")
      .required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must have minimum 4 characters")
      .required("Password is required"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match"),
  })
  .required();

function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      retypePassword: "",
    },
    resolver: yupResolver(registerSchema),
  });
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const onRegisterSubmit = async (data: RegisterData) => {
    setIsRegisterLoading(true);
    try {
      const registerResponse = await UserService.register(data);
      dispatch(
        setLoggedIn({
          userDetails: registerResponse.user,
          token: registerResponse.accessToken,
        })
      );
      if (registerResponse.user.role === "admin") {
        navigate(ROUTES.ADMIN.DASHBOARD, {
          replace: true,
        });
      } else {
        navigate(ROUTES.USER.DASHBOARD, {
          replace: true,
        });
      }
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Unable to register, please try again",
        {
          variant: "error",
        }
      );
      setIsRegisterLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.LoginFormContainer}
      onSubmit={handleSubmit(onRegisterSubmit)}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} mb={1}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                type="text"
                placeholder="First name"
                label="First name"
                disabled={isRegisterLoading}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={1}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                type="text"
                placeholder="Last Name"
                label="Last Name"
                disabled={isRegisterLoading}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={1}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                type="email"
                placeholder="Email address"
                label="Email address"
                disabled={isRegisterLoading}
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={1}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                placeholder="Password"
                label="Password"
                disabled={isRegisterLoading}
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
                disabled={isRegisterLoading}
                error={!!errors.retypePassword}
                helperText={errors.retypePassword?.message}
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
            disabled={isRegisterLoading}
          >
            {isRegisterLoading && (
              <CircularProgress
                size="1rem"
                color="primary"
                sx={{
                  marginRight: "8px",
                }}
              />
            )}
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterForm;
