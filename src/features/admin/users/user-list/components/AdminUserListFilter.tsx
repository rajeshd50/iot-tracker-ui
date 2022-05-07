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

export interface IAdminUserListFilterProps {
  isLoading: boolean;
  onFilterUpdate: (
    searchText: string | null,
    isActive: boolean | undefined
  ) => void;
  onFilterReset: () => void;
}

enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

function AdminUserListFilter(props: IAdminUserListFilterProps) {
  const { isLoading, onFilterReset, onFilterUpdate } = props;
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState<UserStatus | string | null>(null);

  const onReset = () => {
    setSearchText("");
    setStatus(null);
    onFilterReset();
  };

  const convertStatusToBool = () => {
    if (!status) {
      return undefined;
    }
    if (status === UserStatus.ACTIVE) {
      return true;
    }
    return false;
  };

  const onClickSearch = () => {
    onFilterUpdate(searchText, convertStatusToBool());
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
                label="Search Text"
                placeholder="Search by name/email etc"
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
                <InputLabel id="user-status-select-label">Status</InputLabel>
                <Select
                  labelId="user-status-select-label"
                  id="user-status-select"
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={UserStatus.ACTIVE}>Active</MenuItem>
                  <MenuItem value={UserStatus.INACTIVE}>Inactive</MenuItem>
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
                  disabled={(!searchText && !status) || isLoading}
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  disabled={(!searchText && !status) || isLoading}
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

export default AdminUserListFilter;
