import { alpha, Box, Chip, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import DeviceStatusChip from "../../../../../common/components/device/device-status-chip/DeviceStatusChip";
import { Device } from "../../../../../models/device.model";

export interface IUserDeviceDetailsCardProps {
  device: Device;
}

interface IDetailsLabelWithValueProps {
  label: string;
  value: string;
}
function DetailsLabelWithValue({ label, value }: IDetailsLabelWithValueProps) {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Typography
          variant="subtitle2"
          sx={{
            marginRight: "8px",
          }}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="subtitle2">{value}</Typography>
      </Grid>
    </Grid>
  );
}

function UserDeviceDetailsCard({ device }: IUserDeviceDetailsCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: alpha(grey[200], 0.5),
        margin: "15px 0",
        borderRadius: "4px",
        padding: "15px",
        position: "relative",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={10}>
          <Grid container>
            <Grid item xs={12}>
              <DetailsLabelWithValue label="Name" value={device.name} />
            </Grid>
            <Grid item xs={12}>
              <DetailsLabelWithValue
                label="Serial Number"
                value={device.serialNumber}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: {
                xs: "flex-start",
                sm: "flex-end",
              },
              alignItems: "flex-start",
            }}
          >
            <DeviceStatusChip status={device.details.status} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDeviceDetailsCard;
