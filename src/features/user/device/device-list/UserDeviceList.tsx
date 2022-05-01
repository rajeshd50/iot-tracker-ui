import {
  alpha,
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TablePagination from "@mui/material/TablePagination";

import { Device, DeviceStatus } from "../../../../models/device.model";
import { grey } from "@mui/material/colors";
import UserDeviceDetailsCard from "../device-details/components/UserDeviceDetailsCard";

const deviceList: Device[] = [
  {
    name: "test1",
    serialNumber: "0001",
    model: "tracker",
    id: "1",
    isActive: true,
    details: {
      status: DeviceStatus.online,
    },
  },
  {
    name: "test2",
    serialNumber: "0002",
    model: "tracker",
    id: "2",
    isActive: true,
    details: {
      status: DeviceStatus.critical,
    },
  },
  {
    name: "test3",
    serialNumber: "0003",
    model: "tracker",
    id: "3",
    isActive: true,
    details: {
      status: DeviceStatus.online,
    },
  },
  {
    name: "test4",
    serialNumber: "0004",
    model: "tracker",
    id: "4",
    isActive: true,
    details: {
      status: DeviceStatus.warning,
    },
  },
  {
    name: "test5",
    serialNumber: "0005",
    model: "tracker",
    id: "5",
    isActive: false,
    details: {
      status: DeviceStatus.online,
    },
  },
  {
    name: "test6",
    serialNumber: "0006",
    model: "tracker",
    id: "6",
    isActive: true,
    details: {
      status: DeviceStatus.offline,
    },
  },
];

function UserDeviceList() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <Typography variant="h5">Devices</Typography>
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
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Search by name/id" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="status-filter-select-label">
                      Device Status
                    </InputLabel>
                    <Select
                      labelId="status-filter-select-label"
                      id="status-filter-select"
                      value={statusFilter}
                      label="Device Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="online">Online</MenuItem>
                      <MenuItem value="offline">Offline</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
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
                        marginLeft: "30px",
                      },
                    }}
                  >
                    <Button color="secondary">Reset</Button>
                    <Button color="primary" variant="contained">
                      Search
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "10px",
          backgroundColor: alpha(grey[50], 0.5),
        }}
      >
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Box
        sx={{
          marginBottom: "96px",
        }}
      >
        {deviceList.map((device) => (
          <UserDeviceDetailsCard device={device} key={device.id} />
        ))}
      </Box>
    </Box>
  );
}

export default UserDeviceList;
