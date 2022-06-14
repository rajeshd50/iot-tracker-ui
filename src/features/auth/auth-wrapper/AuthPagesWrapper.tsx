import { Box, Container, Typography } from "@mui/material";
import React from "react";
import AppImage from "../../../common/components/system/AppImage/AppImage";

import styles from "./AuthPagesWrapper.module.scss";

export interface IAuthPagesWrapperProps {
  title?: string;
  subTitle?: string;
}

function AuthPagesWrapper(
  props: React.PropsWithChildren<IAuthPagesWrapperProps>
) {
  const {
    children,
    title = "Sign in to Ezytrack",
    subTitle = "Login to your account to know the live location",
  } = props;
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
      <Box className={styles.AuthPageContainer}>
        <Box
          className={styles.AuthPageSection}
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
            <Box className={styles.AuthPageHeaderSection}>
              <Box>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle1">{subTitle}</Typography>
              </Box>
              <Box>
                <AppImage src="/icons/android-icon-96x96.png" alt="Logo" />
              </Box>
            </Box>
            <Box>{children}</Box>
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

export default AuthPagesWrapper;
