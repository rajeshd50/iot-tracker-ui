import {
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

function UserDeviceList() {
  const [statusFilter, setStatusFilter] = useState("all");
  return (
    <Box
      sx={{
        width: "100%",
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
    </Box>
  );
}

export default UserDeviceList;
