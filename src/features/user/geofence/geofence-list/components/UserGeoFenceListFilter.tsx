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
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Device, DeviceStatus, GeoFenceStatus } from "../../../../../models";
import DeviceAutoCompleteSelect from "../../../../../common/components/device/device-auto-complete-select/DeviceAutoCompleteSelect";

export interface IUserGeoFenceListFilterProps {
  isLoading: boolean;
  onFilterUpdate: (
    searchText: string | null,
    deviceSerial: string | null,
    status: GeoFenceStatus | string | null
  ) => void;
  onFilterReset: () => void;
}

function UserGeoFenceListFilter(props: IUserGeoFenceListFilterProps) {
  const { isLoading, onFilterReset, onFilterUpdate } = props;
  const [searchText, setSearchText] = useState("");
  const [device, setDevice] = useState<Device | null>(null);
  const [geoFenceStatus, setGeoFenceStatus] = useState<GeoFenceStatus | string>(
    ""
  );

  useEffect(() => {
    if (!device) {
      onClickSearch();
    }
  }, [device]);

  const onReset = () => {
    setSearchText("");
    setDevice(null);
    setGeoFenceStatus("");
    onFilterReset();
  };

  const onClickSearch = () => {
    onFilterUpdate(searchText, device ? device.serial : null, geoFenceStatus);
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
                placeholder="Search by name"
                name="searchText"
                autoComplete="off"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DeviceAutoCompleteSelect
                onSelect={(device) => setDevice(device)}
                selectedDevice={device}
                defaultFilter={{
                  status: DeviceStatus.ACTIVE,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="geo-fence-status-filter-select-label">
                  Status
                </InputLabel>
                <Select
                  labelId="geo-fence-status-filter-select-label"
                  id="geo-fence-status-filter-select"
                  value={geoFenceStatus}
                  label="Geo-fence status"
                  onChange={(e) => setGeoFenceStatus(e.target.value)}
                >
                  <MenuItem value={GeoFenceStatus.ACTIVE}>Active</MenuItem>
                  <MenuItem value={GeoFenceStatus.INACTIVE}>Inactive</MenuItem>
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
                    (!searchText && !device && !geoFenceStatus) || isLoading
                  }
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  disabled={
                    (!searchText && !device && !geoFenceStatus) || isLoading
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

export default UserGeoFenceListFilter;
