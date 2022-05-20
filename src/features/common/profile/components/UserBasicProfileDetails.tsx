import { Grid } from "@mui/material";
import React from "react";
import UserBasicProfileInfo from "./UserBasicProfileInfo";
import UserBasicProfileUpdate from "./UserBasicProfileUpdate";

function UserBasicProfileDetails() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4} lg={6}>
        <UserBasicProfileInfo />
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        <UserBasicProfileUpdate />
      </Grid>
    </Grid>
  );
}

export default UserBasicProfileDetails;
