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

import { DeviceFirmwareSyncStatus } from "../../../../../models";

export interface IAdminFirmwareFilterProps {
  isLoading: boolean;
  onFilterUpdate: (
    version: string | null,
    status: DeviceFirmwareSyncStatus | string | null
  ) => void;
  onFilterReset: () => void;
}

function AdminFirmwareFilter(props: IAdminFirmwareFilterProps) {
  const { isLoading, onFilterReset, onFilterUpdate } = props;
  const [version, setVersion] = useState("");
  const [status, setStatus] = useState<DeviceFirmwareSyncStatus | string>("");

  const onReset = () => {
    setVersion("");
    setStatus("");
    onFilterReset();
  };

  const onClickSearch = () => {
    onFilterUpdate(version, status);
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
                label="Version"
                placeholder="Search by version number"
                name="version"
                autoComplete="off"
                value={version}
                onChange={(e) => {
                  setVersion(e.target.value);
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
                  <MenuItem value={DeviceFirmwareSyncStatus.SYNCED}>
                    Synced
                  </MenuItem>
                  <MenuItem value={DeviceFirmwareSyncStatus.NOT_SYNCED}>
                    Not Synced
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
                  disabled={(!version && !status) || isLoading}
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  disabled={(!version && !status) || isLoading}
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

export default AdminFirmwareFilter;
