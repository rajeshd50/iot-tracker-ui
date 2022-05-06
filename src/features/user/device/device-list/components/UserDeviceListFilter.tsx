import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { DeviceLiveStatus, DeviceStatus } from "../../../../../models";

export interface IUserDeviceListFilterProps {
  isLoading: boolean;
  onFilterUpdate: (
    searchText: string | null,
    liveStatus: DeviceLiveStatus | string | null,
    status: DeviceStatus | string | null
  ) => void;
  onFilterReset: () => void;
}

function UserDeviceListFilter(props: IUserDeviceListFilterProps) {
  const { isLoading, onFilterReset, onFilterUpdate } = props;
  const [searchText, setSearchText] = useState("");
  const [liveStatus, setLiveStatus] = useState<DeviceLiveStatus | string>("");
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus | string>("");

  const onReset = () => {
    setSearchText("");
    setLiveStatus("");
    setDeviceStatus("");
    onFilterReset();
  };

  const onClickSearch = () => {
    onFilterUpdate(searchText, liveStatus, deviceStatus);
  };

  return (
    <Box
      sx={{
        margin: "15px 0",
      }}
    >
      <Accordion
        elevation={0}
        sx={{
          "&.MuiPaper-root": {
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="device-filter-content"
          id="device-filter-header"
        >
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Search"
                placeholder="Search by serial/vehicle name/number"
                name="searchText"
                autoComplete="off"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="live-status-filter-select-label">
                  Live status
                </InputLabel>
                <Select
                  labelId="live-status-filter-select-label"
                  id="live-status-filter-select"
                  value={liveStatus}
                  label="Live status"
                  onChange={(e) => setLiveStatus(e.target.value)}
                >
                  <MenuItem value={DeviceLiveStatus.ONLINE}>Online</MenuItem>
                  <MenuItem value={DeviceLiveStatus.OFFLINE}>Offline</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="device-status-filter-select-label">
                  Status
                </InputLabel>
                <Select
                  labelId="device-status-filter-select-label"
                  id="device-status-filter-select"
                  value={deviceStatus}
                  label="Device status"
                  onChange={(e) => setDeviceStatus(e.target.value)}
                >
                  <MenuItem value={DeviceStatus.ACTIVE}>Active</MenuItem>
                  <MenuItem value={DeviceStatus.INACTIVE}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} item>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: {
                    xs: "space-between",
                    sm: "space-between",
                    md: "flex-end",
                  },
                  alignItems: "center",
                  "& .MuiButton-root": {
                    marginLeft: {
                      xs: "0",
                      sm: "0",
                      md: "30px",
                    },
                  },
                }}
              >
                <Button
                  color="secondary"
                  disabled={
                    (!searchText && !liveStatus && !deviceStatus) || isLoading
                  }
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  disabled={
                    (!searchText && !liveStatus && !deviceStatus) || isLoading
                  }
                  color="primary"
                  variant="contained"
                  onClick={onClickSearch}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default UserDeviceListFilter;
