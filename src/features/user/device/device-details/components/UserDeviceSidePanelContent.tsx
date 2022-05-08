import {
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import DeviceDetailsWidget from "../../../../../common/components/device/device-details-widget/DeviceDetailsWidget";
import { Device } from "../../../../../models/device.model";
import { grey } from "@mui/material/colors";
import UserDeviceDriverDetails from "./UserDeviceDriverDetails";

export interface IUserDeviceSidePanelContentProps {
  onClose?: () => void;
  device: Device;
  isMobile?: boolean;
}

function UserDeviceSidePanelContent({
  onClose,
  device,
  isMobile = false,
}: IUserDeviceSidePanelContentProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [liveData, setLiveData] = useState(true);

  return (
    <Box
      sx={{
        borderLeft: !isMobile ? `1px solid ${grey[200]}` : "none",
      }}
    >
      {isMobile && (
        <Box
          sx={{
            padding: "10px 15px",
          }}
        >
          <DeviceDetailsWidget isMobile device={device} />
        </Box>
      )}
      <Grid
        container
        spacing={2}
        sx={{
          padding: "8px 10px",
        }}
      >
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant="h6">Live Data</Typography>
              <Typography
                sx={{
                  color: grey[600],
                  fontSize: "12px",
                }}
              >
                To filter by date please disable live data
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Switch
                  checked={liveData}
                  onChange={(e, checked) => setLiveData(checked)}
                  size="small"
                  inputProps={{
                    "aria-label": "Live Data Switch",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              color: liveData ? grey[500] : grey[800],
            }}
          >
            Filters
          </Typography>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={12}>
            <DateTimePicker
              disableFuture
              label="Start Date"
              openTo="day"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={liveData}
            />
          </Grid>
          <Grid item xs={12}>
            <DateTimePicker
              disableFuture
              label="End Date"
              openTo="day"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={liveData}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "8px 10px",
        }}
      >
        <Grid item xs={12}>
          <UserDeviceDriverDetails device={device} />
        </Grid>
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
