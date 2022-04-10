import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import DeviceDetailsWidget from "../../../../../common/components/device/device-details-widget/DeviceDetailsWidget";

function UserDeviceSidePanelContent() {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  return (
    <Box>
      <DeviceDetailsWidget
        title="Device One"
        subTitle="truck1"
        status="online"
      />
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
    </Box>
  );
}

export default UserDeviceSidePanelContent;
