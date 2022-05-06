import { Grid, Paper, Skeleton } from "@mui/material";
import React from "react";

function DeviceWidgetSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
        padding: "16px",
        height: "120px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Skeleton variant="text" width="80%" animation="pulse" />
          <Skeleton variant="text" width="60%" animation="pulse" />
          <Skeleton variant="text" width="100%" animation="pulse" />
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Skeleton
                variant="rectangular"
                width="85%"
                height="20px"
                animation="pulse"
              />
            </Grid>
            <Grid item xs={5}>
              <Skeleton
                variant="rectangular"
                width="85%"
                height="20px"
                animation="pulse"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="circular"
                width="45px"
                height="45px"
                animation="wave"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="80%"
                height="36px"
                animation="pulse"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DeviceWidgetSkeleton;
