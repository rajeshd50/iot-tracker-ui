import { Box, Grid } from "@mui/material";
import React from "react";
import PageHeader from "../../../../common/components/page-header/PageHeader";
import UserDeviceAddForm from "./components/UserDeviceAddForm";
import UserDeviceAddInstruction from "./components/UserDeviceAddInstruction";

function UserDeviceAdd() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <PageHeader title="Add new device" showBorderBottom />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <UserDeviceAddForm />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <UserDeviceAddInstruction />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDeviceAdd;
