import { Container, Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants";
import NotFoundIcon from "../../svg/NotFound";
import styles from "./NotFound.module.scss";

function NotFound() {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate(ROUTES.USER.DASHBOARD);
  };
  return (
    <Container fixed>
      <Box className={styles.NotFoundContainer}>
        <Box className={styles.NotFoundContainerInner}>
          <Typography variant="h4" mb={2}>
            Sorry, page not found!
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>
          <Box>
            <NotFoundIcon className={styles.NotFoundIcon} />
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={gotoHome}>
              Go to Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default NotFound;
