import React from "react";
import { Box, Container, Typography } from "@mui/material";
import LoginForm from "./components/LoginForm";

import styles from "./Login.module.scss";
import AppImage from "../../../common/components/system/AppImage/AppImage";

function Login() {
  const getProductDevelopedByText = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: 600,
          }}
        >
          A Product of Vincenzo Technology Pvt. Ltd.
        </Typography>
      </Box>
    );
  };
  return (
    <Container fixed maxWidth="lg">
      <Box className={styles.LoginContainer}>
        <Box
          className={styles.LoginSection}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              "& img": {
                width: {
                  md: "16rem",
                  lg: "28rem",
                },
              },
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            <AppImage src="/img/tracking.jpg" alt="bg logo" />
            {getProductDevelopedByText()}
          </Box>
          <Box>
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
            <Box
              sx={{
                display: {
                  sm: "block",
                  md: "none",
                },
                marginTop: "1rem",
              }}
            >
              {getProductDevelopedByText()}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
