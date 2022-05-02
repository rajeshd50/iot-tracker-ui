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
import { User } from "../../../../models";
import styles from "./LoginForm.module.scss";
import { useAppDispatch } from "../../../../store/hooks";
import { setLoggedIn } from "../../../../store/reducers/userSlice";
import { LoginData, UserService } from "../../../../services/user.service";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must have minimum 4 characters")
      .required("Password is required"),
  })
  .required();

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const onLoginSubmit = async (data: LoginData) => {
    setIsLoginLoading(true);
    try {
      const loginResponse = await UserService.login(data);
      dispatch(
        setLoggedIn({
          userDetails: loginResponse.user,
          token: loginResponse.accessToken,
        })
      );
      if (loginResponse.user.role === "admin") {
        navigate(ROUTES.ADMIN.DASHBOARD, {
          replace: true,
        });
      } else {
        navigate(ROUTES.USER.DASHBOARD, {
          replace: true,
        });
      }
    } catch (e) {
      enqueueSnackbar("Invalid email/password", {
        variant: "error",
      });
      setIsLoginLoading(false);
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
                disabled={isLoginLoading}
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
                disabled={isLoginLoading}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} textAlign="right">
          <Link component={RouterLink} to={ROUTES.AUTH.FORGOT_PASSWORD}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoginLoading}
          >
            {isLoginLoading && (
              <CircularProgress
                size="1rem"
                color="primary"
                sx={{
                  marginRight: "8px",
                }}
              />
            )}
            Login
          </Button>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Grid container spacing={1}>
            <Grid item xs={12} textAlign="center" my={1}>
              Dont have an account?
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => {
                  navigate(ROUTES.AUTH.REGISTER);
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
