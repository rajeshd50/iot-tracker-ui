import { TextField, Grid, Link, Button, Box } from "@mui/material";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { ROUTES } from "../../../../constants";
import styles from "./LoginForm.module.scss";

function LoginForm() {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate(ROUTES.USER.DASHBOARD);
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
          />
        </Grid>
        <Grid item xs={12} mb={1}>
          <TextField type="password" placeholder="Password" label="Password" />
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
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
