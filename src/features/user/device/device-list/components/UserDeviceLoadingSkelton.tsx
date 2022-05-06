import { Box, Grid, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

function UserDeviceLoadingSkelton() {
  return (
    <Box
      sx={{
        margin: "15px 0",
        borderRadius: "4px",
        padding: "15px",
        position: "relative",
        border: `1px solid ${grey[200]}`,
        width: "100%",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="80%"
                height="24px"
              />
            </Grid>
            <Grid item xs={4}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="24px"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" animation="wave" width="80%" />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" animation="wave" width="60%" />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="32px"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDeviceLoadingSkelton;
