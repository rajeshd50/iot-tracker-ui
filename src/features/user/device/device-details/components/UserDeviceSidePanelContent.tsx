import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import DeviceDetailsWidget from "../../../../../common/components/device/device-details-widget/DeviceDetailsWidget";
import { Device } from "../../../../../models/device.model";

export interface IUserDeviceSidePanelContentProps {
  onClose?: () => void;
  device: Device;
}

function UserDeviceSidePanelContent({
  onClose,
  device,
}: IUserDeviceSidePanelContentProps) {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  return (
    <Box>
      <DeviceDetailsWidget device={device} />
      <Grid
        container
        spacing={2}
        sx={{
          padding: "30px 10px",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1">Filters</Typography>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={12}>
            <DatePicker
              disableFuture
              label="Start Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              disableFuture
              label="End Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
      <Box
        sx={{
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
          },
          padding: "10px",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default UserDeviceSidePanelContent;
