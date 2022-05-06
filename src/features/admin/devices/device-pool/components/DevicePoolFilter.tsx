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

import { DevicePoolStatus } from "../../../../../models";

export interface IDevicePoolFilterProps {
  isLoading: boolean;
  onFilterUpdate: (
    serial: string | null,
    status: DevicePoolStatus | string | null
  ) => void;
  onFilterReset: () => void;
}

function DevicePoolFilter(props: IDevicePoolFilterProps) {
  const { isLoading, onFilterReset, onFilterUpdate } = props;
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState<DevicePoolStatus | string>("");

  const onReset = () => {
    setSerial("");
    setStatus("");
    onFilterReset();
  };

  const onClickSearch = () => {
    onFilterUpdate(serial, status);
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
                label="Serial"
                placeholder="Serial number"
                name="serial"
                autoComplete="off"
                value={serial}
                onChange={(e) => {
                  setSerial(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="status-filter-select-label">Status</InputLabel>
                <Select
                  labelId="status-filter-select-label"
                  id="status-filter-select"
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={DevicePoolStatus.CREATED}>Created</MenuItem>
                  <MenuItem value={DevicePoolStatus.CONFIGURED}>
                    Configured
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} md={4} item>
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
                  disabled={(!serial && !status) || isLoading}
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  disabled={(!serial && !status) || isLoading}
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

export default DevicePoolFilter;
