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

import { ROUTES } from "../../../../constants";
import { User } from "../../../../models";
import styles from "./LoginForm.module.scss";
import { useAppDispatch } from "../../../../store/hooks";
import { setLoggedIn } from "../../../common/reducers/userSlice";

const adminUser: User = {
  _id: "1",
  name: "Satya Paul",
  email: "admin@gmail.com",
  role: "admin",
};

const userUser: User = {
  _id: "2",
  name: "Satya Paul",
  email: "user@gmail.com",
  role: "user",
};

const DEFAULT_PASSWORD = "password";

function LoginForm() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const waitForFewTime = (n: number = 2000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), n);
    });
  };

  const onLoginClick = async () => {
    setIsLoginLoading(true);
    await waitForFewTime();
    let user: User | null = null;
    if (email === adminUser.email && password === DEFAULT_PASSWORD) {
      user = adminUser;
    } else if (email === userUser.email && password === DEFAULT_PASSWORD) {
      user = userUser;
    }
    if (!user) {
      enqueueSnackbar("Invalid email/password", {
        variant: "error",
      });
      setIsLoginLoading(false);
      return;
    }

    dispatch(
      setLoggedIn({
        userDetails: user,
        token: "xyz",
      })
    );
    await waitForFewTime(500);
    setIsLoginLoading(false);

    if (user.role === "admin") {
      navigate(ROUTES.ADMIN.DASHBOARD);
    } else {
      navigate(ROUTES.USER.DASHBOARD);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.LoginFormContainer}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} mb={1}>
          <TextField
            type="email"
            placeholder="Email address"
            label="Email address"
            disabled={isLoginLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} mb={1}>
          <TextField
            type="password"
            placeholder="Password"
            label="Password"
            disabled={isLoginLoading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} textAlign="right">
          <Link component={RouterLink} to={ROUTES.USER.DASHBOARD}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onLoginClick}
            disabled={isLoginLoading || !email || !password}
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
      </Grid>
    </Box>
  );
}

export default LoginForm;
