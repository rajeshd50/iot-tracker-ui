import React from "react";
import { Box, Container, Typography } from "@mui/material";
import LoginForm from "./components/LoginForm";

import styles from "./Login.module.scss";
import AppImage from "../../../common/components/system/AppImage/AppImage";

function Login() {
  return (
    <Container fixed>
      <Box className={styles.LoginContainer}>
        <Box className={styles.LoginSection}>
          <Box className={styles.LoginHeaderSection}>
            <Box>
              <Typography variant="h5">
                Sign in to Ezymote vehicle tracker
              </Typography>
              <Typography variant="subtitle1">
                Enter your details below
              </Typography>
            </Box>
            <Box>
              <AppImage src="/icons/android-icon-96x96.png" alt="Logo" />
            </Box>
          </Box>
          <Box>
            <LoginForm />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
