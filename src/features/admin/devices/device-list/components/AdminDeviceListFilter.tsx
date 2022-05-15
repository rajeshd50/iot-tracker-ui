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
import UserAutoCompleteSelect from "../../../../../common/components/admin/user-autocomplete-select/UserAutoCompleteSelect";
import { DeviceAssignStatus, DeviceStatus, User } from "../../../../../models";

export interface IAdminDeviceListFilterProps {
  isLoading: boolean;
  onFilterUpdate: (
    serial: string | null,
    user: string | null,
    deviceStatus: DeviceAssignStatus | string | null,
    assignedStatus: DeviceAssignStatus | string | null
  ) => void;
  onFilterReset: () => void;
}

function AdminDeviceListFilter(props: IAdminDeviceListFilterProps) {
  const { isLoading, onFilterReset, onFilterUpdate } = props;
  const [serial, setSerial] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<
    DeviceStatus | string | null
  >("");
  const [assignedStatus, setAssignedStatus] = useState<
    DeviceAssignStatus | string | null
  >("");

  const onReset = () => {
    setSerial("");
    setUser(null);
    setDeviceStatus("");
    setAssignedStatus("");
    onFilterReset();
  };

  useEffect(() => {
    if (!user) {
      onClickSearch();
    }
  }, [user]);

  const onClickSearch = () => {
    onFilterUpdate(serial, user ? user.id : null, deviceStatus, assignedStatus);
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
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
              <UserAutoCompleteSelect
                onSelect={(newUser) => setUser(newUser)}
                onClear={() => setUser(null)}
                selectedUser={user}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="device-status-filter-select-label">
                  Device Status
                </InputLabel>
                <Select
                  labelId="device-status-filter-select-label"
                  id="device-status-filter-select"
                  value={deviceStatus}
                  label="Status"
                  onChange={(e) => setDeviceStatus(e.target.value)}
                >
                  <MenuItem value={DeviceStatus.ACTIVE}>Active</MenuItem>
                  <MenuItem value={DeviceStatus.INACTIVE}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="device-assign-status-filter-select-label">
                  Assignment Status
                </InputLabel>
                <Select
                  labelId="device-assign-status-filter-select-label"
                  id="device-assign-status-filter-select"
                  value={assignedStatus}
                  label="Status"
                  onChange={(e) => setAssignedStatus(e.target.value)}
                >
                  <MenuItem value={DeviceAssignStatus.ASSIGNED}>
                    Assigned
                  </MenuItem>
                  <MenuItem value={DeviceAssignStatus.NOT_ASSIGNED}>
                    Not assigned
                  </MenuItem>
                  <MenuItem value={DeviceAssignStatus.PENDING_APPROVAL}>
                    Waiting for approval
                  </MenuItem>
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
                    (!serial && !user && !deviceStatus && !assignedStatus) ||
                    isLoading
                  }
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  disabled={
                    (!serial && !user && !deviceStatus && !assignedStatus) ||
                    isLoading
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

export default AdminDeviceListFilter;
